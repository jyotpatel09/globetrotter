import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { City, Activity, Trip, Stop } from '../../services/api';
import Modal from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';

export const ActivityDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateCityId = location.state?.cityId as string | undefined;

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>('all');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal Scheduling state
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [targetTripId, setTargetTripId] = useState('');
  const [availableStops, setAvailableStops] = useState<Stop[]>([]);
  const [targetStopId, setTargetStopId] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initial load
  useEffect(() => {
    const listCities = tripService.getCities();
    setCities(listCities);
    setActivities(tripService.getActivities());
    
    if (stateCityId) {
      setSelectedCityId(stateCityId);
    }
  }, [stateCityId]);

  // Load trips when modal opens
  useEffect(() => {
    const loadTrips = async () => {
      if (modalOpen) {
        try {
          const userTrips = await tripService.getTrips();
          setTrips(userTrips);
          if (userTrips.length > 0) {
            setTargetTripId(userTrips[0].id);
          }
        } catch (err) {
          console.error('Failed to load trips for scheduling:', err);
        }
      }
    };
    loadTrips();
  }, [modalOpen]);

  // Update available stops when selected trip or activity changes
  useEffect(() => {
    const loadTripData = async () => {
      if (targetTripId && selectedActivity) {
        try {
          const trip = await tripService.getTripById(targetTripId);
          if (trip) {
            // Filter stops that belong to the activity's city
            const matchingStops = trip.stops.filter(s => s.cityId === selectedActivity.cityId);
            setAvailableStops(matchingStops);
            if (matchingStops.length > 0) {
              setTargetStopId(matchingStops[0].id);
            } else {
              setTargetStopId('');
            }
          }
        } catch (err) {
          console.error('Failed to load trip stops:', err);
        }
      }
    };
    loadTripData();
  }, [targetTripId, selectedActivity]);

  const handleOpenScheduleModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
    setSuccessMessage('');
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity || !targetTripId || !targetStopId) return;

    try {
      // Format scheduled timestamp (date + time)
      const stop = availableStops.find(s => s.id === targetStopId);
      let schedDate = stop?.arrival || new Date().toISOString().split('T')[0];
      const timestamp = scheduledTime ? `${schedDate}T${scheduledTime}:00` : schedDate;

      await tripService.addActivityToStop(targetTripId, targetStopId, selectedActivity.id, timestamp);
      
      setSuccessMessage(`Successfully scheduled ${selectedActivity.name}!`);
      setScheduledTime('');

      setTimeout(() => {
        setModalOpen(false);
        setSelectedActivity(null);
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      console.error('Failed to schedule activity:', err);
      alert(err instanceof Error ? err.message : 'Failed to schedule activity. Please verify connection and try again.');
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesCity = selectedCityId === 'all' || activity.cityId === selectedCityId;
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter;
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (activity.description && activity.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesCategory && matchesSearch;
  });

  const categories = ['all', 'Active', 'Culture', 'Food', 'Relax'];

  return (
    <div className="flex-grow w-full flex flex-col gap-8 py-4 text-left">
      {/* Header, Search, Dropdowns */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/20 pb-6">
        <div className="space-y-1">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-2 font-bold leading-tight">Curated Activities</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl text-[14.5px]">
            Browse local experiences, sights, and culinary spots. Schedule them into your stops.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* City Selector */}
          <select
            className="bg-white border border-outline-variant/60 px-4 py-2 rounded-full font-label-sm text-[13px] text-primary focus:outline-none w-full md:w-48 cursor-pointer text-on-surface"
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            <option value="all">All Cities</option>
            {cities.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Search bar */}
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-9 pr-4 py-2 border border-outline-variant/50 rounded-full bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-sm font-label-sm text-on-surface"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Tabs / Sub navigation */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Navigation tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/discover')}
            className="px-5 py-2 bg-white hover:bg-surface-container border border-outline-variant/30 rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wider transition-colors font-semibold"
          >
            Cities
          </button>
          <button
            onClick={() => navigate('/discover/activities')}
            className="px-5 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wider font-semibold"
          >
            Activities
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-label-sm text-[11px] uppercase tracking-wide border transition-all ${
                categoryFilter === cat
                  ? 'bg-primary text-on-primary border-primary font-bold'
                  : 'bg-white text-on-surface border-outline-variant/30 hover:border-primary'
              }`}
            >
              {cat === 'all' ? 'All categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredActivities.map((act) => {
          const city = cities.find(c => c.id === act.cityId);
          return (
            <div
              key={act.id}
              className="group bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-outline-variant/30 flex flex-col justify-between text-left"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={act.name}
                  src={act.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-label-sm text-[10px] text-primary font-bold uppercase tracking-wider">
                  {city?.name || 'Local'}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-[11px] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px]">
                      {act.category === 'Active' ? 'hiking' : act.category === 'Food' ? 'restaurant' : act.category === 'Culture' ? 'museum' : 'spa'}
                    </span>
                    <span>{act.category}</span>
                  </div>
                  <h4 className="font-headline-sm text-[20px] font-bold text-primary">{act.name}</h4>
                  <p className="font-body-md text-on-surface-variant text-[13.5px] leading-relaxed line-clamp-3">
                    {act.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-outline-variant/30">
                  <div className="flex justify-between text-label-md text-[13px] text-primary">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary/60">schedule</span>{act.duration || 'Flexible'}</span>
                    <span className="font-bold">${act.cost === 0 ? 'Free' : `${act.cost} / person`}</span>
                  </div>
                  <button
                    onClick={() => handleOpenScheduleModal(act)}
                    className="w-full bg-primary hover:bg-surface-tint text-on-primary font-label-md text-[13px] py-2.5 rounded-xl transition-colors font-semibold shadow-sm active:scale-95 text-center"
                  >
                    Add to Itinerary
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-outline-variant/30 shadow-sm space-y-3 max-w-lg mx-auto w-full">
            <span className="material-symbols-outlined text-[48px] text-primary/30">local_activity</span>
            <h4 className="font-headline-sm text-primary font-semibold">No activities found</h4>
            <p className="font-body-md text-on-surface-variant text-[14px]">
              We couldn't find any activities matching your filters. Select another city or search tag.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setSelectedCityId('all');
              }}
              className="text-secondary font-semibold font-label-sm text-[12px] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal: Schedule Activity */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedActivity ? `Schedule: ${selectedActivity.name}` : 'Schedule Activity'}
      >
        {successMessage ? (
          <div className="py-8 text-center space-y-4">
            <span className="material-symbols-outlined text-[64px] text-primary animate-bounce">check_circle</span>
            <p className="font-headline-sm text-primary font-semibold">{successMessage}</p>
          </div>
        ) : trips.length > 0 ? (
          <form onSubmit={handleScheduleSubmit} className="space-y-6 text-left">
            {/* Step 1: Select Journey */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Select Journey
              </label>
              <select
                className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary text-on-surface cursor-pointer"
                value={targetTripId}
                onChange={(e) => setTargetTripId(e.target.value)}
                required
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Select Stop (matching city) */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Select Stop in Destination
              </label>
              {availableStops.length > 0 ? (
                <select
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary text-on-surface cursor-pointer"
                  value={targetStopId}
                  onChange={(e) => setTargetStopId(e.target.value)}
                  required
                >
                  {availableStops.map((stop, idx) => (
                    <option key={stop.id} value={stop.id}>
                      Stop #{idx + 1}: {stop.city?.name} ({stop.arrival ? `${stop.arrival} to ${stop.departure}` : 'Flex dates'})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-[13px] text-error font-semibold flex items-center gap-1.5 bg-error-container/20 border border-error/10 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>
                    No stops in {cities.find(c => c.id === selectedActivity?.cityId)?.name} found for this trip.
                  </span>
                </div>
              )}
            </div>

            {/* Step 3: Select Time */}
            {availableStops.length > 0 && (
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                  Scheduled Time (Optional)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 bottom-3 text-on-surface-variant text-[18px]">schedule</span>
                  <input
                    type="time"
                    className="input-underline w-full pl-8 font-body-md text-body-md text-on-surface"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Submit controls */}
            {availableStops.length > 0 ? (
              <Button type="submit" variant="primary" fullWidth className="py-3 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
                Confirm Add Activity
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-[12px] text-on-surface-variant italic">
                  To schedule this, you must first add {cities.find(c => c.id === selectedActivity?.cityId)?.name} as a stop on your trip.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setModalOpen(false);
                    // Add stop modal shortcut or redirect to discover page
                    navigate('/discover');
                  }}
                  className="py-2.5 border border-primary hover:bg-primary hover:text-on-primary rounded-xl font-semibold"
                >
                  Go to Cities to Add Stop
                </Button>
              </div>
            )}
          </form>
        ) : (
          /* Empty Trips state in modal */
          <div className="text-center py-6 space-y-4">
            <p className="font-body-md text-on-surface-variant text-center">
              You don't have any planned trips yet. Let's create one first!
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setModalOpen(false);
                navigate('/trips/new');
              }}
              className="px-6 py-2.5 bg-primary hover:bg-surface-tint rounded-xl font-semibold"
            >
              Plan a Trip
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivityDiscovery;
