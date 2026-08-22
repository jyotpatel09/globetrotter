# GlobeTrotter Backend API Contract

All endpoints expect and return JSON. Base path is `/api`.
Standard response format:
```json
{
  "success": true,
  "data": { ... }
}
```
Error format:
```json
{
  "success": false,
  "message": "Error message"
}
```

*Note: Database integration is prepared but cannot be tested against a live Postgres DB until the `DATABASE_URL` is configured.*
*

---

## Health
### `GET /health`
Returns the server status.
- **Auth required**: No
- **Response**: `200 OK`
```json
{ "status": "ok", "timestamp": "2026-08-22T00:00:00.000Z" }
```

---

## Trips
### `GET /trips`
List all trips for the authenticated user.
- **Auth required**: Yes (Temporary: pass `userId` in query)
- **Response**: `200 OK`, `data`: Array of Trip objects (including `stops`)

### `POST /trips`
Create a new trip.
- **Auth required**: Yes
- **Body**: 
  - `userId` (string, required temporarily)
  - `name` (string, required)
  - `startDate` (datetime string, optional)
  - `endDate` (datetime string, optional)
- **Response**: `201 Created`, `data`: Trip object

### `GET /trips/:id`
Get a specific trip by ID.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Trip object (including `stops` and nested `city`)
- **Error**: `404 Not Found`

### `GET /trips/:id/itinerary`
Get the complete aggregated itinerary for a trip.
- **Purpose**: Returns the full Trip including all Stops (ordered by arrival) and their associated TripActivities (ordered by scheduledAt), along with nested City and Activity details.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Trip object (including nested `stops` -> `city` & `activities` -> `activity`). Empty stops/activities arrays are returned if none exist.
- **Error**: `404 Not Found` (if the trip does not exist)

### `PATCH /trips/:id`
Update a specific trip.
- **Auth required**: Yes
- **Body**: `name`, `startDate`, `endDate` (all optional)
- **Response**: `200 OK`, `data`: Updated Trip object
- **Error**: `404 Not Found`

### `DELETE /trips/:id`
Delete a specific trip.
- **Auth required**: Yes
- **Response**: `204 No Content`
- **Error**: `404 Not Found`

---

## Stops
### `GET /trips/:id/stops`
List all stops for a trip.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Array of Stop objects

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

## Trip Activities
### `GET /trips/:id/stops/:stopId/activities`
List all activities scheduled for a stop.
- **Auth required**: Yes
- **Response**: `200 OK`, `data`: Array of TripActivity objects

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

### \GET /trips/:id/budget\
Get the aggregated budget for a trip.
- **Purpose**: Calculates the total cost of all activities scheduled within a trip, along with a per-stop breakdown.
- **Auth required**: Yes
- **Response**: \200 OK\, \data\: Object containing \	otal\ and \reakdown\ array. Trips with no activities return total 0.
- **Error**: \404 Not Found\ (if the trip does not exist)

### \GET /trips/:id/timeline\
Get the chronological timeline of events for a trip.
- **Purpose**: Returns an ordered list of events (trip start/end, stop arrivals/departures, and scheduled activities). Only returns items with set dates.
- **Auth required**: Yes
- **Response**: \200 OK\, \data\: Object containing \	rip\ summary and \events\ array. Events array is empty if no dates are set on any associated items.
- **Error**: \404 Not Found\ (if the trip does not exist)

---

## Authentication
### \GET /auth/me\
Returns the authenticated application user.
- **Auth required**: Yes (Bearer token via Authorization header)
- **Header format**: \Authorization: Bearer <Supabase Access Token>\
- **Response**: \200 OK\, \data\: User object
- **Errors**: 
  - \401 Missing authorization token\
  - \401 Invalid authorization format\
  - \401 Invalid or expired token\

*Note on Trip & Stop APIs: All these routes require a valid Supabase access token in the Authorization header. Ownership is inferred automatically; \userId\ fields in requests will be ignored, and cross-user access will return a 404.*
