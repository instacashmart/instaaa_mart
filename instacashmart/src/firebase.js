import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredConfig = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId",
];

const missingConfig = requiredConfig.filter((key) => !firebaseConfig[key]);

export const app =
  missingConfig.length === 0 ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const ADMIN_UIDS = new Set(["fi22m7IJbFbjNllzZvBiGz0OMZs2"]);
export const hasAdminAccess = (user, claims = {}) =>
  claims.admin === true || ADMIN_UIDS.has(user?.uid);
export const authReady = auth
  ? new Promise((resolve, reject) => {
      let unsubscribe = () => {};
      unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          if (user) {
            resolve(user);
            return;
          }
          signInAnonymously(auth).then(
            (credential) => resolve(credential.user),
            reject,
          );
        },
        (error) => {
          unsubscribe();
          reject(error);
        },
      );
    })
  : Promise.resolve(null);

export async function getFirebaseUser() {
  await authReady;
  if (!auth) {
    return null;
  }
  if (auth.currentUser) {
    return auth.currentUser;
  }
  return (await signInAnonymously(auth)).user;
}

export function signInAdmin(email, password) {
  if (!auth) {
    throw new Error("Firebase is not configured.");
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutAdmin() {
  if (!auth) {
    throw new Error("Firebase is not configured.");
  }
  return signOut(auth);
}

if (!app) {
  console.error(
    `Firebase is disabled because configuration is missing: ${missingConfig.join(", ")}. ` +
      "Set the corresponding VITE_FIREBASE_* variables in the deployment environment.",
  );
}

export const analytics =
  app && firebaseConfig.measurementId ? getAnalytics(app) : null;
