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

All data (orders, feedback, reviews, admin edits) is stored in the browser's `localStorage`
under keys starting with `cashnova.`. The admin panel is at `/admin`.

## Firebase security rules

`firestore.rules` and `storage.rules` provide a secured starting point for moving
this data to Firebase. The Firestore collection names follow the app's existing
storage keys: `sell`, `buy`, `products`, `sellModels`, `popular`, `trending`,
`feedback`, `reviews`, `vehicleProducts`, `vehicles`, and `vehicleLeads`.
Bike and car catalog entries use `vehicleProducts` with a `type` field.

The rules require Firebase Authentication. Customer-created documents must
include `ownerUid` set to the authenticated user's UID. Set the Firebase Auth
custom claim `admin: true` for each trusted admin using a secure server-side
Firebase Admin SDK process; never grant admin claims from browser code. Public
catalog entries need `isPublished: true`, while feedback and reviews become
public only after an admin sets `status: "approved"`. Firestore queries for
public content or a user's own orders must include the corresponding
`isPublished`, `status`, or `ownerUid` filter so they satisfy the rules.

Storage uploads are limited to images smaller than 10 MB. Admin-published
images belong under `public/`; customer-only uploads belong under
`private/{uid}/`. The current React admin panel still uses `localStorage`:
deploying these rules does not migrate its data or connect the UI to Firestore
or Storage. Add Firebase Auth and Firestore/Storage operations to the app before
expecting the panel to read or write cloud data.

Deploy the rules from this directory with the Firebase CLI:

```bash
firebase deploy --only firestore:rules,storage --project instamart-11e2e
```
