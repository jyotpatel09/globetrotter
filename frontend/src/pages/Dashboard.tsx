import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { Trip } from '../services/api';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [upcomingTrip, setUpcomingTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const trips = await tripService.getTrips();
        if (trips.length > 0) {
          setUpcomingTrip(trips[0]);
        } else {
          setUpcomingTrip(null);
        }
      } catch (err) {
        console.error('Failed to load trips for dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-deep-forest/60 mt-4">Loading your journey dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full flex flex-col gap-12 py-4">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-display-lg text-48px md:text-[40px] text-deep-forest mb-2 leading-tight">Welcome back, traveler</h1>
          <p className="font-body-lg text-deep-forest/70 max-w-2xl text-[16px]">
            Your curated travel dashboard. Explore destinations, plan stops, budget details, and edit your journals.
          </p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="bg-primary text-white hover:bg-secondary border border-deep-forest/20 font-label-md text-label-md px-8 py-3 rounded-full transition-all whitespace-nowrap active:scale-95 shadow-md"
        >
          Plan a New Trip
        </button>
      </section>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-4 -mt-4">
        {upcomingTrip && (
          <>
            <button
              onClick={() => navigate(`/trips/${upcomingTrip.id}/calendar`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-deep-forest/10 rounded-full font-label-sm text-deep-forest hover:bg-white/80 hover:border-deep-forest/30 transition-colors shadow-sm text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              View Calendar
            </button>
            <button
              onClick={() => navigate(`/trips/${upcomingTrip.id}/builder`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-deep-forest/10 rounded-full font-label-sm text-deep-forest hover:bg-white/80 hover:border-deep-forest/30 transition-colors shadow-sm text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">construction</span>
              Itinerary Builder
            </button>
            <button
              onClick={() => navigate(`/trips/${upcomingTrip.id}/budget`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-deep-forest/10 rounded-full font-label-sm text-deep-forest hover:bg-white/80 hover:border-deep-forest/30 transition-colors shadow-sm text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Manage Budget
            </button>
          </>
        )}
        <button
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-deep-forest/10 rounded-full font-label-sm text-deep-forest hover:bg-white/80 hover:border-deep-forest/30 transition-colors shadow-sm text-[13px]"
        >
          <span className="material-symbols-outlined text-[18px]">explore</span>
          Explore Cities
        </button>
      </div>

      {/* Hero Section (Upcoming Trip) */}
      <section>
        {upcomingTrip ? (
          <div className="relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl group border border-deep-forest/15">
            {/* Background Image of the first stop, or fallback */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.02]"
              style={{
                backgroundImage: `url('${
                  upcomingTrip.stops?.[0]?.city?.image ||
                  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80'
                }')`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/40 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="flex flex-col gap-4 text-white w-full md:w-2/3 text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full w-fit">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span className="font-label-sm tracking-wider uppercase text-[11px]">
                    Upcoming • {upcomingTrip.startDate ? new Date(upcomingTrip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'} - {upcomingTrip.endDate ? new Date(upcomingTrip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                  </span>
                </div>
                
                <h2 className="font-display-lg text-[42px] md:text-[54px] leading-tight font-bold tracking-tight">
                  {upcomingTrip.name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-[14px] text-white/95">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-terracotta">route</span>
                    {upcomingTrip.stops.length > 0
                      ? upcomingTrip.stops.map(s => s.city?.name).join(' → ')
                      : 'No stops planned yet'}
                  </span>
                  <span className="text-white/45">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    {upcomingTrip.stops.length} Stops
                  </span>
                  <span className="text-white/45">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    {upcomingTrip.startDate && upcomingTrip.endDate
                      ? `${Math.ceil(
                          (new Date(upcomingTrip.endDate).getTime() - new Date(upcomingTrip.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} Days`
                      : 'Flex Dates'}
                  </span>
                </div>
              </div>

              {/* Actions Box */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link
                  to={`/trips/${upcomingTrip.id}/builder`}
                  className="bg-terracotta text-white font-label-md text-[14px] px-6 py-3 rounded-full text-center hover:bg-white hover:text-primary transition-all shadow-md active:scale-95"
                >
                  Edit Itinerary
                </Link>
                <Link
                  to={`/trips/${upcomingTrip.id}/itinerary`}
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-label-md text-[14px] px-6 py-3 rounded-full text-center hover:bg-white/20 transition-all active:scale-95"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State Dashboard */
          <div className="bg-white rounded-3xl p-16 text-center border border-deep-forest/5 shadow-md flex flex-col items-center max-w-xl mx-auto space-y-6">
            <span className="material-symbols-outlined text-[64px] text-deep-forest/30">explore_off</span>
            <h3 className="font-headline-md text-deep-forest">No upcoming trips planned</h3>
            <p className="font-body-md text-on-surface-variant max-w-sm">
              Your travel journal is currently empty. Design your next journey, add stops, and customize your itinerary.
            </p>
            <button
              onClick={() => navigate('/trips/new')}
              className="bg-primary text-on-primary hover:bg-secondary px-8 py-3 rounded-full font-label-md transition-colors active:scale-95"
            >
              Curate Your First Trip
            </button>
          </div>
        )}
      </section>

      {/* Grid: Secondary Overview Panel */}
      {upcomingTrip && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stops Summary card */}
          <div className="bg-white p-6 rounded-2xl border border-deep-forest/5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-label-md text-primary uppercase tracking-wider text-[12px]">Stops & Destinations</h4>
              <span className="material-symbols-outlined text-terracotta">map</span>
            </div>
            <div className="space-y-3">
              {upcomingTrip.stops.slice(0, 3).map((stop, idx) => (
                <div key={stop.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-deep-forest text-[14px]">{stop.city?.name}</p>
                    <p className="text-[12px] text-on-surface-variant">
                      {stop.arrival ? new Date(stop.arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingTrip.stops.length > 3 && (
                <p className="text-[12px] text-on-surface-variant italic pl-8">
                  + {upcomingTrip.stops.length - 3} more destinations
                </p>
              )}
              {upcomingTrip.stops.length === 0 && (
                <p className="text-[13px] text-on-surface-variant italic">No stops added yet. Go to Discover to add stops.</p>
              )}
            </div>
          </div>

          {/* Budget Overview card */}
          <div className="bg-white p-6 rounded-2xl border border-deep-forest/5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-label-md text-primary uppercase tracking-wider text-[12px]">Budget Status</h4>
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            {upcomingTrip.budget ? (
              <div className="space-y-4 text-left">
                {(() => {
                  const limit = upcomingTrip.budget.totalLimit;
                  const spent = upcomingTrip.budget.expenses.reduce((sum, e) => sum + e.amount, 0);
                  const pct = Math.min(Math.round((spent / limit) * 100), 100);
                  return (
                    <>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[28px] font-bold text-deep-forest">${spent}</span>
                        <span className="text-[14px] text-on-surface-variant">spent of ${limit} limit</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            spent > limit ? 'bg-error' : 'bg-primary'
                          }`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className={`${spent > limit ? 'text-error font-semibold' : 'text-on-surface-variant'}`}>
                          {spent > limit ? 'Over Budget!' : `${100 - pct}% remaining`}
                        </span>
                        <Link to={`/trips/${upcomingTrip.id}/budget`} className="text-secondary hover:underline font-semibold">
                          View details
                        </Link>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-[13px] text-on-surface-variant italic">No budget logged.</p>
            )}
          </div>

          {/* Next Activity Card */}
          <div className="bg-white p-6 rounded-2xl border border-deep-forest/5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-label-md text-primary uppercase tracking-wider text-[12px]">Upcoming Activity</h4>
              <span className="material-symbols-outlined text-primary">event_available</span>
            </div>
            {(() => {
              // Find the first activity scheduled
              const scheduledActs = upcomingTrip.stops
                .flatMap(s => s.activities || [])
                .filter(a => a.activity)
                .sort((a, b) => new Date(a.scheduledAt || '').getTime() - new Date(b.scheduledAt || '').getTime());

              if (scheduledActs.length > 0) {
                const nextAct = scheduledActs[0];
                return (
                  <div className="space-y-2 text-left">
                    <p className="font-semibold text-[15px] text-deep-forest line-clamp-1">{nextAct.activity?.name}</p>
                    <p className="text-[13px] text-on-surface-variant line-clamp-2">
                      {nextAct.activity?.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-secondary font-label-sm text-[12px] pt-1">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      <span>
                        {nextAct.scheduledAt
                          ? new Date(nextAct.scheduledAt).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })
                          : 'TBD'}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div className="text-left space-y-3">
                  <p className="text-[13px] text-on-surface-variant italic">No activities scheduled yet.</p>
                  <button
                    onClick={() => navigate('/discover')}
                    className="text-secondary font-label-sm text-[12px] hover:underline font-semibold block"
                  >
                    Browse activities for stops →
                  </button>
                </div>
              );
            })()}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
