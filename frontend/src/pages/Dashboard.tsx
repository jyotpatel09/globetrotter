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
        <p className="font-label-md text-primary/60 mt-4 font-semibold">Loading your journey dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full flex flex-col gap-12 py-4">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-2">Welcome back, traveler</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Your journey to the curated destinations awaits. Here is an overview of your upcoming travels.
          </p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="bg-primary text-white font-label-md text-label-md px-8 py-3 rounded-xl hover:bg-surface-tint transition-all shadow-[0_4px_12px_rgba(26,58,50,0.12)] active:scale-95"
        >
          Plan a New Trip
        </button>
      </section>

      {/* Hero Section (Upcoming Trip) */}
      <section>
        {upcomingTrip ? (
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,58,50,0.08)] group border border-[#121212]/5">
            {/* Background Image of the first stop, or fallback */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage: `url('${
                  upcomingTrip.stops?.[0]?.city?.image ||
                  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80'
                }')`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="flex flex-col gap-4 text-white w-full md:w-2/3 text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span className="font-label-sm text-label-sm uppercase">
                    Upcoming • {upcomingTrip.startDate ? new Date(upcomingTrip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'} - {upcomingTrip.endDate ? new Date(upcomingTrip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                  </span>
                </div>
                
                <h2 className="font-display-lg text-[42px] md:text-[54px] leading-tight font-bold tracking-tight">
                  {upcomingTrip.name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-[14px] text-white/90">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {upcomingTrip.stops.length} Stops
                  </span>
                  <span className="text-white/45">•</span>
                  <span className="flex items-center gap-1.5 text-sm">
                    {upcomingTrip.startDate && upcomingTrip.endDate
                      ? `${Math.ceil(
                          (new Date(upcomingTrip.endDate).getTime() - new Date(upcomingTrip.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} Days`
                      : 'Flex Dates'}
                  </span>
                </div>
              </div>

              {/* Actions & Progress Box from Stitch */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px]">
                {(() => {
                  const hasStops = upcomingTrip.stops.length > 0;
                  const stopsWithActivities = upcomingTrip.stops.filter(s => s.activities && s.activities.length > 0).length;
                  const pct = hasStops ? Math.min(Math.max(Math.round((stopsWithActivities / upcomingTrip.stops.length) * 100), 20), 100) : 40;
                  return (
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-label-sm text-label-sm text-white">Planning Progress</span>
                        <span className="font-label-sm text-label-sm text-white">{pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-container rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}
                <Link
                  to={`/trips/${upcomingTrip.id}/builder`}
                  className="w-full bg-white text-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors text-center block font-semibold"
                >
                  Continue Planning
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State Dashboard */
          <div className="bg-white rounded-xl p-16 text-center border border-outline-variant/30 shadow-md flex flex-col items-center max-w-xl mx-auto space-y-6">
            <span className="material-symbols-outlined text-[64px] text-primary/30">explore_off</span>
            <h3 className="font-headline-md text-primary">No upcoming trips planned</h3>
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

      {/* Grid: Secondary Overview Panel (Stops, Budget, Activity) */}
      {upcomingTrip && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stops Summary card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-[0_12px_32px_rgba(26,58,50,0.04)] space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-label-md text-primary uppercase tracking-wider text-[12px]">Stops & Destinations</h4>
              <span className="material-symbols-outlined text-secondary">map</span>
            </div>
            <div className="space-y-3">
              {upcomingTrip.stops.slice(0, 3).map((stop, idx) => (
                <div key={stop.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-primary text-[14px]">{stop.city?.name}</p>
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
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-[0_12px_32px_rgba(26,58,50,0.04)] space-y-4">
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
                        <span className="text-[28px] font-bold text-primary">${spent}</span>
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
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-[0_12px_32px_rgba(26,58,50,0.04)] space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-label-md text-primary uppercase tracking-wider text-[12px]">Upcoming Activity</h4>
              <span className="material-symbols-outlined text-primary">event_available</span>
            </div>
            {(() => {
              const scheduledActs = upcomingTrip.stops
                .flatMap(s => s.activities || [])
                .filter(a => a.activity)
                .sort((a, b) => new Date(a.scheduledAt || '').getTime() - new Date(b.scheduledAt || '').getTime());

              if (scheduledActs.length > 0) {
                const nextAct = scheduledActs[0];
                return (
                  <div className="space-y-2 text-left">
                    <p className="font-semibold text-[15px] text-primary line-clamp-1">{nextAct.activity?.name}</p>
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

      {/* Journeys Past Section (Block 2) */}
      <section className="flex flex-col gap-8 text-left">
        <h3 className="font-headline-md text-headline-md text-primary border-b border-outline-variant/30 pb-4 font-semibold">Journeys Past</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Past Trip 1: Goa escape */}
          <div 
            onClick={() => navigate('/trips')}
            className="group cursor-pointer rounded-xl overflow-hidden border border-outline-variant/30 bg-surface hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all duration-300 flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Goa Coastal Escape</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span> Nov 2026
              </p>
            </div>
          </div>

          {/* Past Trip 2: Ahmedabad Cultural Weekend */}
          <div 
            onClick={() => navigate('/trips')}
            className="group cursor-pointer rounded-xl overflow-hidden border border-outline-variant/30 bg-surface hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all duration-300 flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Ahmedabad Cultural Weekend</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span> Sept 2026
              </p>
            </div>
          </div>

          {/* Log a Past Trip Card */}
          <div 
            onClick={() => navigate('/trips/new')}
            className="group cursor-pointer rounded-xl overflow-hidden border border-dashed border-outline-variant/50 bg-surface-container-low hover:bg-surface hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all duration-300 flex items-center justify-center min-h-[250px]"
          >
            <div className="p-6 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">add</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-primary">Plan a New Journey</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Curated For You (Inspiration Section) */}
      <section className="flex flex-col gap-8 pb-12 text-left">
        <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">Curated For You</h3>
          <button 
            onClick={() => navigate('/discover')}
            className="font-label-md text-label-md text-secondary hover:text-secondary-container transition-colors flex items-center gap-1 font-semibold"
          >
            View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inspiration Card 1 */}
          <div className="flex flex-col sm:flex-row gap-6 bg-surface rounded-xl overflow-hidden border border-outline-variant/30 p-4 hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all">
            <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden shrink-0 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
            </div>
            <div className="flex flex-col justify-between py-2 flex-grow text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline-sm text-headline-sm text-primary">Parisian Summer</h4>
                  <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/20 px-2.5 py-0.5 rounded font-bold">$$$$</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
                  Bask in the sun-drenched charm of quintessential Parisian cafes and cobblestone avenues.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                <div className="flex gap-2 text-secondary">
                  <span className="material-symbols-outlined text-sm">restaurant</span>
                  <span className="material-symbols-outlined text-sm">museum</span>
                </div>
                <button 
                  onClick={() => navigate('/discover')}
                  className="text-primary font-label-md text-label-md hover:text-surface-tint border border-primary px-4 py-1.5 rounded-lg transition-colors font-semibold"
                >
                  Explore City
                </button>
              </div>
            </div>
          </div>

          {/* Inspiration Card 2 */}
          <div className="flex flex-col sm:flex-row gap-6 bg-surface rounded-xl overflow-hidden border border-outline-variant/30 p-4 hover:shadow-[0_12px_32px_rgba(26,58,50,0.08)] transition-all">
            <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden shrink-0 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80')" }}
              ></div>
            </div>
            <div className="flex flex-col justify-between py-2 flex-grow text-left">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline-sm text-headline-sm text-primary">London Heritage</h4>
                  <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/20 px-2.5 py-0.5 rounded font-bold">$$$$</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
                  Discover a historic metropolis blending royal heritage with cutting-edge global trends.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                <div className="flex gap-2 text-secondary">
                  <span className="material-symbols-outlined text-sm">directions_bus</span>
                  <span className="material-symbols-outlined text-sm">theater_comedy</span>
                </div>
                <button 
                  onClick={() => navigate('/discover')}
                  className="text-primary font-label-md text-label-md hover:text-surface-tint border border-primary px-4 py-1.5 rounded-lg transition-colors font-semibold"
                >
                  Explore City
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
