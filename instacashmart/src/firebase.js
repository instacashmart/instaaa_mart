import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

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
  "storageBucket",
  "messagingSenderId",
  "appId",
];

const missingConfig = requiredConfig.filter((key) => !firebaseConfig[key]);

export const app =
  missingConfig.length === 0 ? initializeApp(firebaseConfig) : null;

if (!app) {
  console.error(
    `Firebase is disabled because configuration is missing: ${missingConfig.join(", ")}. ` +
      "Set the corresponding VITE_FIREBASE_* variables in the deployment environment.",
  );
}

export const analytics =
  app && firebaseConfig.measurementId ? getAnalytics(app) : null;
