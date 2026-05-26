# LifeTwin / DigitalTwin

## Overview

LifeTwin is an AI-powered life intelligence platform designed to unify health, finance, productivity, and career signals into a single adaptive dashboard. It combines:

- Behavioral onboarding intelligence
- AI-driven recommendations and predictions
- Cross-domain analytics
- Real-time metrics and notifications
- Integrated backend security and user profiles

This repository contains three main workspaces:

- `client/` — React + Vite frontend
- `server/` — Node.js + Express backend API
- `ai-engine/` — optional Python AI service for advanced predictions

## Repository Structure

```
Hack-TI/
├── ai-engine/             # Optional AI prediction engine (Python)
├── client/                # React frontend application
├── server/                # Express backend API server
├── README.md              # Project overview and setup
└── .gitignore
```

## Frontend (`client/`)

### Stack

- React 19
- Vite
- Tailwind CSS v4
- Lucide icons
- axios for HTTP requests
- react-router-dom for page routing

### Important pages

- `client/src/pages/Copilot.jsx` — Twin Copilot user experience
- `client/src/pages/Finance.jsx` — Finance intelligence dashboard
- `client/src/pages/Health.jsx` — Health intelligence dashboard
- `client/src/pages/Notifications.jsx` — Notifications center
- `client/src/pages/Goals.jsx` — Compact goals page
- `client/src/pages/Dashboard.jsx` — Main high-level dashboard

### Styling and theme

The frontend uses a midnight-growth dark theme with CSS custom properties defined in `client/src/index.css`. Tailwind classes use canonical variable syntax like:

- `bg-(--surface)`
- `text-(--muted)`
- `border-(--border)`

This improves compatibility with Tailwind v4 and the Vite build.

## Backend (`server/`)

### Stack

- Node.js + Express
- MongoDB via Mongoose
- JWT authentication
- bcryptjs password hashing
- Helmet security headers
- CORS middleware
- Firebase Admin SDK support (optional)

### Key backend files

- `server/server.js` — main Express app and route configuration
- `server/config/database.js` — MongoDB connection helper
- `server/config/firebase.js` — Firebase Admin initialization
- `server/middleware/auth.js` — JWT verification and token generation
- `server/middleware/cors.js` — CORS policy configuration
- `server/middleware/errorHandler.js` — error handling middleware
- `server/controllers/authController.js` — auth logic and profile APIs
- `server/routes/auth.js` — auth endpoint routing
- `server/routes/onboarding.js` — onboarding and dashboard APIs
- `server/routes/integrations.js` — external integration endpoints
- `server/models/User.js` — user schema and auth helpers
- `server/models/OnboardingProfile.js` — onboarding data schema

### API Routes

#### Health check

- `GET /api/health`

#### Authentication

- `POST /api/auth/signup` — register new user
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/profile` — protected profile fetch
- `PUT /api/auth/profile` — protected profile update
- `POST /api/auth/change-password` — protected password change

#### Onboarding

- `POST /api/onboarding` — save onboarding profile and run analytics
- `GET /api/dashboard` — retrieve user dashboard data
- `POST /api/daily-goals/complete` — update streaks and completed goals

#### Integrations

- `GET /api/integrations/github/:username`
- `GET /api/integrations/leetcode/:username`
- `POST /api/integrations/linkedin`

### Backend behavior

The backend is implemented with clear separation between:

- request routing (`server/routes/*.js`)
- business logic (`server/controllers/*.js`)
- data storage (`server/models/*.js`)
- infrastructure support (`server/config/*.js`)
- error handling (`server/middleware/*.js`)

The auth system uses JWT tokens and stores user profile data in MongoDB. Passwords are hashed with bcrypt and never returned in API responses.

## AI Engine (`ai-engine/`)

This repository also includes an optional Python AI engine used for prediction and correlation analysis.

### Stack

- Flask
- pandas
- numpy
- scikit-learn
- python-dotenv
- requests

### Notes

If you want to run AI prediction endpoints, start the AI engine before the main backend and set any required AI environment variables.

## Local Setup

### Prerequisites

- Node.js 20+ and npm
- MongoDB locally or MongoDB Atlas
- Python 3.11+ if using the AI engine

### Install dependencies

```bash
cd server
npm install

cd ../client
npm install

cd ../ai-engine
python -m pip install -r requirements.txt
```

### Environment variables

Copy the example files and update them with your values.

```bash
cd server
copy .env.example .env

cd ../client
copy .env.example .env
```

#### Server environment variables

- `PORT` — backend port (default `5000`)
- `NODE_ENV` — `development` or `production`
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `JWT_EXPIRE` — token lifetime, e.g. `7d`
- `CORS_ORIGIN` — allowed frontend URL(s)
- `FIREBASE_PROJECT_ID` — (optional)
- `FIREBASE_PRIVATE_KEY` — (optional)
- `FIREBASE_CLIENT_EMAIL` — (optional)

### Run the backend

```bash
cd server
npm run dev
```

You should see the server start and list available APIs.

### Run the frontend

```bash
cd client
npm run dev
```

Then open the Vite URL shown in the terminal, typically `http://localhost:5173` or `http://localhost:5174`.

### Optional AI engine run

```bash
cd ai-engine
python run.py
```

## Fixes applied in this update

- Resolved Tailwind custom-property syntax by converting all `bg-[var(--...)]` / `text-[var(--...)]` / `border-[var(--...)]` forms to canonical Tailwind syntax like `bg-(--...)`.
- Fixed JSX structure errors in `client/src/pages/Copilot.jsx` and `client/src/pages/Finance.jsx` that were causing Vite build failures.
- Verified the client application builds successfully.

## Troubleshooting

### 500 errors while loading frontend pages

This usually means the React page failed to compile. Rebuild the frontend after checking:

- JSX tag nesting is correct
- Tailwind custom classes use canonical `(... )` syntax
- The development server is running with `npm run dev`

### Backend startup failures

Check the backend `.env` file and confirm MongoDB is reachable. If the server cannot connect to MongoDB, it will exit with a connection error.

### CORS issues

Ensure the backend `CORS_ORIGIN` includes the frontend URL, such as `http://localhost:5173` or `http://localhost:5174`.

## Where to modify behavior

- Add new user fields: `server/models/User.js`
- Extend onboarding analytics: `server/controllers/onboardingController.js`
- Add new frontend page/layouts: `client/src/pages/*` and `client/src/components/*`
- Add new API routes: `server/routes/*.js` and corresponding controllers

## Recommended next steps

1. Seed the app with a test user
2. Run the backend and frontend together
3. Use the `Dashboard` page to validate API integration
4. Inspect `server/routes` and `client/src/pages` for workflow
5. Add unit tests in `server/tests` or `client/src/tests`
