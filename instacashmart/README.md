# InstaCashMart

React version of the InstaCashMart website (sell old gadgets, buy accessories, used bikes & cars).

Built with React 18, React Router 6 (browser routing, e.g. `/admin`), Vite and Tailwind CSS 3.

When hosting the `dist/` build, the server must send `index.html` for every path so deep links
like `/admin` work. `public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this.

## Getting started

Copy `.env.example` to `.env` and fill in your Firebase web app configuration. The
Firebase Analytics measurement ID is optional; the other values are required.
For deployments, add the same `VITE_FIREBASE_*` variables to the hosting
provider's environment settings before building.
If Firebase variables are missing in production, the website still loads and
logs an explicit error while Firebase services remain disabled until the
variables are set.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Vite embeds `VITE_*` values into the client bundle, so these must not contain
private credentials. Restrict the Firebase API key in Google Cloud and configure
Firebase security rules for any services you enable.

## Project structure

```
src/
  main.jsx               app entry (BrowserRouter)
  App.jsx                routes, page titles, scroll handling
  index.css              Tailwind + custom styles (reveal animations, intro, bottom nav)
  context/AppContext.jsx global state: toast, city, login, modals, catalog, store filters
  lib/                   localStorage store, formatting and image helpers
  data/                  catalogs: accessories, sell models & brands, vehicles, site content
  hooks/                 reveal-on-scroll and swipe navigation
  components/            shared UI, layout (header, footer, nav), modals, orders, reviews
  pages/                 home, sell flow, accessories store, brands, bikes & cars, admin, ...
  assets/                images (models, accessories, brand logos, categories)
```

The app keeps a browser cache under keys starting with `cashnova.` and synchronizes
Firestore-backed collections when Firebase is configured. Customer submissions are
written to Firestore and tagged with the signed-in user's `ownerUid`; reads are
scoped to that owner or to published/approved documents. The admin panel is at `/admin`.

## Firebase security rules

`firestore.rules` and `storage.rules` provide a secured starting point for moving
this data to Firebase. The Firestore collection names follow the app's existing
storage keys: `sell`, `buy`, `products`, `sellModels`, `popular`, `trending`,
`feedback`, `reviews`, `vehicleProducts`, `vehicles`, and `vehicleLeads`.
Bike and car catalog entries use `vehicleProducts` with a `type` field.

The app signs customers in anonymously before customer submissions, so enable
**Authentication → Sign-in method → Anonymous** in Firebase. The rules require
authenticated requests and customer-created documents include `ownerUid` set to
the authenticated user's UID. The anonymous identity persists in the same browser;
it is not a phone-number account and does not transfer to another device. Existing
browser-only records are preserved under `cashnova.firestoreBackup.<collection>`
when that collection first syncs; they are not automatically uploaded.

Set the Firebase Auth custom claim `admin: true` for trusted admins using a
secure server-side Firebase Admin SDK process, or add their exact Firebase UID
to the `isAdmin()` allowlist in `firestore.rules` and the `ADMIN_UIDS` set in
`src/firebase.js`. Never grant admin claims from browser code. The current
deployment allowlists one supplied UID; deploy the updated rules for Firestore
to honor it. Public catalog
entries need `isPublished: true`, while customer feedback and reviews stay pending
until an admin approves them with `status: "approved"`. Firestore queries for
public content or a user's own records include the corresponding `isPublished`,
`status`, or `ownerUid` filter to satisfy the rules.

Storage uploads are limited to images smaller than 10 MB. Admin-published
images belong under `public/`; customer-only uploads belong under
`private/{uid}/`. Vehicle photos and admin catalog images currently use
compressed data URLs rather than Firebase Storage uploads.

Deploy the rules from this directory with the Firebase CLI:

```bash
firebase deploy --only firestore:rules,storage --project instamart-11e2e
```
