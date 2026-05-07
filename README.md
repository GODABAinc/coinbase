> **⚠️ Educational Project / School Assignment**
>
> This repository is a learning exercise built as a clone of the Coinbase UI
> for academic purposes. It is **not affiliated with, endorsed by, or
> sponsored by Coinbase, Inc.** All trademarks belong to their respective
> owners. No real cryptocurrency transactions occur on this site.


# Coinbase Clone — Frontend (Integrated)

React frontend for the Coinbase clone, integrated with the backend API for authentication and crypto data.

## Tech Stack

- React 19 + Vite
- React Router DOM
- Tailwind CSS

## Setup (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure your backend is running locally (default: `http://localhost:5000`).

3. The `.env` file already points to `http://localhost:5000`. Edit if your backend runs elsewhere.

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser.

## Deployment

### Set the backend URL first

Before deploying, you'll set `VITE_API_URL` to your deployed backend URL (e.g., your Render URL).

### Deploy to Vercel (recommended, free)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Framework Preset: **Vite** (auto-detected).
4. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: your Render backend URL (e.g., `https://your-backend.onrender.com`)
5. Click **Deploy**.

### Or deploy to Netlify (also free)

1. Push to GitHub.
2. Go to [netlify.com](https://netlify.com), import the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Environment variables: `VITE_API_URL=https://your-backend.onrender.com`
6. Deploy.

## What's New

- `src/api/api.js` — central wrapper for all backend calls
- `src/context/AuthContext.jsx` — global auth state
- `src/components/auth/ProtectedRoute.jsx` — route protection
- `src/pages/Profile.jsx` — protected profile page
- `src/pages/AddCrypto.jsx` — protected add-crypto form
- `SignIn.jsx`, `SignUp.jsx`, `Explore.jsx` — wired to backend
- Navbar shows Profile button when logged in

## Routes

| Route          | Access    | Description                           |
| -------------- | --------- | ------------------------------------- |
| `/`            | Public    | Home page                             |
| `/explore`     | Public    | Browse cryptos (live from backend)    |
| `/signin`      | Public    | Login form                            |
| `/signup`      | Public    | Registration form                     |
| `/profile`     | Protected | User profile (requires login)         |
| `/add-crypto`  | Protected | Add new cryptocurrency form           |
| `/asset/:id`   | Public    | Asset detail page (uses mock data)    |
| `/learn`       | Public    | Learn page                            |


> **⚠️ Educational Project / School Assignment**
>
> This repository is a learning exercise built as a clone of the Coinbase UI
> for academic purposes. It is **not affiliated with, endorsed by, or
> sponsored by Coinbase, Inc.** All trademarks belong to their respective
> owners. No real cryptocurrency transactions occur on this site.

