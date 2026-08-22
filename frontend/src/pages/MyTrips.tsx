import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { Trip } from '../services/api';

export const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Ongoing' | 'Completed'>('All');
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
    if (filter === 'Upcoming') {
      return trips.filter(t => !t.startDate || t.startDate > today);
    }
    if (filter === 'Ongoing') {
      return trips.filter(t => t.startDate && t.startDate <= today && t.endDate && t.endDate >= today);
    }
    if (filter === 'Completed') {
      return trips.filter(t => t.endDate && t.endDate < today);
    }
    return trips;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-primary/60 mt-4">Loading your journeys...</p>
      </div>
    );
  }

  const filteredTrips = getFilteredTrips();

  return (
    <div className="flex-grow w-full flex flex-col gap-10 py-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">My Trips</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A collection of your past and future wanderings.
          </p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Plan a New Trip
        </button>
      </div>

      {/* Tabs Filter from Stitch */}
      <div className="flex space-x-8 border-b border-outline-variant/30 mb-10 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Upcoming', 'Ongoing', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`font-label-md text-label-md transition-colors pb-3 whitespace-nowrap border-b-2 -mb-[13px] ${
              filter === tab
                ? 'text-primary border-primary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bento Grid Layout of Trips */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {filteredTrips.map((trip, idx) => {
            const firstStopImage = trip.stops?.[0]?.city?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
            const spent = trip.budget?.expenses.reduce((sum, e) => sum + e.amount, 0) || 0;
            const limit = trip.budget?.totalLimit || 0;
            
            // First item spans full width (12 cols) like the Hero Bento Card in Stitch, others span 6 cols
            const isHero = idx === 0 && filter === 'All';
            const gridClass = isHero 
              ? "col-span-1 md:col-span-12 rounded-xl bg-surface border border-outline-variant/30 overflow-hidden group hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all duration-300 relative h-[500px] flex flex-col justify-end p-8 cursor-pointer"
              : "col-span-1 md:col-span-6 rounded-xl bg-surface border border-outline-variant/30 overflow-hidden group hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all duration-300 flex flex-col h-[400px] cursor-pointer";

            if (isHero) {
              const stopsWithActivities = trip.stops.filter(s => s.activities && s.activities.length > 0).length;
              const hasStops = trip.stops.length > 0;
              const progressPct = hasStops ? Math.min(Math.max(Math.round((stopsWithActivities / trip.stops.length) * 100), 20), 100) : 40;
              
              return (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}/builder`)}
                  className={gridClass}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0 transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    style={{ backgroundImage: `url('${firstStopImage}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10"></div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, trip.id)}
                    className="absolute top-6 right-6 bg-white/20 hover:bg-error/90 hover:text-white text-white p-2 rounded-full backdrop-blur-md transition-colors flex items-center justify-center z-30"
                    title="Delete Trip"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>

                  <div className="relative z-20 w-full max-w-3xl text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider font-bold">Upcoming</span>
                      <span className="text-white/80 font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_month</span> 
                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'} - {trip.endDate ? new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                      </span>
                    </div>
                    
                    <h2 className="font-headline-md text-headline-md text-white mb-6 font-semibold">{trip.name}</h2>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 w-full max-w-md">
                        <div className="flex justify-between font-label-sm text-label-sm text-white/90 mb-2">
                          <span>Planning Progress</span>
                          <span>{progressPct}%</span>
                        </div>
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-white h-full rounded-full" style={{ width: `${progressPct}%` }}></div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/builder`); }}
                        className="bg-white text-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-bright transition-colors flex items-center gap-2 whitespace-nowrap font-semibold"
                      >
                        Continue Planning
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Normal Card:
            return (
              <div
                key={trip.id}
                onClick={() => navigate(`/trips/${trip.id}/builder`)}
                className={gridClass}
              >
                <div className="h-3/5 w-full relative overflow-hidden shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    style={{ backgroundImage: `url('${firstStopImage}')` }}
                  ></div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, trip.id)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-error/90 hover:text-white text-white p-2 rounded-full backdrop-blur-md transition-colors flex items-center justify-center z-30"
                    title="Delete Trip"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-surface text-left">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">Past Journey</span>
                      <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">route</span> 
                        {trip.stops.length} Stops
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold line-clamp-1">{trip.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">
                      {trip.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'TBD'} • ${spent} / ${limit}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/builder`); }}
                    className="border border-primary text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors w-full mt-4 font-semibold text-center"
                  >
                    View Trip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-16 text-center border border-outline-variant/30 shadow-md flex flex-col items-center max-w-xl mx-auto space-y-6">
          <span className="material-symbols-outlined text-[64px] text-primary/30">map</span>
          <h3 className="font-headline-md text-primary">No journeys found</h3>
          <p className="font-body-md text-on-surface-variant max-w-sm text-center">
            You don't have any trips categorized under '{filter}'. Plan a new trip to start building your itineraries.
          </p>
          <button
            onClick={() => navigate('/trips/new')}
            className="bg-primary text-on-primary hover:bg-secondary px-8 py-3 rounded-full font-label-md transition-colors active:scale-95 font-semibold"
          >
            Create a New Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
