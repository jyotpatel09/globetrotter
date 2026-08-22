import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip, Stop, TripActivity } from '../../services/api';

export const ItineraryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const tripData = tripService.getTripById(id);
    if (tripData) {
      setTrip(tripData);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-deep-forest/60 mt-4">Generating your travel journal...</p>
      </div>
    );
  }

  if (!trip) return null;

  // Generate days timeline dynamically based on start and end dates
  const generateTimelineDays = () => {
    if (!trip.startDate || !trip.endDate) {
      // Fallback: Group by stop
      return trip.stops.map((stop, idx) => ({
        label: `Destination #${idx + 1}`,
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
      stop: Stop | null;
      activities: TripActivity[];
    }> = [];

    const current = new Date(start);
    let dayNum = 1;

    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      const dateStr = current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      // Find matching stop for this date
      const matchingStop = trip.stops.find(s => {
        if (!s.arrival || !s.departure) return false;
        return dateKey >= s.arrival && dateKey <= s.departure;
      }) || null;

      // Find matching scheduled activities on this date
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

  const timelineDays = generateTimelineDays();
  const coverImage = trip.stops?.[0]?.city?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="flex-grow w-full flex flex-col gap-6 py-2 text-left">
      {/* Sub Navigation / Header tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-label-sm text-[12px] text-terracotta uppercase tracking-wider font-semibold">Travel Journal</span>
          <h1 className="font-display-lg text-[32px] md:text-[36px] font-bold text-primary">{trip.name}</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="px-4 py-2 bg-white border border-deep-forest/10 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Builder
          </Link>
          <Link to={`/trips/${trip.id}/itinerary`} className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wide">
            Itinerary
          </Link>
          <Link to={`/trips/${trip.id}/budget`} className="px-4 py-2 bg-white border border-deep-forest/10 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Budget
          </Link>
          <Link to={`/trips/${trip.id}/calendar`} className="px-4 py-2 bg-white border border-deep-forest/10 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Calendar
          </Link>
          <Link to={`/share/token-${trip.id}`} className="px-4 py-2 bg-white border border-deep-forest/10 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">share</span> Share
          </Link>
        </nav>
      </div>

      {/* Cover Image banner */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-md border border-deep-forest/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${coverImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 md:left-12 text-white">
          <p className="font-label-sm text-[11px] tracking-wider uppercase text-white/80">Active Journey Timeline</p>
          <h2 className="font-display-lg text-[36px] md:text-[48px] font-bold leading-tight">{trip.name}</h2>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto w-full py-8">
        <div className="relative border-l-2 border-primary/10 ml-6 md:ml-36 pl-8 md:pl-12 space-y-12">
          {timelineDays.map((day, idx) => (
            <div key={idx} className="relative group">
              {/* Left Timeline Tag - Desktop only */}
              <div className="absolute hidden md:block -left-[160px] top-1.5 w-28 text-right">
                <span className="font-headline-sm text-[20px] font-bold text-primary block leading-none">{day.label}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase mt-1 block">
                  {day.dateStr}
                </span>
              </div>

              {/* Mobile Timeline Tag - Mobile only (bullet point circle matches both) */}
              <div className="md:hidden mb-2">
                <span className="font-headline-sm text-[18px] font-bold text-primary">{day.label}</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase ml-2">
                  ({day.dateStr})
                </span>
              </div>

              {/* Bullet circle along the vertical line */}
              <span className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-white group-hover:bg-terracotta transition-colors" />

              {/* Content box */}
              <div className="space-y-4 text-left">
                {/* Current city header */}
                {day.stop ? (
                  <div className="flex items-center gap-2 text-secondary font-label-sm text-[12px] uppercase tracking-wider font-semibold">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>Curating stop in {day.stop.city?.name}</span>
                  </div>
                ) : (
                  <div className="text-[12px] text-on-surface-variant italic">Transit or resting day</div>
                )}

                {/* Day's Activities */}
                {day.activities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {day.activities.map((tripAct) => (
                      <div
                        key={tripAct.id}
                        className="bg-white border border-deep-forest/5 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between"
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
                            <h4 className="font-semibold text-deep-forest text-[15px] line-clamp-1">
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
                            <span className="text-primary/70 flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">schedule</span>
                              {tripAct.activity?.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/40 border border-dashed border-outline-variant/60 rounded-2xl p-6 text-center text-on-surface-variant text-[13px]">
                    No activities scheduled for this day.{' '}
                    <Link to={`/trips/${trip.id}/builder`} className="text-secondary font-semibold hover:underline">
                      Go to Builder to add experiences.
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {timelineDays.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-deep-forest/5 shadow-sm p-8">
              <span className="material-symbols-outlined text-[48px] text-deep-forest/30">calendar_today</span>
              <p className="font-body-md text-on-surface-variant mt-3 text-[14px]">
                No dates configured. Edit your trip properties to set dates, or configure stops.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;
