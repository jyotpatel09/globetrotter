# 🌍 GlobeTrotter

> ## Plan. Discover. Organize. Explore.
>
> **A unified multi-city travel planning platform built for the Odoo × LDCE Ahmedabad Hackathon 2026.**

GlobeTrotter transforms complex travel planning into one seamless experience.

Planning a multi-city journey usually means switching between different platforms to discover destinations, find activities, manage dates, organize itineraries, track budgets, and share travel plans.

**GlobeTrotter brings these experiences together in one unified platform.**

---

## ✨ Problem Statement

Planning a trip involving multiple cities can quickly become complicated.

Travelers need to manage:

- 🗺️ Multiple destinations
- 📅 Travel dates
- 🎯 Activities
- 🧳 City-wise trip stops
- 📝 Day-wise itineraries
- 💰 Budgets and expenses
- ⏳ Travel schedules
- 🤝 Sharing travel plans

Managing all of this across disconnected applications creates a fragmented and inefficient experience.

### 💡 Our Solution

**GlobeTrotter provides a complete travel planning workflow in one place.**

```text
Discover Destinations
        ↓
Choose Cities
        ↓
Create a Trip
        ↓
Add City Stops
        ↓
Explore Activities
        ↓
Build an Itinerary
        ↓
Track Budget
        ↓
View Timeline & Calendar
        ↓
Share the Journey
```

---

# 🚀 Key Features

## 🧳 Personalized Dashboard

A centralized dashboard gives users an overview of their travel planning experience.

Users can view:

- Upcoming trips
- Planned destinations
- Budget status
- Activities
- Previous journeys
- Travel recommendations

---

## 🗺️ Multi-City Trip Planning

GlobeTrotter is designed for organizing trips involving multiple destinations.

Users can:

- Create a new trip
- Set travel dates
- Define a trip budget
- Add multiple city stops
- Organize destinations into one complete journey

---

## 🔍 Destination Discovery

Users can explore destinations through a visual city discovery experience.

The platform allows travelers to discover cities and explore curated activities based on their interests.

### Activity Categories

- 🍜 Food
- 🏛️ Culture
- 🧘 Relaxation
- 🏄 Adventure

Activities can provide useful information such as:

- Activity name
- Description
- Estimated duration
- Estimated cost
- Associated city

---

## 🎯 Activity Discovery

After selecting destinations, users can explore available activities and add them to the appropriate trip stop.

For example:

> A traveler visiting Goa can discover activities such as beach experiences and water sports and add them directly to their travel plan.

This creates a direct connection between **destination discovery and itinerary planning**.

---

## 🧩 Smart Trip Builder

The Trip Builder brings the complete journey together.

Each destination becomes a structured trip stop, while activities can be attached to individual stops.

Users can:

- Add city stops
- Organize travel destinations
- Manage arrival and departure dates
- Add activities to specific stops
- Schedule activities within the trip

---

## 📅 Day-Wise Itinerary

GlobeTrotter converts destinations and activities into an organized itinerary.

Users can:

- View destinations in travel order
- See activities for each stop
- Organize activities by date and time
- Understand the complete flow of their journey
- Identify free days in their schedule

The backend also provides a dedicated itinerary API that aggregates the complete trip structure.

---

## 💰 Budget Management

GlobeTrotter helps travelers stay aware of their trip expenses.

The platform supports:

- Trip budget setup
- Activity cost tracking
- Total spending calculation
- Remaining budget awareness
- Stop-wise cost breakdown
- Category-wise expense visualization

The backend aggregates activity costs to provide an overall trip budget summary.

---

## ⏳ Timeline & Calendar

Users can understand their journey through chronological views.

The timeline aggregates events such as:

- 🚀 Trip start
- 📍 Stop arrival
- 🎯 Scheduled activities
- 🚗 Stop departure
- 🏁 Trip end

All available events are organized chronologically to provide a clear view of the journey.

---

## 🔐 Secure Authentication

GlobeTrotter integrates authentication using **Supabase Auth**.

The backend:

- Validates Supabase access tokens
- Uses Bearer token authentication
- Extracts the authenticated user identity
- Synchronizes authenticated users with the application database
- Protects user resources
- Prevents unauthorized access to another user's trips

The application does **not trust a `userId` supplied by the client** to determine resource ownership.

Instead, ownership is securely determined from the authenticated user's token.

---

## 🤝 Journey Sharing

Once a journey is planned, users can prepare and share their travel plan through a dedicated shared itinerary experience.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────┐
│             FRONTEND                │
│                                     │
│        React + Vite + Tailwind      │
└──────────────────┬──────────────────┘
                   │
                   │ REST API
                   ▼
