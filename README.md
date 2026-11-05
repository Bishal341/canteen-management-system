# Canteen Management System

MERN auth + dashboard starter for a canteen management workflow (React/Vite client, Express/MongoDB server).

## Screenshots

| Login | Signup | Dashboard |
| --- | --- | --- |
| TODO: `docs/screenshots/login.png` | TODO: `docs/screenshots/signup.png` | TODO: `docs/screenshots/dashboard.png` |

Placeholder note: see `docs/screenshots/README.md`.

## Features (implemented)

- User signup and login with JWT (`POST /api/signup`, `POST /api/login`)
- Password hashing with bcrypt; JWT expiry `1d`
- Protected client route `/dashboard` (token required in `sessionStorage`)
- Authenticated profile fetch (`GET /api/profile`)
- Logout clears the stored token
- Canteen dashboard UI (stats, recent orders, popular items — currently static demo data in the client)
- Login/signup card and dashboard entrance animations (GSAP; respects `prefers-reduced-motion`)

## Tech stack

**Client** (`client/package.json`): React, Vite, Tailwind CSS, DaisyUI, Axios, React Router, Lucide React, react-icons, GSAP, `@gsap/react`

**Server** (`server/package.json`): Express, Mongoose, bcrypt, cors, dotenv, jsonwebtoken, nodemon (dev)

## Project structure

```
canteen-management-system/
├── client/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── API/API.js
│       ├── App.jsx
│       ├── Dashboard.jsx
│       ├── LoginCard.jsx
│       ├── Register.jsx
│       ├── Routes/
│       │   ├── Loginsignup.js
│       │   └── Protectedroutes.jsx
│       ├── bundles/Spinner.jsx
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   ├── config/db.js
│   ├── controller/userController.js
│   ├── middleware/authmiddleware.js
│   ├── model/userModel.js
│   └── routes/Auth.js
├── docs/screenshots/
├── profile-readme-draft/
└── README.md
```

## Setup

### Server

```bash
cd server
cp .env.example .env
# fill in DB_URL, JWT_SECRET, optional PORT and CLIENT_ORIGIN
npm install
npm run dev
# or: npm start
```

Scripts from `server/package.json`: `start` → `node index.js`; `dev` → `nodemon index.js`.

Env vars (see `server/.env.example`):

| Variable | Purpose |
| --- | --- |
| `PORT` | Server port (fallback `8000`) |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing/verifying JWTs |
| `CLIENT_ORIGIN` | CORS origin (fallback `http://localhost:5173`) |

### Client

```bash
cd client
cp .env.example .env
# set VITE_API_URL if not using the default
npm install
npm run dev
# production build: npm run build
# preview build: npm run preview
```

Scripts from `client/package.json`: `dev` → `vite`; `build` → `vite build`; `lint` → `eslint .`; `preview` → `vite preview`.

Env vars (see `client/.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | API base URL (fallback `http://localhost:8000/api`) |

## API

Base path: `/api` (mounted in `server/index.js`).

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Health text: `Server is running` |
| `POST` | `/api/signup` | No | Register user; returns `token` + `user` |
| `POST` | `/api/login` | No | Login; returns `token` + `user` |
| `GET` | `/api/profile` | Bearer JWT | Current user profile (no password) |

Auth header format: `Authorization: Bearer <token>` (`server/middleware/authmiddleware.js`).

## JWT flow

1. Signup/login response includes `token`.
2. Client stores it in `sessionStorage` under key `token` (`client/src/Routes/Loginsignup.js`).
3. Axios interceptor attaches `Authorization: Bearer <token>` (`client/src/API/API.js`).
4. `ProtectedRoutes` redirects to `/` if `sessionStorage` has no `token`.
5. Logout removes `token` from `sessionStorage` (`client/src/Dashboard.jsx`).

## Deploy notes

- **Client (Vercel):** set `VITE_API_URL` to your deployed API base (including `/api`).
- **Server (Render):** set `DB_URL`, `JWT_SECRET`, `PORT` (if required by host), and `CLIENT_ORIGIN` to your Vercel URL.
- Keep secrets only in the host env dashboard — never commit `.env`.

## Roadmap (planned)

- Wire dashboard widgets to real menu/order/inventory APIs
- Role-based UI for `user` / `admin` / `staff` (model already has `role`)
- Client-side form validation library on login/signup
- Live demo link and screenshots in this README

## Author

Manohar (Bishal) Karki · GitHub [Bishal341](https://github.com/Bishal341) · bishalkarki040@gmail.com
