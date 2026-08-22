import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { Trip } from '../services/api';

export const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      console.error('Failed to fetch trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip? All planned activities and expenses will be lost.')) {
      setLoading(true);
      try {
        await tripService.deleteTrip(id);
        await fetchTrips();
      } catch (err) {
        console.error('Failed to delete trip:', err);
        setLoading(false);
      }
    }
  };

  const getFilteredTrips = () => {
    const today = new Date().toISOString().split('T')[0];
    if (filter === 'upcoming') {
      return trips.filter(t => !t.endDate || t.endDate >= today);
    }
    if (filter === 'past') {
      return trips.filter(t => t.endDate && t.endDate < today);
    }
    return trips;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-deep-forest/60 mt-4">Loading your journeys...</p>
      </div>
    );
  }

  const filteredTrips = getFilteredTrips();

  return (
    <div className="flex-grow w-full flex flex-col gap-10 py-4">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="font-display-lg text-[40px] text-deep-forest mb-1 leading-tight">My Journeys</h1>
          <p className="font-body-md text-deep-forest/70 text-[15px]">
            Your curated collection of travel journals, planned itineraries, and active explorations.
          </p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="bg-primary text-white hover:bg-secondary border border-deep-forest/20 font-label-md text-label-md px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Plan a Trip
        </button>
      </section>

      {/* Tabs Filter */}
      <div className="flex border-b border-outline-variant/30 pb-1">
        {(['all', 'upcoming', 'past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-3 font-label-md text-label-md uppercase tracking-wider transition-all border-b-2 -mb-[3px] capitalize ${
              filter === tab
                ? 'text-deep-forest border-terracotta font-bold'
                : 'text-deep-forest/50 border-transparent hover:text-deep-forest'
            }`}
          >
            {tab} trips
          </button>
        ))}
      </div>

      {/* Grid of Trips */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => {
            const firstStopImage = trip.stops?.[0]?.city?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
            const spent = trip.budget?.expenses.reduce((sum, e) => sum + e.amount, 0) || 0;
            const limit = trip.budget?.totalLimit || 0;
            
            return (
              <div
                key={trip.id}
                onClick={() => navigate(`/trips/${trip.id}/builder`)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-deep-forest/5 aspect-[4/5] flex flex-col justify-end text-left"
              >
                {/* Image and overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${firstStopImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#02241d]/95 via-[#02241d]/40 to-transparent"></div>

                {/* Top Action Badge - Delete */}
                <button
                  onClick={(e) => handleDelete(e, trip.id)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-error/90 hover:text-white text-white p-2 rounded-full backdrop-blur-md transition-colors flex items-center justify-center"
                  title="Delete Trip"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>

                {/* Details Content */}
                <div className="relative p-6 space-y-4 text-white z-10 w-full">
                  <div className="space-y-1">
                    <p className="font-label-sm text-[11px] tracking-wider uppercase text-white/70 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {trip.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                    </p>
                    <h3 className="font-headline-sm text-[24px] font-bold leading-tight group-hover:text-terracotta transition-colors line-clamp-1">
                      {trip.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-[13px]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-terracotta">location_on</span>
                      {trip.stops.length} stops
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">payments</span>
                      ${spent} / ${limit}
                    </span>
                  </div>

                  {/* Stops Timeline Mini */}
                  {trip.stops.length > 0 && (
                    <div className="border-t border-white/15 pt-3 flex items-center gap-2 text-[12px] text-white/80 overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="font-semibold text-white">Stops:</span>
                      <span className="line-clamp-1">
                        {trip.stops.map(s => s.city?.name).join(' → ')}
                      </span>
                    </div>
                  )}

                  {/* Grid Quick Navigation Links (Revealed on hover on desktop) */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/builder`); }}
                      className="bg-white/10 hover:bg-white/20 py-1.5 rounded-lg text-center font-label-sm text-[12px] transition-colors"
                    >
                      Builder
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/budget`); }}
                      className="bg-white/10 hover:bg-white/20 py-1.5 rounded-lg text-center font-label-sm text-[12px] transition-colors"
                    >
                      Budget
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/calendar`); }}
                      className="bg-white/10 hover:bg-white/20 py-1.5 rounded-lg text-center font-label-sm text-[12px] transition-colors"
                    >
                      Calendar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-16 text-center border border-deep-forest/5 shadow-md flex flex-col items-center max-w-xl mx-auto space-y-6">
          <span className="material-symbols-outlined text-[64px] text-deep-forest/30">map</span>
          <h3 className="font-headline-md text-deep-forest">No journeys found</h3>
          <p className="font-body-md text-on-surface-variant max-w-sm">
            You don't have any trips categorized under '{filter}'. Plan a new trip to start building your itineraries.
          </p>
          <button
            onClick={() => navigate('/trips/new')}
            className="bg-primary text-on-primary hover:bg-secondary px-8 py-3 rounded-full font-label-md transition-colors active:scale-95"
          >
            Create a New Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