┌─────────────────────────────────────┐
│              BACKEND                │
│                                     │
│      Node.js + Express.js           │
│           TypeScript                │                                     │
│      Authentication Middleware      │
└──────────────────┬──────────────────┘
                   │
                   │ Prisma ORM
                   ▼
┌─────────────────────────────────────┐
│             DATABASE                │
│                                     │
│          PostgreSQL                 │
│       Hosted on Supabase            │
└─────────────────────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Supabase

## ORM

- Prisma

## Authentication

- Supabase Authentication
- Bearer Token Authentication

## Development Tools

- Git
- GitHub
- Prisma Migrate
- tsx

---

# 📂 Project Structure

```text
globetrotter/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── API_CONTRACT.md
│   ├── package.json
│   └── .env.example
│
├── docs/
├── stitch-export/
│
└── README.md
```

---

# 🗄️ Database Design

GlobeTrotter uses a relational PostgreSQL database managed through Prisma ORM.

The core entities are:

- `User`
- `Trip`
- `City`
- `Stop`
- `Activity`
- `TripActivity`

### Core Relationship

```text
User
 │
 └──< Trip
        │
        └──< Stop >── City
              │
              └──< TripActivity >── Activity
```

### User

Represents an authenticated GlobeTrotter user.

A user can own multiple trips.

### Trip

Represents a user's complete travel plan.

It stores information such as:

- Trip name
- Travel dates
- Budget
- User ownership

### City

Represents a discoverable travel destination.

### Stop

Represents a city included in a particular trip.

It connects:

- A Trip
- A City
- Arrival information
- Departure information

### Activity

Represents a discoverable activity associated with a city.

It can include:

- Name
- Description
- Estimated cost
- Other activity information

### TripActivity

Connects an Activity to a specific Stop.

It allows trip-specific information such as scheduling activities within the journey.

---

# 🔌 Backend API

The backend provides REST APIs for managing the complete core trip-planning workflow.

## ❤️ Health Check

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "GlobeTrotter API is running"
}
```

---

# 🔐 Authentication API

### Get Current User

```http
GET /api/auth/me
```

### Required Header

```http
Authorization: Bearer <SUPABASE_ACCESS_TOKEN>
```

The backend validates the token and returns the authenticated application user.

---

# 🧳 Trip APIs

### Get All User Trips

```http
GET /api/trips
```

### Create a Trip

```http
POST /api/trips
```

### Get Trip Details

```http
GET /api/trips/:id
```

### Update a Trip

```http
PATCH /api/trips/:id
```

### Delete a Trip

```http
DELETE /api/trips/:id
```

---

# 📅 Advanced Trip APIs

## Get Complete Itinerary

```http
GET /api/trips/:id/itinerary
```

Returns the complete nested trip structure:

```text
Trip
 │
 └── Stops
      │
      ├── City
      │
      └── Scheduled Activities
            │
            └── Activity Details
```

Stops are ordered chronologically and activities are organized according to their scheduled time.

---

## Get Trip Budget

```http
GET /api/trips/:id/budget
```

Returns:

- Total activity cost
- Stop-wise activity cost breakdown

Trips without activities safely return a budget total of `0`.

---

## Get Trip Timeline

```http
GET /api/trips/:id/timeline
```

Aggregates and sorts events chronologically.

Possible event types include:

```text
trip_start
stop_arrival
activity
stop_departure
trip_end
```

---

# 📍 Stop APIs

### Get Trip Stops

```http
GET /api/trips/:id/stops
```

### Add a Stop

```http
POST /api/trips/:id/stops
```

### Update a Stop

```http
PATCH /api/trips/:id/stops/:stopId
```

### Delete a Stop

```http
DELETE /api/trips/:id/stops/:stopId
```

---

# 🎯 Trip Activity APIs

### Get Activities for a Stop

```http
GET /api/trips/:id/stops/:stopId/activities
```

### Add an Activity to a Stop

```http
POST /api/trips/:id/stops/:stopId/activities
```

### Update a Scheduled Activity

```http
PATCH /api/trips/:id/stops/:stopId/activities/:tripActivityId
```

### Remove an Activity

```http
DELETE /api/trips/:id/stops/:stopId/activities/:tripActivityId
```

---

# 🔒 Security & Resource Ownership

All protected APIs use authentication middleware.

```text
Client
   │
   │ Authorization: Bearer Token
   ▼
Supabase Authentication
   │
   ▼
