import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ACCESSORIES,
  ACCESSORY_CATEGORIES,
  makeProduct,
} from "../data/accessories";
import { useFirestoreErrors, useStoreList } from "../lib/store";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const e = useNavigate();
  const [toast, setToast] = useState({
    message: "",
    visible: false,
  });
  const aRef = useRef(null);
  const showToast = useCallback((message) => {
    clearTimeout(aRef.current);
    setToast({
      message,
      visible: true,
    });
    aRef.current = setTimeout(
      () =>
        setToast((Z) => ({
          ...Z,
          visible: false,
        })),
      3500,
    );
  }, []);
  useFirestoreErrors(showToast);
  const [i, setI] = useState("Bengaluru");
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [trackId, setTrackId] = useState("");
  const [buyProduct, setBuyProduct] = useState(null);
  const closeModal = useCallback(() => setModal(null), []);
  const setCity = useCallback(
    (V) => {
      setI(V);
      setModal(null);
      showToast(`Pickup location set to ${V}`);
    },
    [showToast],
  );
  const login = useCallback(
    (mobile) => {
      setUser({
        mobile,
      });
      setModal(null);
      showToast("Logged in successfully!");
    },
    [showToast],
  );
  const openBuy = useCallback((V) => {
    setBuyProduct(V);
    setModal("buy");
  }, []);
  const openTrack = useCallback((V = "") => {
    setTrackId(V);
    setModal("track");
  }, []);
  const B = useStoreList("products");
  const catalog = useMemo(
    () => [
      ...ACCESSORIES,
      ...B.filter((V) =>
        ACCESSORY_CATEGORIES.some((Z) => Z.key === V.category),
      ).map((V) =>
        makeProduct(
          V.id,
          V.category,
          V.name,
          V.brand,
          V.specs,
          4.5,
          Number(V.price),
          Number(V.mrp) || Number(V.price),
          "nova",
          V.image || undefined,
        ),
      ),
    ],
    [B],
  );
  const [d, setD] = useState({
    category: "all",
    query: "",
  });
  const setMarketCategory = useCallback(
    (V) =>
      setD((Z) => ({
        ...Z,
        category: V,
      })),
    [],
  );
  const setMarketQuery = useCallback(
    (V) =>
      setD((Z) => ({
        ...Z,
        query: V || "",
      })),
    [],
  );
  const goToStore = useCallback(
    (V = {}) => {
      const Z = {
        ...d,
        ...V,
      };
      setD(Z);
      const st = new URLSearchParams();
      if (Z.category !== "all") {
        st.set("cat", Z.category);
      }
      if (Z.query.trim()) {
        st.set("q", Z.query.trim());
      }
      const ue = st.toString();
      e(`/accessories${ue ? `?${ue}` : ""}#buy-phones`);
    },
    [d, e],
  );
  const J = {
    toast,
    showToast,
    city: i,
    setCity,
    user,
    login,
    modal,
    setModal,
    closeModal,
    trackId,
    openTrack,
    buyProduct,
    openBuy,
    catalog,
    market: d,
    setMarket: setD,
    setMarketCategory,
    setMarketQuery,
    goToStore,
  };
  return <AppContext.Provider value={J}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
