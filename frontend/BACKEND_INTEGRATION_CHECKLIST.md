# Backend Integration Checklist

This document tracks the integration readiness of each GlobeTrotter frontend feature against the backend endpoints contract specified in `backend/API_CONTRACT.md`. Use this checklist during the final team merge.

| FEATURE | FRONTEND SERVICE | EXPECTED ENDPOINT | STATUS |
| :--- | :--- | :--- | :--- |
| **Trips CRUD (List, View, Create, Update, Delete)** | `tripService.getTrips`, `getTripById`, `createTrip`, `updateTrip`, `deleteTrip` | `GET /api/trips`<br>`GET /api/trips/:id`<br>`POST /api/trips`<br>`PATCH /api/trips/:id`<br>`DELETE /api/trips/:id` | **READY** (Endpoints defined in contract; matches service routing) |
| **Stop Management (Add Stop, Delete Stop)** | `tripService.addStop`, `deleteStop` | `POST /api/trips/:id/stops`<br>`DELETE /api/trips/:id/stops/:stopId` | **READY** (Endpoints defined in contract; matches service routing) |
| **Scheduled Activities (Add, Remove)** | `tripService.addActivityToStop`, `deleteActivityFromStop` | `POST /api/trips/:id/stops/:stopId/activities`<br>`DELETE /api/trips/:id/stops/:stopId/activities/:tripActivityId` | **READY** (Endpoints defined in contract; matches service routing) |
| **Authentication (Login, Register)** | `Login.tsx`, `Register.tsx` | `POST /api/auth/login`<br>`POST /api/auth/register` | **MISSING** (Not present in contract. Frontend currently uses secure localStorage mock sessions) |
| **City Discovery (Available cities list)** | `tripService.getCities`, `CityDiscovery.tsx` | `GET /api/cities` | **MISSING** (Not present in contract. Frontend falls back to static seed array while database creation stops) |
| **Activity Discovery (Available master activities)** | `tripService.getActivities`, `ActivityDiscovery.tsx` | `GET /api/activities` | **MISSING** (Not present in contract. Frontend falls back to static seed array while scheduling activities) |
| **Custom Expenses (Log Accommodation/Transit)** | `tripService.addExpense`, `deleteExpense` | `POST /api/trips/:id/budget/expenses`<br>`DELETE /api/trips/:id/budget/expenses/:expenseId` | **MISSING** (Not in contract; no database models exist for Budget/Expense. Falls back to localStorage log) |
| **Budget Limits (Set limit)** | `tripService.updateBudgetLimit` | `PATCH /api/trips/:id/budget` | **MISSING** (Not in contract; falls back to localStorage) |
| **Calendar Timelines (Fetch schedules)** | `Calendar.tsx` | `GET /api/trips/:id/stops/:stopId/activities` | **READY** (Uses stop activities endpoint rollup; fully automated) |
| **Shared Itinerary (Read-only view)** | `SharedTrip.tsx` | `GET /api/trips/:id` | **READY** (Fetches read-only details by trip ID; no authentication required) |

---

### Key Action Items for Merge:
1. **Mock Toggling**: To run integration checks against the live backend database, rename `.env.example` to `.env` and set `VITE_USE_MOCK=false`.
2. **Missing Endpoints**: Devam must implement registration/login authentication, cities directory, activities directory, and custom budget logs in the Express server to enable full DB-driven operations.
