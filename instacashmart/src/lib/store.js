import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  authReady,
  db,
  getFirebaseUser,
  hasAdminAccess,
} from "../firebase";
import { POPULAR_ACCESSORIES } from "../data/accessories";
import { TRENDING_DEVICES } from "../data/site";

const STORAGE_KEYS = {
  sell: "cashnova.sellOrders",
  buy: "cashnova.buyOrders",
  products: "cashnova.products",
  trending: "cashnova.trendingDevices",
  popular: "cashnova.popularAccessories",
  feedback: "cashnova.feedback",
  reviews: "cashnova.reviews",
  sellModels: "cashnova.sellModels",
  vehicles: "cashnova.vehicles",
  vehicleLeads: "cashnova.vehicleLeads",
  vehicleProducts: "cashnova.vehicleProducts",
};

const DEFAULT_LISTS = {
  trending: TRENDING_DEVICES,
  popular: POPULAR_ACCESSORIES,
};

const CHANGE_EVENT = "cashnova:change";
const FIRESTORE_ERROR_EVENT = "cashnova:firestore-error";
const CUSTOMER_COLLECTIONS = new Set([
  "sell",
  "buy",
  "vehicles",
  "vehicleLeads",
  "feedback",
  "reviews",
]);
const PUBLIC_COLLECTIONS = new Set([
  "products",
  "trending",
  "popular",
  "sellModels",
  "vehicleProducts",
]);
const subscribers = new Map();
const recentFirestoreErrors = new Set();

function emitFirestoreError(error) {
  const message = firestoreErrorMessage(error);
  if (recentFirestoreErrors.has(message)) {
    return;
  }
  recentFirestoreErrors.add(message);
  setTimeout(() => recentFirestoreErrors.delete(message), 5000);
  console.error("Firestore operation failed:", error);
  window.dispatchEvent(
    new CustomEvent(FIRESTORE_ERROR_EVENT, {
      detail: new Error(message),
    }),
  );
}

function firestoreErrorMessage(error) {
  if (error?.code === "auth/operation-not-allowed") {
    return "Enable Anonymous Authentication in Firebase Console to save customer submissions.";
  }
  if (error?.code === "permission-denied") {
    return "Firestore denied this operation. Check Firebase Authentication and the deployed rules; catalog/admin writes require an admin claim.";
  }
  if (error?.code === "unauthenticated") {
    return "Firestore needs an authenticated user. Enable Anonymous Authentication in Firebase.";
  }
  return error?.message || "Firestore could not save this change.";
}

function localWriteList(key, items) {
  if (!writeList(key, items)) {
    throw new Error("Browser storage is full or blocked.");
  }
}

function preserveLocalData(key) {
  try {
    const backupKey = `cashnova.firestoreBackup.${key}`;
    if (
      localStorage.getItem(backupKey) === null &&
      localStorage.getItem(STORAGE_KEYS[key]) !== null
    ) {
      localStorage.setItem(backupKey, localStorage.getItem(STORAGE_KEYS[key]));
    }
  } catch (error) {
    emitFirestoreError(
      new Error("Could not preserve this browser's previous local data.", {
        cause: error,
      }),
    );
  }
}

async function prepareDocument(key, item, user) {
  const document = { ...item };
  if (CUSTOMER_COLLECTIONS.has(key)) {
    document.ownerUid = user.uid;
    if (key === "vehicles") {
      document.isPublished = false;
    }
    if (key === "feedback" || key === "reviews") {
      document.status = "pending";
    }
  } else if (PUBLIC_COLLECTIONS.has(key)) {
    document.isPublished = true;
  }
  if (JSON.stringify(document).length > 900_000) {
    throw new Error(
      "This record is too large for Firestore. Use a smaller image and try again.",
    );
  }
  return document;
}

function saveRemoteError(error) {
  emitFirestoreError(new Error(firestoreErrorMessage(error), { cause: error }));
}

