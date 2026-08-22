import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip, TripActivity } from '../../services/api';

export const Calendar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      if (!id) return;
      try {
        const tripData = await tripService.getTripById(id);
        if (tripData) {
          setTrip(tripData);
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Failed to load trip details for calendar:', err);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-deep-forest/60 mt-4">Generating your calendar timelines...</p>
      </div>
    );
  }

  if (!trip) return null;

  // Compile calendar days
  const getCalendarDays = () => {
    if (!trip.startDate || !trip.endDate) {
      return trip.stops.map((stop, idx) => ({
        label: `Destination #${idx + 1}`,
        dateStr: stop.arrival ? new Date(stop.arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Flexible',
        activities: stop.activities || []
      }));
    }

    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days: Array<{
      label: string;
      dateStr: string;
      dateKey: string;
      activities: TripActivity[];
    }> = [];

    const current = new Date(start);
    let dayNum = 1;

    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      const dateStr = current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
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

      // Sort activities chronologically by time
      dayActivities.sort((a, b) => {
        const timeA = a.scheduledAt ? new Date(a.scheduledAt).getTime() : 0;
        const timeB = b.scheduledAt ? new Date(b.scheduledAt).getTime() : 0;
        return timeA - timeB;
      });

      days.push({
        label: `Day ${dayNum}`,
        dateStr,
        dateKey,
        activities: dayActivities
      });

      current.setDate(current.getDate() + 1);
      dayNum++;
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="flex-grow w-full flex flex-col gap-6 py-2 text-left">
      {/* Sub Navigation / Header tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-label-sm text-[12px] text-terracotta uppercase tracking-wider font-semibold">Timeline Calendar</span>
          <h1 className="font-display-lg text-[32px] md:text-[36px] font-bold text-primary">{trip.name}</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Builder
          </Link>
          <Link to={`/trips/${trip.id}/itinerary`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Itinerary
          </Link>
          <Link to={`/trips/${trip.id}/budget`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Budget
          </Link>
          <Link to={`/trips/${trip.id}/calendar`} className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wide">
            Calendar
          </Link>
          <Link to={`/share/token-${trip.id}`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">share</span> Share
          </Link>
        </nav>
      </div>

      {/* Responsive Calendar Panels */}
      <section className="bg-white border border-outline-variant/30 p-6 md:p-8 rounded-xl shadow-sm">
        {/* Desktop View (Weekly Grid Layout) */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-7 gap-4">
            {calendarDays.map((day, idx) => (
              <div key={idx} className="flex flex-col gap-3 min-h-[300px]">
                {/* Day Header */}
                <div className="bg-surface-container-low border border-outline-variant/30 p-3 rounded-lg text-center space-y-0.5 shrink-0">
                  <span className="font-bold text-primary font-headline-sm text-[14px]">{day.label}</span>
                  <p className="text-[10px] text-on-surface-variant font-medium tracking-wide uppercase">
                    {day.dateStr.includes(',') ? day.dateStr.split(',')[1].trim() : day.dateStr}
                  </p>
                </div>

                {/* Day Activities Box */}
                <div className="flex-1 bg-surface-container-low/30 border border-dashed border-outline-variant/40 rounded-lg p-3 space-y-2.5">
                  {day.activities.length > 0 ? (
                    day.activities.map((tripAct) => (
                      <div
                        key={tripAct.id}
                        onClick={() => navigate(`/trips/${trip.id}/builder`)}
                        className="bg-white border border-outline-variant/30 hover:border-primary p-2.5 rounded-lg shadow-sm text-[11px] text-left cursor-pointer transition-all space-y-1"
                      >
                        <div className="font-semibold text-primary leading-tight line-clamp-2">
                          {tripAct.activity?.name}
                        </div>
                        
                        <div className="flex justify-between items-center text-[9.5px] text-on-surface-variant pt-1 border-t border-outline-variant/10">
                          <span className="text-secondary font-semibold uppercase">
                            {tripAct.activity?.category}
                          </span>
                          <span className="flex items-center gap-0.5 shrink-0">
                            <span className="material-symbols-outlined text-[10px]">schedule</span>
                            {tripAct.scheduledAt ? new Date(tripAct.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'TBD'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-[11px] text-on-surface-variant/40 italic block text-center pt-8">
                      Free day
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (Vertical Agenda Layout) */}
        <div className="block md:hidden space-y-6">
          <h3 className="font-headline-sm text-primary font-bold text-[20px] pb-2 border-b border-outline-variant/30 text-left">
            Agenda Timeline
          </h3>

          <div className="space-y-4">
            {calendarDays.map((day, idx) => (
              <div key={idx} className="flex gap-4 text-left">
                {/* Left Tag */}
                <div className="w-16 shrink-0 space-y-0.5">
                  <span className="font-bold text-primary font-headline-sm text-[15px] block">{day.label}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">{day.dateStr.split(',')[1] || day.dateStr}</span>
                </div>

                {/* Right Content */}
                <div className="flex-1 space-y-2.5">
                  {day.activities.length > 0 ? (
                    day.activities.map((tripAct) => (
                      <div
                        key={tripAct.id}
                        className="bg-surface-container-low border border-outline-variant/30 p-3 rounded-lg flex justify-between items-center text-[12px]"
                      >
                        <div>
                          <h4 className="font-semibold text-primary">{tripAct.activity?.name}</h4>
                          <div className="flex items-center gap-2 text-[10.5px] text-on-surface-variant mt-0.5">
                            <span className="capitalize">{tripAct.activity?.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">schedule</span>
                              {tripAct.scheduledAt ? new Date(tripAct.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'TBD'}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-primary">${tripAct.activity?.cost}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11.5px] text-on-surface-variant/40 italic py-1 border-b border-dashed border-outline-variant/30">
                      Resting or travel transit. No activities scheduled.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
