import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layouts/AppLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';
import CreateTrip from './pages/CreateTrip';
import CityDiscovery from './pages/Discover/CityDiscovery';
import ActivityDiscovery from './pages/Discover/ActivityDiscovery';
import ItineraryBuilder from './pages/Trip/ItineraryBuilder';
import ItineraryView from './pages/Trip/ItineraryView';
import Budget from './pages/Trip/Budget';
import Calendar from './pages/Trip/Calendar';
import SharedTrip from './pages/SharedTrip';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/share/:token" element={<SharedTrip />} />

        {/* Core application paths (authenticated layout) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trips" element={<MyTrips />} />
          <Route path="trips/new" element={<CreateTrip />} />
          <Route path="discover" element={<CityDiscovery />} />
          <Route path="discover/activities" element={<ActivityDiscovery />} />
          <Route path="trips/:id/builder" element={<ItineraryBuilder />} />
          <Route path="trips/:id/itinerary" element={<ItineraryView />} />
          <Route path="trips/:id/budget" element={<Budget />} />
          <Route path="trips/:id/calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
