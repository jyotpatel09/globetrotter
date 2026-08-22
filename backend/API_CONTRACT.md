# GlobeTrotter Backend API Contract (FINAL)

All endpoints expect and return JSON. The API base path is `/api`.

Standard success response format:
```json
{
  "success": true,
  "data": { ... }
}
```
Standard error response format:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Authentication Flow & Security

**Frontend Integration Flow:**
1. Frontend authenticates with **Supabase Auth**.
2. Frontend receives the Supabase `access_token` (JWT).
3. Frontend sends this token in the `Authorization` header for all protected API requests.
4. Backend verifies the token via Supabase securely.
5. Backend derives the user identity (`req.userId`) and automatically synchronizes the local `User` record if needed.
6. Backend automatically scopes all `Trips` (and their nested Stops/Activities) to that user.

**Critical Security Rule:**
- **DO NOT** send `userId` in request bodies or query parameters. The backend completely ignores client-supplied user IDs to prevent privilege escalation. Ownership is strictly enforced via the `Authorization` token.

**Header Format:**
```
Authorization: Bearer <Supabase Access Token>
```

**Common Auth Errors (401 Unauthorized):**
- `Missing authorization token`
- `Invalid authorization format`
- `Invalid or expired token`

---

## Public Endpoints

### `GET /health`
Returns the server status.
- **Auth required**: No
- **Response**: `200 OK`
```json
{ "status": "ok", "timestamp": "2026-08-22T00:00:00.000Z" }
```

---

## Protected Endpoints

### `GET /auth/me`
Returns the authenticated local application user profile (synchronized from Supabase).
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: User object

---

### Trips

### `GET /trips`
List all trips owned by the authenticated user.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Array of Trip objects (including `stops`)

### `POST /trips`
Create a new trip. The authenticated user is automatically assigned as the owner.
- **Auth required**: Yes
- **Body**: 
  - `name` (string, required)
  - `startDate` (datetime string, optional)
  - `endDate` (datetime string, optional)
- **Response**: `201 Created`, `data`: Trip object

### `GET /trips/:id`
Get a specific trip by ID.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Trip object (including `stops` and nested `city`)
- **Error**: `404 Trip not found` (if it does not exist or belongs to another user)

### `PATCH /trips/:id`
Update a specific trip.
- **Auth required**: Yes
- **Body**: `name`, `startDate`, `endDate` (all optional)
- **Response**: `200 OK`, `data`: Updated Trip object
- **Error**: `404 Trip not found`

### `DELETE /trips/:id`
Delete a specific trip.
- **Auth required**: Yes
- **Response**: `204 No Content`
- **Error**: `404 Trip not found`

---

### Aggregate Endpoints

*(Note: These endpoints also enforce Trip ownership. They return 404 if the Trip belongs to a different user.)*

### `GET /trips/:id/itinerary`
Get the complete aggregated itinerary for a trip.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Trip object including all Stops (ordered by `arrival` asc) and their associated TripActivities (ordered by `scheduledAt` asc). Nested `City` and `Activity` details are included.

### `GET /trips/:id/budget`
Get the aggregated budget for a trip.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`:
```json
{
  "total": 150.50,
  "breakdown": [
    {
      "stopId": "uuid",
      "city": "Paris",
      "activitiesCost": 150.50
    }
  ]
}
```

### `GET /trips/:id/timeline`
Get the chronological timeline of events for a trip.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: 
```json
{
  "trip": { "id": "uuid", "name": "Euro Trip" },
  "events": [
    { "type": "trip_start", "date": "2026-10-01T00:00:00Z", "title": "Start of Euro Trip" },
    { "type": "stop_arrival", "date": "2026-10-02T10:00:00Z", "title": "Arrive in Paris" },
    { "type": "activity", "date": "2026-10-03T15:00:00Z", "title": "Eiffel Tower", "city": "Paris" }
  ]
}
```

---

### Stops

### `GET /trips/:id/stops`
List all stops for a trip.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Array of Stop objects (ordered by `arrival` asc)

### `POST /trips/:id/stops`
Create a stop in a trip.
- **Auth required**: Yes
- **Body**:
  - `cityId` (string, required)
  - `arrival` (datetime string, optional)
  - `departure` (datetime string, optional)
- **Response**: `201 Created`, `data`: Stop object

### `PATCH /trips/:id/stops/:stopId`
Update a stop.
- **Auth required**: Yes
- **Body**: `arrival`, `departure` (optional)
- **Response**: `200 OK`, `data`: Updated Stop object

### `DELETE /trips/:id/stops/:stopId`
Delete a stop.
- **Auth required**: Yes
- **Response**: `204 No Content`

---

### Trip Activities

### `GET /trips/:id/stops/:stopId/activities`
List all activities scheduled for a stop.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Array of TripActivity objects (ordered by `scheduledAt` asc)

### `POST /trips/:id/stops/:stopId/activities`
Schedule an activity for a stop.
- **Auth required**: Yes
- **Body**:
  - `activityId` (string, required)
  - `scheduledAt` (datetime string, optional)
- **Response**: `201 Created`, `data`: TripActivity object

### `PATCH /trips/:id/stops/:stopId/activities/:tripActivityId`
Update a scheduled activity.
- **Auth required**: Yes
- **Body**: `scheduledAt` (optional)
- **Response**: `200 OK`, `data`: Updated TripActivity object

### `DELETE /trips/:id/stops/:stopId/activities/:tripActivityId`
Remove a scheduled activity from a stop.
- **Auth required**: Yes
- **Response**: `204 No Content`
