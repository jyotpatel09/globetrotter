# GlobeTrotter Discovery Module API Documentation

This document describes the Discovery APIs for City and Activity search, filtering, and detail exploration in GlobeTrotter.

All endpoints expect and return JSON. The base path is `/api`.

---

## Standard Response Conventions

### Success Response (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "data": [ ... ] // or { ... }
}
```

### Error Response (`400 Bad Request` / `404 Not Found` / `500 Internal Server Error`)
```json
{
  "success": false,
  "message": "Detailed error message"
}
```

---

## Endpoints

### 1. List & Search Cities
- **Method**: `GET`
- **URL**: `/api/cities`
- **Purpose**: Retrieve a list of travel destinations / cities with optional text search and country filtering.
- **Authentication**: Not required

#### Query Parameters
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `search` | String | Optional | Case-insensitive search on city name or country | `tokyo` |
| `country` | String | Optional | Filter by country name | `Japan` |
| `page` | Integer | Optional | Page number for pagination (minimum: 1) | `1` |
| `limit` | Integer | Optional | Number of items per page (minimum: 1, default: 20) | `10` |

#### Responses
- **`200 OK`**: Successfully retrieved cities. Returns an empty array `[]` if no matches are found.
- **`400 Bad Request`**: Invalid query parameters (e.g. non-positive integer for `page` or `limit`).

#### Example Request
```http
GET /api/cities?search=tokyo
```

#### Example Response (`200 OK`)
```json
{
  "success": true,
  "data": [
    {
      "id": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
      "name": "Tokyo",
      "country": "Japan",
      "_count": {
        "activities": 4
      }
    }
  ]
}
```

---

### 2. Get City Details
- **Method**: `GET`
- **URL**: `/api/cities/:id`
- **Purpose**: Retrieve details of a specific city including its available activities.
- **Authentication**: Not required

#### Path Parameters
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | Required | Unique identifier of the city | `c1f7a04e-6e21-4f38-9e58-9b889b7b2512` |

#### Responses
- **`200 OK`**: City found and returned.
- **`404 Not Found`**: No city exists with the specified ID.

#### Example Request
```http
GET /api/cities/c1f7a04e-6e21-4f38-9e58-9b889b7b2512
```

#### Example Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
    "name": "Tokyo",
    "country": "Japan",
    "activities": [
      {
        "id": "a98e21cf-8302-4bb3-8b77-3e110c9a4411",
        "cityId": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
        "name": "Senso-ji Temple",
        "description": "Culture: Historic Buddhist temple located in Asakusa with iconic giant red lantern",
        "cost": 0
      },
      {
        "id": "b31f7a90-3441-4702-8ac5-d9134bb76209",
        "cityId": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
        "name": "Shibuya Crossing & Hachiko Statue",
        "description": "Sightseeing: World-famous pedestrian scramble crossing and memorial statue",
        "cost": 0
      }
    ]
  }
}
```

---

### 3. List & Search Activities
- **Method**: `GET`
- **URL**: `/api/activities`
- **Purpose**: Search, filter, and discover activities across cities with flexible filters (city, search keyword, category, and budget/cost).
- **Authentication**: Not required

#### Query Parameters
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `cityId` | String | Optional | Filter activities by specific city ID | `c1f7a04e-6e21-4f38-9e58-9b889b7b2512` |
| `search` | String | Optional | Search in activity name or description | `temple` |
| `category` | String | Optional | Filter by category (e.g. `Culture`, `Food`, `History`, `Nature`, `Sightseeing`, `Adventure`) | `Culture` |
| `cost` / `maxCost` | Number | Optional | Maximum activity cost in USD (non-negative number) | `25` |
| `minCost` | Number | Optional | Minimum activity cost in USD (non-negative number) | `0` |
| `duration` | Number | Optional | Duration filter (non-negative number) | `2` |
| `page` | Integer | Optional | Page number for pagination (minimum: 1) | `1` |
| `limit` | Integer | Optional | Number of items per page (minimum: 1, default: 20) | `10` |

#### Responses
- **`200 OK`**: Successfully retrieved activities. Returns empty array `[]` if no matches are found.
- **`400 Bad Request`**: Malformed query parameters (e.g. negative cost or negative duration).

#### Example Requests
- **Search by keyword**: `GET /api/activities?search=temple`
- **Filter by city**: `GET /api/activities?cityId=c1f7a04e-6e21-4f38-9e58-9b889b7b2512`
- **Filter by category**: `GET /api/activities?category=Culture`
- **Combined filter**: `GET /api/activities?cityId=c1f7a04e-6e21-4f38-9e58-9b889b7b2512&category=Culture&maxCost=30`

#### Example Response (`200 OK`)
```json
{
  "success": true,
  "data": [
    {
      "id": "a98e21cf-8302-4bb3-8b77-3e110c9a4411",
      "cityId": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
      "name": "Senso-ji Temple",
      "description": "Culture: Historic Buddhist temple located in Asakusa with iconic giant red lantern",
      "cost": 0,
      "city": {
        "id": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
        "name": "Tokyo",
        "country": "Japan"
      }
    }
  ]
}
```

---

### 4. Get Activity Details
- **Method**: `GET`
- **URL**: `/api/activities/:id`
- **Purpose**: Retrieve full details of a specific activity including city information.
- **Authentication**: Not required

#### Path Parameters
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String (UUID) | Required | Unique identifier of the activity | `a98e21cf-8302-4bb3-8b77-3e110c9a4411` |

#### Responses
- **`200 OK`**: Activity found and returned.
- **`404 Not Found`**: Activity not found with specified ID.

#### Example Request
```http
GET /api/activities/a98e21cf-8302-4bb3-8b77-3e110c9a4411
```

#### Example Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "a98e21cf-8302-4bb3-8b77-3e110c9a4411",
    "cityId": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
    "name": "Senso-ji Temple",
    "description": "Culture: Historic Buddhist temple located in Asakusa with iconic giant red lantern",
    "cost": 0,
    "city": {
      "id": "c1f7a04e-6e21-4f38-9e58-9b889b7b2512",
      "name": "Tokyo",
      "country": "Japan"
    }
  }
}
```

---

## Frontend Integration Handoff Guide

| Use Case | API Endpoint & Query |
| :--- | :--- |
| **Search cities by name/country** | `GET /api/cities?search=tokyo` |
| **Filter cities by country** | `GET /api/cities?country=Japan` |
| **Get city details + activities** | `GET /api/cities/:id` |
| **Get all activities for a chosen city** | `GET /api/activities?cityId=<cityId>` |
| **Search activities across cities** | `GET /api/activities?search=temple` |
| **Filter activities by category** | `GET /api/activities?category=Culture` |
| **Filter activities by budget / cost** | `GET /api/activities?maxCost=20` |
| **Paginate city list** | `GET /api/cities?page=1&limit=10` |