async function writeRemote(key, item) {
  if (!db) {
    return false;
  }
  const user = await getFirebaseUser();
  if (!user) {
    throw new Error("Firebase is not configured. This record was not saved to Firestore.");
  }
  const data = await prepareDocument(key, item, user);
  await setDoc(doc(db, key, String(item.id)), data);
  return { ...data, id: String(item.id) };
}

async function addAndWait(key, item) {
  if (!db) {
    throw new Error(
      "Firebase is not configured. Add the VITE_FIREBASE_* settings before saving to Firestore.",
    );
  }
  let saved;
  try {
    saved = await writeRemote(key, item);
  } catch (error) {
    throw new Error(firestoreErrorMessage(error), { cause: error });
  }
  const next = [
    saved,
    ...readList(key).filter((entry) => entry.id !== item.id),
  ];
  if (!writeList(key, next)) {
    emitFirestoreError(
      new Error("Firestore saved the record, but the browser cache could not be updated."),
    );
  }
  return true;
}

async function updateRemote(key, id, changes) {
  if (!db) {
    return false;
  }
  const user = await getFirebaseUser();
  if (!user) {
    throw new Error("Firebase is not configured. This record was not saved to Firestore.");
  }
  const patch = { ...changes };
  if (key === "vehicles" && Object.hasOwn(patch, "status")) {
    patch.isPublished = patch.status === "Live";
  }
  if (JSON.stringify(patch).length > 900_000) {
    throw new Error(
      "This record is too large for Firestore. Use a smaller image and try again.",
    );
  }
  if (key === "products" || key === "trending" || key === "popular" ||
      key === "sellModels" || key === "vehicleProducts") {
    patch.isPublished = true;
  }
  await updateDoc(doc(db, key, String(id)), patch);
  return true;
}

async function replaceRemote(key, items) {
  if (!db) {
    return false;
  }
  const user = await getFirebaseUser();
  if (!user) {
    throw new Error("Firebase Authentication is not ready.");
  }
  const current = await getDocs(collection(db, key));
  const batch = writeBatch(db);
  current.docs.forEach((record) => batch.delete(record.ref));
  for (const item of items) {
    const data = await prepareDocument(key, item, user);
    batch.set(doc(db, key, String(item.id)), data);
  }
  await batch.commit();
  return true;
}

function persistInBackground(operation, rollback) {
  operation().catch((error) => {
    rollback();
    saveRemoteError(error);
  });
}

function firestoreQueries(key, user, isAdmin) {
  const ref = collection(db, key);
  if (isAdmin) {
    return [query(ref)];
  }
  if (PUBLIC_COLLECTIONS.has(key)) {
    return [query(ref, where("isPublished", "==", true))];
  }
  if (key === "vehicles") {
    return [
      query(ref, where("isPublished", "==", true)),
      query(ref, where("ownerUid", "==", user.uid)),
    ];
  }
  if (key === "feedback" || key === "reviews") {
    return [
      query(ref, where("status", "==", "approved")),
      query(ref, where("ownerUid", "==", user.uid)),
    ];
  }
  return [query(ref, where("ownerUid", "==", user.uid))];
}

