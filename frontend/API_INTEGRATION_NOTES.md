# API Integration Notes

> **FRONTEND EXPECTATIONS — VERIFY AGAINST BACKEND CONTRACT**
> The following schemas and endpoints represent the interface boundaries built into the React frontend service layer (`tripService.ts`). Use these expectations to align, merge, and verify the frontend actions against Devam's backend controller implementations.

---

## 1. Authentication Operations
*The frontend expects isolated token-based session handling.*

*   **Register User**: `POST /api/auth/register`
    *   *Payload*: `{ name, email, password }`
    *   *Expected Response*: `{ success: true, data: { token, user: { id, name, email } } }`
*   **Login User**: `POST /api/auth/login`
    *   *Payload*: `{ email, password }`
    *   *Expected Response*: `{ success: true, data: { token, user: { id, name, email } } }`

---

## 2. Trip Operations
*The frontend expects standard CRUD operations on trips.*

*   **List Trips**: `GET /api/trips?userId=user-123`
    *   *Expected Response*: `{ success: true, data: Trip[] }`
    *   *Note*: The frontend automatically iterates over returned trips to load child stops and schedules.
*   **Get Trip Detail**: `GET /api/trips/:id`
    *   *Expected Response*: `{ success: true, data: Trip }`
    *   *Trip Object Schema*:
        ```json
        {
          "id": "trip-uuid",
          "userId": "user-uuid",
          "name": "Japan Explorer",
          "startDate": "2026-10-10",
          "endDate": "2026-10-24",
          "createdAt": "2026-08-20T12:00:00Z",
          "updatedAt": "2026-08-20T12:00:00Z",
          "stops": []
        }
        ```
*   **Create Trip**: `POST /api/trips`
    *   *Payload*: `{ userId, name, startDate, endDate }`
    *   *Expected Response*: `{ success: true, data: Trip }`
*   **Update Trip**: `PATCH /api/trips/:id`
    *   *Payload*: `{ name, startDate, endDate }` (all fields optional)
    *   *Expected Response*: `{ success: true, data: Trip }`
*   **Delete Trip**: `DELETE /api/trips/:id`
    *   *Expected Response*: `204 No Content`

---

## 3. Stop Operations
*Trips are divided into sequential stops tied to specific cities.*

*   **List Stops for Trip**: `GET /api/trips/:id/stops`
    *   *Expected Response*: `{ success: true, data: Stop[] }`
*   **Create Stop**: `POST /api/trips/:id/stops`
    *   *Payload*: `{ cityId, arrival, departure }`
    *   *Expected Response*: `{ success: true, data: Stop }`
    *   *Stop Object Schema*:
        ```json
        {
          "id": "stop-uuid",
          "tripId": "trip-uuid",
          "cityId": "city-uuid",
          "arrival": "2026-10-10",
          "departure": "2026-10-15",
          "city": { "id": "city-uuid", "name": "Tokyo", "country": "Japan" },
          "activities": []
        }
        ```
*   **Delete Stop**: `DELETE /api/trips/:id/stops/:stopId`
    *   *Expected Response*: `204 No Content`

---

## 4. Itinerary & Activity Operations
*Activities are scheduled items linked to a specific stop.*

*   **List Scheduled Activities for Stop**: `GET /api/trips/:id/stops/:stopId/activities`
    *   *Expected Response*: `{ success: true, data: TripActivity[] }`
*   **Schedule Activity**: `POST /api/trips/:id/stops/:stopId/activities`
    *   *Payload*: `{ activityId, scheduledAt }`
    *   *Expected Response*: `{ success: true, data: TripActivity }`
    *   *TripActivity Object Schema*:
        ```json
        {
          "id": "trip-activity-uuid",
          "stopId": "stop-uuid",
          "activityId": "activity-uuid",
          "scheduledAt": "2026-10-12T10:00:00Z",
          "activity": { "id": "activity-uuid", "name": "Adalaj Stepwell", "cost": 1 }
        }
        ```
*   **Remove Scheduled Activity**: `DELETE /api/trips/:id/stops/:stopId/activities/:tripActivityId`
    *   *Expected Response*: `204 No Content`

---

## 5. Discovery Operations
*Master directories for cities and activities lists.*

*   **List Cities**: `GET /api/cities`
    *   *Expected Response*: `{ success: true, data: City[] }`
*   **List Activities**: `GET /api/activities` (or filtered: `GET /api/activities?cityId=city-uuid`)
    *   *Expected Response*: `{ success: true, data: Activity[] }`
    *   *Activity Object Schema*:
        ```json
        {
          "id": "activity-uuid",
          "cityId": "city-uuid",
          "name": "Sabarmati Ashram",
          "description": "Historical residence of Gandhi",
          "cost": 0,
          "category": "Culture",
          "duration": "2 Hours"
        }
        ```

---

## 6. Budget & Expense Operations
*Custom logs (accommodation, transport, dining) logged on top of scheduled activity costs.*

*   **Update Budget Limit**: `PATCH /api/trips/:id/budget`
    *   *Payload*: `{ totalLimit }`
    *   *Expected Response*: `{ success: true, data: Budget }`
*   **Create Expense Log**: `POST /api/trips/:id/budget/expenses`
    *   *Payload*: `{ title, amount, category, date }`
    *   *Expected Response*: `{ success: true, data: Expense }`
*   **Delete Expense Log**: `DELETE /api/trips/:id/budget/expenses/:expenseId`
    *   *Expected Response*: `204 No Content`
