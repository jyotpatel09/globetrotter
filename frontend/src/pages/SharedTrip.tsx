import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { Trip, TripActivity } from '../services/api';

export const SharedTrip: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      if (!token) return;
      try {
        // Extract actual trip ID from the token (e.g., token-tripId)
        const tripId = token.replace('token-', '');
        const tripData = await tripService.getTripById(tripId);
        
        if (tripData) {
          setTrip(tripData);
        }
      } catch (err) {
        console.error('Failed to load shared trip details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-primary/60 mt-4 font-semibold">Retrieving shared itinerary...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center space-y-6">
        <span className="material-symbols-outlined text-[64px] text-primary/20">link_off</span>
        <h2 className="font-headline-sm text-primary font-bold">Shared Trip Not Found</h2>
        <p className="font-body-md text-on-surface-variant max-w-sm">
          The link might have expired, or this trip is no longer public. Check the URL and try again.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary hover:bg-surface-tint text-on-primary px-6 py-2.5 rounded-xl font-semibold font-label-sm"
        >
          Go to GlobeTrotter
        </button>
      </div>
    );
  }

  const coverImage = trip.stops?.[0]?.city?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';

  // Generate simple day list
  const getDays = () => {
    if (!trip.startDate || !trip.endDate) {
      return trip.stops.map((stop, idx) => ({
        label: `Stop #${idx + 1}`,
        dateStr: stop.arrival ? new Date(stop.arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Flexible',
        stop,
        activities: stop.activities || []
      }));
    }

    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days: Array<{
      label: string;
      dateStr: string;
      dateKey: string;
      stop: typeof trip.stops[0] | null;
      activities: TripActivity[];
    }> = [];

    const current = new Date(start);
    let dayNum = 1;

    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      const dateStr = current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      const matchingStop = trip.stops.find(s => {
        if (!s.arrival || !s.departure) return false;
        return dateKey >= s.arrival && dateKey <= s.departure;
      }) || null;

      const dayActivities: TripActivity[] = [];
      trip.stops.forEach(s => {
        if (s.activities) {
          s.activities.forEach(act => {
            if (act.scheduledAt && act.scheduledAt.startsWith(dateKey)) {
              dayActivities.push(act);
            }
          });
        }
      });

      days.push({
        label: `Day ${dayNum}`,
        dateStr,
        dateKey,
        stop: matchingStop,
        activities: dayActivities
      });

      current.setDate(current.getDate() + 1);
      dayNum++;
    }

    return days;
  };

  const timelineDays = getDays();

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      {/* Floating Top Bar */}
      <header className="bg-white/70 backdrop-blur-md sticky top-0 border-b border-outline-variant/30 z-50 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-headline-sm text-[22px] text-primary tracking-tight font-bold">GlobeTrotter</span>
          <span className="text-[11px] font-label-sm text-secondary bg-secondary-container/20 border border-secondary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            Shared Journey
          </span>
        </div>
        <button
          onClick={() => navigate('/register')}
          className="bg-primary hover:bg-surface-tint text-on-primary font-label-sm text-[12px] px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm font-semibold"
        >
          Create Your Own Trip
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-10 space-y-12">
        {/* Cover Banner */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md border border-outline-variant/30">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${coverImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 md:left-12 text-white text-left">
            <p className="font-label-sm text-[11px] tracking-wider uppercase text-white/80 font-medium">Shared Curated Itinerary</p>
            <h2 className="font-display-lg text-[36px] md:text-[48px] font-bold leading-tight mt-1">{trip.name}</h2>
            {trip.description && <p className="text-[14px] text-white/85 mt-1 font-body-md">{trip.description}</p>}
          </div>
        </div>

        {/* Overview Block */}
        {trip.fullDescription && (
          <div className="bg-white border border-outline-variant/30 rounded-xl p-6 text-left shadow-sm">
            <h3 className="font-label-sm text-[12px] uppercase text-terracotta tracking-wider font-semibold mb-2">Trip Overview</h3>
            <p className="font-body-md text-on-surface-variant text-[14px] leading-relaxed">{trip.fullDescription}</p>
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-outline-variant/20 text-[13px] text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">explore</span> Style: {trip.travelStyle || 'Explore'}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">filter_hdr</span> Difficulty: {trip.difficulty || 'Easy'}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">wb_sunny</span> Season: {trip.bestSeason || 'Anytime'}</span>
            </div>
          </div>
        )}

        {/* Timeline content */}
        <div className="relative border-l-2 border-primary/20 ml-6 md:ml-36 pl-6 md:pl-8 space-y-12 py-4">
          {timelineDays.map((day, idx) => (
            <div key={idx} className="relative group text-left">
              {/* Left Timeline Tag - Desktop only */}
              <div className="absolute hidden md:block -left-[160px] top-1.5 w-28 text-right">
                <span className="font-headline-sm text-[20px] font-bold text-primary block leading-none">{day.label}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase mt-1 block font-medium">
                  {day.dateStr}
                </span>
              </div>

              {/* Mobile Timeline Tag - Mobile only */}
              <div className="md:hidden mb-2">
                <span className="font-headline-sm text-[18px] font-bold text-primary">{day.label}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase ml-2">
                  ({day.dateStr})
                </span>
              </div>

              {/* Bullet circle along the vertical line */}
              <span className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-white group-hover:bg-secondary transition-colors" />

              {/* Content body */}
              <div className="space-y-4 text-left">
                {day.stop && (
                  <div className="flex items-center gap-1.5 text-secondary font-label-sm text-[12px] uppercase tracking-wider font-semibold">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>Exploring stop in {day.stop.city?.name}</span>
                  </div>
                )}

                {day.activities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {day.activities.map((tripAct) => (
                      <div
                        key={tripAct.id}
                        className="bg-white border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between"
                      >
                        <div className="h-32 relative overflow-hidden">
                          <img
                            src={tripAct.activity?.image}
                            alt={tripAct.activity?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 space-y-3">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="font-semibold text-primary text-[15px] line-clamp-1">
                              {tripAct.activity?.name}
                            </h4>
                            <span className="text-[12px] font-bold text-primary font-body-md shrink-0">
                              {tripAct.activity?.cost === 0 ? 'Free' : `$${tripAct.activity?.cost}`}
                            </span>
                          </div>
                          
                          <p className="text-[12.5px] text-on-surface-variant line-clamp-2 leading-relaxed">
                            {tripAct.activity?.description}
                          </p>

                          <div className="flex justify-between items-center text-[11px] border-t border-outline-variant/20 pt-2.5 mt-auto">
                            <span className="text-secondary uppercase tracking-wider font-semibold font-label-sm">
                              {tripAct.activity?.category}
                            </span>
                            <span className="text-primary/70 flex items-center gap-0.5 font-medium">
                              <span className="material-symbols-outlined text-[13px]">schedule</span>
                              {tripAct.activity?.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/40 border border-dashed border-outline-variant/30 rounded-xl p-6 text-center text-on-surface-variant text-[13px] max-w-md">
                    Resting or travel transit. No public activities scheduled.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20 py-8 text-center text-[13px] text-on-surface-variant">
        <p>© 2026 GlobeTrotter Curated Travel Itineraries. All rights reserved.</p>
        <p className="mt-1">Designed by Jyot Patel for Odoo x LDCE Hackathon.</p>
      </footer>
    </div>
  );
};

export default SharedTrip;