function startFirestoreSubscription(key, entry) {
  const generation = ++entry.generation;
  getFirebaseUser()
    .then(async (user) => {
      if (!user || entry.listeners.size === 0 || generation !== entry.generation) {
        return;
      }
      const token = await user.getIdTokenResult();
      if (generation !== entry.generation) {
        return;
      }
      const queries = firestoreQueries(
        key,
        user,
        hasAdminAccess(user, token.claims),
      );
      const results = new Map();
      const stops = queries.map((source, index) =>
        onSnapshot(
          source,
          (snapshot) => {
            if (generation !== entry.generation) {
              return;
            }
            results.set(
              index,
              snapshot.docs.map((record) => ({
                ...record.data(),
                id: record.id,
              })),
            );
            const merged = new Map();
            for (const records of results.values()) {
              for (const record of records) {
                merged.set(record.id, record);
              }
            }
            const records = [...merged.values()];
            if (records.some((record) => Number.isFinite(record.sortOrder))) {
              records.sort(
                (left, right) =>
                  (left.sortOrder ?? Number.MAX_SAFE_INTEGER) -
                    (right.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
                  String(right.createdAt || "").localeCompare(
                    String(left.createdAt || ""),
                  ),
              );
            } else {
              records.sort((left, right) =>
                String(right.createdAt || "").localeCompare(
                  String(left.createdAt || ""),
                ),
              );
            }
            try {
              localWriteList(key, records);
            } catch (error) {
              emitFirestoreError(error);
              return;
            }
            for (const update of entry.listeners) {
              update(records);
            }
          },
          (error) => emitFirestoreError(error),
        ),
      );
      entry.stop = () => stops.forEach((stop) => stop());
      if (entry.listeners.size === 0 || generation !== entry.generation) {
        entry.stop();
        entry.stop = null;
      }
    })
    .catch((error) => emitFirestoreError(error));
}

if (auth) {
  onAuthStateChanged(auth, () => {
    for (const [key, entry] of subscribers) {
      entry.stop?.();
      entry.stop = null;
      startFirestoreSubscription(key, entry);
    }
  });
}

function subscribeToFirestore(key, listener) {
  if (!db) {
    return () => {};
  }
  let entry = subscribers.get(key);
  if (!entry) {
    entry = { listeners: new Set(), stop: null, generation: 0 };
    subscribers.set(key, entry);
    preserveLocalData(key);
  }
  entry.listeners.add(listener);
  if (!entry.stop) {
    startFirestoreSubscription(key, entry);
  }
  return () => {
    entry.listeners.delete(listener);
    if (entry.listeners.size === 0) {
      entry.generation += 1;
      entry.stop?.();
      subscribers.delete(key);
    }
  };
}

export const ORDER_STEPS = {
  sell: [
    {
      status: "New",
      label: "Pickup Requested",
      icon: "fa-clipboard-check",
    },
    {
      status: "Scheduled",
      label: "Technician Assigned",
      icon: "fa-motorcycle",
    },
    {
      status: "Picked up",
      label: "Picked Up & Checked",
      icon: "fa-magnifying-glass",
    },
    {
      status: "Paid",
      label: "Payment Sent",
      icon: "fa-indian-rupee-sign",
    },
  ],
  buy: [
    {
      status: "New",
      label: "Order Placed",
      icon: "fa-receipt",
    },
    {
      status: "Packed",
      label: "Packed",
      icon: "fa-box",
    },
    {
      status: "Shipped",
      label: "Shipped",
      icon: "fa-truck-fast",
    },
    {
      status: "Delivered",
      label: "Delivered",
      icon: "fa-house-circle-check",
    },
  ],
};

function readList(A) {
  try {
    const e = localStorage.getItem(STORAGE_KEYS[A]);
    if (e === null && A === "trending") {
      try {
        localStorage.setItem(STORAGE_KEYS[A], JSON.stringify(TRENDING_DEVICES));
      } catch {}
      return TRENDING_DEVICES;
    }
    const t = JSON.parse(e);
    if (Array.isArray(t)) {
      return t;
    }
    return DEFAULT_LISTS[A] || [];
  } catch {
    return DEFAULT_LISTS[A] || [];
  }
}

function writeList(A, e) {
  try {
    localStorage.setItem(STORAGE_KEYS[A], JSON.stringify(e));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export const store = {
  list: readList,
  addAndWait,
  add(A, e) {
    const before = readList(A);
    if (!writeList(A, [e, ...before])) {
      return false;
    }
    if (db) {
      persistInBackground(
        () => writeRemote(A, e),
        () => writeList(A, before),
      );
    }
    return true;
  },
  update(A, e, t) {
    const before = readList(A);
    const next = before.map((r) =>
      r.id === e
        ? {
            ...r,
            ...t,
          }
        : r,
    );
    if (!writeList(A, next)) {
      return false;
    }
    if (db) {
      persistInBackground(
        () => updateRemote(A, e, t),
        () => writeList(A, before),
      );
    }
    return true;
  },
  remove(A, e) {
    const before = readList(A);
    if (!writeList(A, before.filter((item) => item.id !== e))) {
      return false;
    }
    if (db) {
      persistInBackground(
        async () => deleteDoc(doc(db, A, String(e))),
        () => writeList(A, before),
      );
    }
    return true;
  },
  resetTrending() {
    const before = readList("trending");
    writeList("trending", TRENDING_DEVICES);
    if (db) {
      persistInBackground(
        () => replaceRemote("trending", TRENDING_DEVICES),
        () => writeList("trending", before),
      );
    }
    return TRENDING_DEVICES;
  },
  resetPopular() {
    const before = readList("popular");
    const defaults = POPULAR_ACCESSORIES;
    writeList("popular", defaults);
    if (db) {
      persistInBackground(
        () => replaceRemote("popular", defaults),
        () => writeList("popular", before),
      );
    }
  },
  move(A, e, t) {
    const r = [...readList(A)];
    const before = [...r];
    const a = r.findIndex((i) => i.id === e);
    const n = a + t;
    if (a < 0 || n < 0 || n >= r.length) {
      return false;
    }
    [r[a], r[n]] = [r[n], r[a]];
    if (!writeList(A, r)) {
      return false;
    }
    if (db) {
      persistInBackground(
        async () => {
          const user = await getFirebaseUser();
          if (!user) {
            throw new Error("Firebase Authentication is not ready.");
          }
          await Promise.all(
            r.map((item, index) =>
              updateDoc(doc(db, A, String(item.id)), { sortOrder: index }),
            ),
          );
        },
        () => writeList(A, before),
      );
    }
    return true;
  },
  setStatus(A, e, t) {
    const r = readList(A).find((n) => n.id === e);
    if (!r) {
      return false;
    }
    const history = {
      New: r.createdAt,
      ...(r.history || {}),
      [t]: new Date().toISOString(),
    };
    return this.update(A, e, {
      status: t,
      history,
    });
  },
  findOrder(A) {
    const e = String(A || "")
      .trim()
      .toUpperCase();
    if (!e) {
      return null;
    }
    for (const t of ["sell", "buy"]) {
      const r = readList(t).find((a) => String(a.id).toUpperCase() === e);
      if (r) {
        return {
          type: t,
          item: r,
        };
      }
    }
    return null;
  },
  newId(A) {
    return `${A}-${Math.floor(100000 + Math.random() * 900000)}`;
  },
};

export function useStoreVersion() {
  const [A, setA] = useState(0);
  useEffect(() => {
    const t = () => setA((a) => a + 1);
    const r = () => {
      if (!document.hidden) {
        t();
      }
    };
    window.addEventListener(CHANGE_EVENT, t);
    window.addEventListener("storage", t);
    document.addEventListener("visibilitychange", r);
    return () => {
      window.removeEventListener(CHANGE_EVENT, t);
      window.removeEventListener("storage", t);
      document.removeEventListener("visibilitychange", r);
    };
  }, []);
  return A;
}

export function useStoreList(A) {
  const e = useStoreVersion();
  const [t, setT] = useState(() => readList(A));
  useEffect(() => {
    setT(readList(A));
    return subscribeToFirestore(A, setT);
  }, [A]);
  useEffect(() => setT(readList(A)), [A, e]);
  return t;
}

export function useFirestoreErrors(onError) {
  useEffect(() => {
    const handler = (event) =>
      onError(firestoreErrorMessage(event.detail));
    window.addEventListener(FIRESTORE_ERROR_EVENT, handler);
    return () => window.removeEventListener(FIRESTORE_ERROR_EVENT, handler);
  }, [onError]);
}
