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
        console.error('Failed to load trip details for itinerary view:', err);
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

  const [activeTab, setActiveTab] = useState<'itinerary' | 'stays' | 'tips'>('itinerary');
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({});

  const toggleDay = (dayLabel: string) => {
    setCollapsedDays(prev => ({ ...prev, [dayLabel]: !prev[dayLabel] }));
  };

  const timelineDays = generateTimelineDays();
  const coverImage = trip.stops?.[0]?.city?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="flex-grow w-full flex flex-col gap-6 py-2 text-left animate-fade-in">
      {/* Sub Navigation / Header tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-label-sm text-[12px] text-terracotta uppercase tracking-wider font-semibold">Travel Journal</span>
          <h1 className="font-display-lg text-[32px] md:text-[36px] font-bold text-primary">{trip.name}</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Builder
          </Link>
          <Link to={`/trips/${trip.id}/itinerary`} className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wide">
            Itinerary
          </Link>
          <Link to={`/trips/${trip.id}/budget`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Budget
          </Link>
          <Link to={`/trips/${trip.id}/calendar`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Calendar
          </Link>
          <Link to={`/share/token-${trip.id}`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">share</span> Share
          </Link>
        </nav>
      </div>

      {/* Cover Image banner */}
      <div className="relative w-full h-[260px] md:h-[340px] rounded-xl overflow-hidden shadow-md border border-outline-variant/30">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${coverImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:left-10 text-white">
          <p className="font-label-sm text-[11px] tracking-wider uppercase text-white/80">Active Journey Timeline</p>
          <h2 className="font-display-lg text-[32px] md:text-[44px] font-bold leading-tight">{trip.name}</h2>
          {trip.description && <p className="text-[14px] text-white/80 mt-1">{trip.description}</p>}
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-6 border-b border-outline-variant/30 mt-4">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`pb-3 font-semibold text-[13px] uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'itinerary'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          Itinerary Timeline
        </button>
        <button
          onClick={() => setActiveTab('stays')}
          className={`pb-3 font-semibold text-[13px] uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'stays'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          Stays & Food
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`pb-3 font-semibold text-[13px] uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'tips'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          Highlights & Tips
        </button>
      </div>

      {/* Overview Block */}
      {trip.fullDescription && activeTab !== 'tips' && (
        <div className="bg-white border border-outline-variant/20 rounded-xl p-5 shadow-[0_4px_12px_rgba(26,58,50,0.02)]">
          <h3 className="font-label-sm text-[12px] uppercase text-terracotta tracking-wider font-semibold mb-1">Trip Overview</h3>
          <p className="font-body-md text-on-surface-variant text-[14px] leading-relaxed">{trip.fullDescription}</p>
        </div>
      )}

      {/* Content Panels */}
      {activeTab === 'itinerary' && (
        <div className="max-w-4xl mx-auto w-full py-4">
          <div className="relative border-l-2 border-primary/20 ml-6 md:ml-36 pl-6 md:pl-8 space-y-12">
            {timelineDays.map((day, idx) => {
              const isCollapsed = collapsedDays[day.label];
              return (
                <div key={idx} className="relative group">
                  {/* Left Timeline Tag - Desktop only */}
                  <div 
                    onClick={() => toggleDay(day.label)}
                    className="absolute hidden md:block -left-[160px] top-1.5 w-28 text-right cursor-pointer select-none"
                  >
                    <span className="font-headline-sm text-[18px] font-bold text-primary hover:text-secondary transition-colors flex items-center justify-end gap-1">
                      {day.label}
                      <span className="material-symbols-outlined text-sm">
                        {isCollapsed ? 'expand_more' : 'expand_less'}
                      </span>
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase mt-1 block">
                      {day.dateStr}
                    </span>
                  </div>

                  {/* Mobile Timeline Tag - Mobile only */}
                  <div 
                    onClick={() => toggleDay(day.label)}
                    className="md:hidden mb-2 cursor-pointer flex items-center justify-between bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20 select-none"
                  >
                    <span className="font-headline-sm text-[16px] font-bold text-primary flex items-center gap-1">
                      {day.label} <span className="text-[11px] font-normal text-on-surface-variant">({day.dateStr})</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary/70">
                      {isCollapsed ? 'expand_more' : 'expand_less'}
                    </span>
                  </div>

                  {/* Bullet circle along the vertical line */}
                  <span className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-white group-hover:bg-secondary transition-colors" />

                  {/* Content box */}
                  {!isCollapsed && (
                    <div className="space-y-4 text-left animate-slide-down">
                      {/* Current city header */}
                      {day.stop ? (
                        <div className="flex items-center gap-2 text-secondary font-label-sm text-[11px] uppercase tracking-wider font-semibold">
                          <span className="material-symbols-outlined text-[15px]">location_on</span>
                          <span>Curating stop in {day.stop.city?.name}</span>
                          {day.stop.recommendedArrival && (
                            <span className="text-on-surface-variant normal-case font-normal ml-2">
                              • Arrive around {day.stop.recommendedArrival}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-on-surface-variant italic">Transit or resting day</div>
                      )}

                      {/* Day's Activities */}
                      {day.activities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {day.activities.map((tripAct) => (
                            <div
                              key={tripAct.id}
                              className="bg-white border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                            >
                              <div className="h-32 relative overflow-hidden">
                                <img
                                  src={tripAct.activity?.image}
                                  alt={tripAct.activity?.name}
                                  className="w-full h-full object-cover"
                                />
                                {tripAct.activity?.location && (
                                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5">
                                    <span className="material-symbols-outlined text-[11px]">map</span>
                                    {tripAct.activity.location}
                                  </div>
                                )}
                              </div>
                              <div className="p-5 space-y-2.5 flex-grow flex flex-col justify-between">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-baseline gap-2">
                                    <h4 className="font-semibold text-primary text-[14px] line-clamp-1">
                                      {tripAct.activity?.name}
                                    </h4>
                                    <span className="text-[12px] font-bold text-primary font-body-md shrink-0">
                                      {tripAct.activity?.cost === 0 ? 'Free' : `$${tripAct.activity?.cost}`}
                                    </span>
                                  </div>
                                  
                                  <p className="text-[12px] text-on-surface-variant line-clamp-2 leading-relaxed">
                                    {tripAct.activity?.description}
                                  </p>
                                </div>

                                <div className="flex justify-between items-center text-[10.5px] border-t border-outline-variant/20 pt-2 mt-2">
                                  <span className="text-secondary uppercase tracking-wider font-semibold font-label-sm">
                                    {tripAct.activity?.category}
                                  </span>
                                  <span className="text-primary/70 flex items-center gap-0.5">
                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                    {tripAct.activity?.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white/40 border border-dashed border-outline-variant/60 rounded-xl p-6 text-center text-on-surface-variant text-[13px]">
                          No activities scheduled for this day.{' '}
                          <Link to={`/trips/${trip.id}/builder`} className="text-secondary font-semibold hover:underline">
                            Go to Builder to add experiences.
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {timelineDays.length === 0 && (
              <div className="text-center py-10 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-8">
                <span className="material-symbols-outlined text-[48px] text-primary/30">calendar_today</span>
                <p className="font-body-md text-on-surface-variant mt-3 text-[14px]">
                  No dates configured. Edit your trip properties to set dates, or configure stops.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'stays' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-2">
          {/* Stays Section */}
          <div className="space-y-6">
            <h3 className="font-headline-sm text-[20px] font-bold text-primary flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined">hotel</span> Accommodation Options
            </h3>
            
            {(trip.accommodationOptions || [
              {
                name: 'Recommended Boutique Hotel Stay',
                area: 'Downtown Center',
                priceRange: '$$',
                rating: 4.6,
                type: 'Boutique Hotel',
                amenities: ['Wi-Fi included', 'Breakfast buffet', 'Central transit access'],
                reason: 'Centrally located within easy walking distance of major sightseeing venues.'
              }
            ]).map((stay, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-primary text-[16px]">{stay.name}</h4>
                    <p className="text-[12px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {stay.area}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-secondary font-bold text-[13px]">{stay.priceRange}</span>
                    <span className="text-[11px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded mt-1 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px] text-yellow-600 filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {stay.rating}
                    </span>
                  </div>
                </div>

                <div className="text-[13px] text-on-surface-variant leading-relaxed">
                  <p className="font-semibold text-primary mb-1">Why Stay Here:</p>
                  <p className="italic">"{stay.reason}"</p>
                </div>

                <div className="border-t border-outline-variant/20 pt-3 flex flex-wrap gap-2">
                  {stay.amenities.map((item, idx) => (
                    <span key={idx} className="bg-primary/5 text-primary text-[10.5px] px-2.5 py-1 rounded font-semibold">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Local Food Section */}
          <div className="space-y-6">
            <h3 className="font-headline-sm text-[20px] font-bold text-primary flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined">restaurant</span> Local Food & Dining Plan
            </h3>

            {(() => {
              const fp = trip.foodPlan || {
                breakfast: 'Local café or hotel breakfast spreads.',
                lunch: 'Regional street food selections.',
                dinner: 'Authentic local specialty dine-in restaurants.',
                mustTry: 'Traditional destination-specific dessert or snack.'
              };
              return (
                <div className="bg-white border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-primary text-white p-4">
                    <h4 className="font-bold text-[14px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">restaurant_menu</span> Culinary Blueprint
                    </h4>
                  </div>
                  <div className="p-5 divide-y divide-outline-variant/20 space-y-4">
                    <div className="pt-0 space-y-1">
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-wider">Morning/Breakfast</p>
                      <p className="text-[13.5px] text-on-surface leading-relaxed">{fp.breakfast}</p>
                    </div>
                    <div className="pt-4 space-y-1">
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-wider">Midday/Lunch</p>
                      <p className="text-[13.5px] text-on-surface leading-relaxed">{fp.lunch}</p>
                    </div>
                    <div className="pt-4 space-y-1">
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-wider">Evening/Dinner</p>
                      <p className="text-[13.5px] text-on-surface leading-relaxed">{fp.dinner}</p>
                    </div>
                    <div className="pt-4 space-y-2 bg-secondary/5 -mx-5 px-5 pb-4">
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">stars</span> Signature Culinary Experience (Must Try)
                      </p>
                      <p className="text-[14px] font-semibold text-primary italic">"{fp.mustTry}"</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
          {/* Highlights */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-headline-sm text-[20px] font-bold text-primary flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined">hotel_class</span> Trip Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(trip.highlights || [
                'Explore regional architecture and historical sites.',
                'Savor traditional dishes during local food walks.',
                'Experience active tours and scenery viewpoints.'
              ]).map((highlight, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Travel Tips Checklist */}
            <div className="space-y-4 pt-6">
              <h3 className="font-headline-sm text-[20px] font-bold text-primary flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                <span className="material-symbols-outlined">tips_and_updates</span> Practical Travel Tips
              </h3>
              <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm divide-y divide-outline-variant/20 space-y-3.5">
                {(trip.tips || [
                  'Keep local cash handy for transport and street shacks.',
                  'Stay hydrated and carry protective sunscreen.',
                  'Respect quiet norms on all public transport conveyances.'
                ]).map((tip, idx) => (
                  <div key={idx} className={`flex items-start gap-3 text-[13.5px] leading-relaxed text-on-surface-variant ${idx > 0 ? 'pt-3.5' : ''}`}>
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">info</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats & Transit */}
          <div className="space-y-6">
            <h3 className="font-headline-sm text-[20px] font-bold text-primary flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined">info</span> Quick Guides
            </h3>

            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Transit Details</p>
                <div className="flex items-center gap-2 text-primary font-semibold text-[13px]">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  <span>{trip.transportationInfo || 'Public train/cabs & local transit networks'}</span>
                </div>
              </div>

              <div className="space-y-1 border-t border-outline-variant/20 pt-3">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Difficulty & Pace</p>
                <div className="flex items-center gap-2 text-primary font-semibold text-[13px]">
                  <span className="material-symbols-outlined text-sm">directions_walk</span>
                  <span>{trip.difficulty || 'Easy'} Pace (Walking-focused)</span>
                </div>
              </div>

              <div className="space-y-1 border-t border-outline-variant/20 pt-3">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Best Season</p>
                <div className="flex items-center gap-2 text-primary font-semibold text-[13px]">
                  <span className="material-symbols-outlined text-sm">wb_sunny</span>
                  <span>{trip.bestSeason || 'Year-round'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryView;
