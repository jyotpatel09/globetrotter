# Final Integration Map

> **FRONTEND EXPECTATIONS — VERIFY AGAINST BACKEND CONTRACT**
> Use this reference mapping to align frontend service hooks with backend controllers.

---

## 1. BLOCKING: Core Demo Journey APIs
*These endpoints are critical for PostgreSQL database integration and must be operational on the backend.*

### Feature: List Trips
*   **Frontend Function**: `tripService.getTrips()`
*   **HTTP Method**: `GET`
*   **Endpoint**: `/api/trips?userId=user-123`
*   **Request Body**: None (Temporary: `userId` query parameter)
*   **Expected Response**: `{ "success": true, "data": Trip[] }`
*   **Status**: **READY**

### Feature: Get Trip Details
*   **Frontend Function**: `tripService.getTripById(id)`
*   **HTTP Method**: `GET`
*   **Endpoint**: `/api/trips/:id`
*   **Request Body**: None
*   **Expected Response**: `{ "success": true, "data": Trip }` (Includes stops and nested city records)
*   **Status**: **READY**

### Feature: Create Trip
*   **Frontend Function**: `tripService.createTrip(name, startDate, endDate, totalLimit)`
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/trips`
*   **Request Body**: `{ "userId": "user-123", "name": "...", "startDate": "...", "endDate": "..." }`
*   **Expected Response**: `{ "success": true, "data": Trip }`
*   **Status**: **READY**

### Feature: Update Trip Details
*   **Frontend Function**: `tripService.updateTrip(id, updates)`
*   **HTTP Method**: `PATCH`
*   **Endpoint**: `/api/trips/:id`
*   **Request Body**: `{ "name": "...", "startDate": "...", "endDate": "..." }` (All optional)
*   **Expected Response**: `{ "success": true, "data": Trip }`
*   **Status**: **READY**

### Feature: Delete Trip
*   **Frontend Function**: `tripService.deleteTrip(id)`
*   **HTTP Method**: `DELETE`
*   **Endpoint**: `/api/trips/:id`
*   **Request Body**: None
*   **Expected Response**: `204 No Content`
*   **Status**: **READY**

### Feature: Add Stop to Trip
*   **Frontend Function**: `tripService.addStop(tripId, cityId, arrival, departure)`
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/trips/:id/stops`
*   **Request Body**: `{ "cityId": "...", "arrival": "...", "departure": "..." }`
*   **Expected Response**: `{ "success": true, "data": Stop }`
*   **Status**: **READY**

### Feature: Delete Stop from Trip
*   **Frontend Function**: `tripService.deleteStop(tripId, stopId)`
*   **HTTP Method**: `DELETE`
*   **Endpoint**: `/api/trips/:id/stops/:stopId`
*   **Request Body**: None
*   **Expected Response**: `204 No Content`
*   **Status**: **READY**

### Feature: Schedule Activity to Stop
*   **Frontend Function**: `tripService.addActivityToStop(tripId, stopId, activityId, scheduledAt)`
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/trips/:id/stops/:stopId/activities`
*   **Request Body**: `{ "activityId": "...", "scheduledAt": "..." }`
*   **Expected Response**: `{ "success": true, "data": TripActivity }`
*   **Status**: **READY**

### Feature: Remove Activity from Stop
*   **Frontend Function**: `tripService.deleteActivityFromStop(tripId, stopId, tripActivityId)`
*   **HTTP Method**: `DELETE`
*   **Endpoint**: `/api/trips/:id/stops/:stopId/activities/:tripActivityId`
*   **Request Body**: None
*   **Expected Response**: `204 No Content`
*   **Status**: **READY**

---

## 2. NON-BLOCKING: Secondary Demo APIs
*These features can safely fall back to client-side localStorage mocks without blocking the live presentation.*

### Feature: User Registration
*   **Frontend Function**: `Register.tsx` submit
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/auth/register`
*   **Request Body**: `{ "name": "...", "email": "...", "password": "..." }`
*   **Expected Response**: `{ "success": true, "data": { "token": "...", "user": { ... } } }`
*   **Status**: **MISSING** (Persists session mock locally)

### Feature: User Login
*   **Frontend Function**: `Login.tsx` submit
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/auth/login`
*   **Request Body**: `{ "email": "...", "password": "..." }`
*   **Expected Response**: `{ "success": true, "data": { "token": "...", "user": { ... } } }`
*   **Status**: **MISSING** (Persists session mock locally)

### Feature: Master Cities Directory
*   **Frontend Function**: `tripService.getCities()`
*   **HTTP Method**: `GET`
*   **Endpoint**: `/api/cities`
*   **Request Body**: None
*   **Expected Response**: `{ "success": true, "data": City[] }`
*   **Status**: **MISSING** (Falls back to local mockCities catalogue)

### Feature: Master Activities Directory
*   **Frontend Function**: `tripService.getActivities(cityId)`
*   **HTTP Method**: `GET`
*   **Endpoint**: `/api/activities` (or `/api/cities/:cityId/activities`)
*   **Request Body**: None
*   **Expected Response**: `{ "success": true, "data": Activity[] }`
*   **Status**: **MISSING** (Falls back to local mockActivities catalogue)

### Feature: Update Custom Budget Limit
*   **Frontend Function**: `tripService.updateBudgetLimit(tripId, totalLimit)`
*   **HTTP Method**: `PATCH`
*   **Endpoint**: `/api/trips/:id/budget`
*   **Request Body**: `{ "totalLimit": 3000 }`
*   **Expected Response**: `{ "success": true, "data": Budget }`
*   **Status**: **MISSING** (Falls back to localStorage limit override)

### Feature: Log Custom Non-Activity Expense
*   **Frontend Function**: `tripService.addExpense(tripId, title, amount, category, date)`
*   **HTTP Method**: `POST`
*   **Endpoint**: `/api/trips/:id/budget/expenses`
*   **Request Body**: `{ "title": "...", "amount": 100, "category": "...", "date": "..." }`
*   **Expected Response**: `{ "success": true, "data": Expense }`
*   **Status**: **MISSING** (Falls back to localStorage logs)

### Feature: Delete Custom Expense Log
*   **Frontend Function**: `tripService.deleteExpense(tripId, expenseId)`
*   **HTTP Method**: `DELETE`
*   **Endpoint**: `/api/trips/:id/budget/expenses/:expenseId`
*   **Request Body**: None
*   **Expected Response**: `204 No Content`
*   **Status**: **MISSING** (Falls back to localStorage logs)