Backend Authentication Middleware
   │
   ▼
Authenticated User ID
   │
   ▼
Trip Ownership Verification
   │
   ▼
Database Operation
```

For every protected trip operation, the backend verifies that the requested resource belongs to the authenticated user.

This prevents users from accessing or modifying another user's data.

Cross-user access attempts are safely rejected.

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/jyotpatel09/globetrotter.git
cd globetrotter
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
backend/.env
```

Use the following structure:

```env
PORT=5000

DATABASE_URL="your_postgresql_connection_string"

SUPABASE_URL="your_supabase_project_url"

SUPABASE_ANON_KEY="your_supabase_anon_key"

FRONTEND_URL="http://localhost:3000"
```

> ⚠️ Never commit `.env` files, database credentials, access tokens, or API keys.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Apply Database Migrations

For local development:

```bash
npx prisma migrate dev
```

---

## 6. Seed Travel Data

```bash
npm run seed
```

The project includes realistic development data for cities and activities.

The seed logic is designed to avoid unnecessary duplication when safely rerun.

---

## 7. Start the Backend

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

---

## 8. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 9. Start the Frontend

```bash
npm run dev
```

---

# 🧪 Backend Verification

The backend database and API foundation has been verified using:

```bash
npx prisma validate
```

```bash
npx prisma generate
```

```bash
npx prisma migrate status
```

```bash
npm run build
```

Core functionality includes verification for:

- ✅ PostgreSQL database connectivity
- ✅ Prisma schema validation
- ✅ Prisma Client generation
- ✅ Database migrations
- ✅ Seed data
- ✅ Express startup
- ✅ Health check
- ✅ Trip CRUD
- ✅ Stop CRUD
- ✅ Trip Activity CRUD
- ✅ Itinerary aggregation
- ✅ Budget aggregation
- ✅ Timeline aggregation
- ✅ Authentication rejection handling
- ✅ Resource ownership protection
- ✅ Empty-state handling
- ✅ Not-found handling
- ✅ TypeScript build

---

# 🌱 Seed Data

The development database includes sample travel data for demonstration and testing.

Example destinations include:

- Ahmedabad
- Mumbai
- Delhi
- Jaipur
- Goa
- Bengaluru

Curated activities are associated with these destinations to support:

- City Discovery
- Activity Discovery
- Trip Building
- Itinerary Creation
- Budget Calculation

---

# 🎯 Complete User Journey

GlobeTrotter is designed around a simple end-to-end travel workflow:

```text
🔐 Login / Register
        ↓
🏠 Personalized Dashboard
        ↓
🧳 Create Trip
        ↓
🗺️ Add Multiple City Stops
        ↓
🔍 Discover Destinations
        ↓
🎯 Discover Activities
        ↓
➕ Add Activities to Stops
        ↓
🧩 Build Trip
        ↓
📅 View Itinerary
        ↓
💰 Track Budget
        ↓
⏳ View Calendar / Timeline
        ↓
🤝 Share Journey
```

---

# 🔮 Future Scope

GlobeTrotter can be expanded with features such as:

- 🤖 AI-powered travel recommendations
- 🧠 Intelligent itinerary optimization
- 🌦️ Real-time weather information
- 🏨 Hotel integrations
- 🚆 Transport integrations
- 👥 Collaborative trip planning
- 💸 Expense splitting
- 🗺️ Map-based route optimization
- 🎯 Personalized activity recommendations
- 🌍 Multi-currency support
- 🔔 Travel reminders and notifications
- 📱 Offline itinerary access

---

# 🏆 Built For

## Odoo × LDCE Ahmedabad Hackathon 2026

GlobeTrotter was developed as a full-stack solution focused on simplifying the challenges of multi-city travel planning.

The project combines:

**Destination Discovery · Activity Planning · Multi-City Trips · Itinerary Management · Budget Tracking · Scheduling · Secure Data Management**

into one connected travel planning experience.

---

# 👥 Team

Built collaboratively for the **Odoo × LDCE Ahmedabad Hackathon 2026**.

The project follows a collaborative development workflow with independently developed frontend, backend, discovery, and itinerary components.

---

# 🌍 GlobeTrotter

## One Journey. One Platform.

> **Discover destinations. Plan every stop. Organize every moment.**

GlobeTrotter brings destination discovery, multi-city planning, activities, itineraries, budgeting, scheduling, and sharing together in one seamless workflow.

**Our goal is simple — to make complex travel planning organized, intuitive, and enjoyable.**

### ✈️ Plan smarter. Travel better.

**Thank you for exploring GlobeTrotter.**
