import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip, Activity } from '../../services/api';
import Modal from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';

export const ItineraryBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedStopId, setSelectedStopId] = useState<string>('');
  const [browseActivities, setBrowseActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const [newCityId, setNewCityId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [scheduledTime, setScheduledTime] = useState('');

  const loadTripData = async () => {
    if (!id) return;
    try {
      const tripData = await tripService.getTripById(id);
      if (tripData) {
        setTrip(tripData);
        // Select the first stop by default if not set
        if (tripData.stops.length > 0 && !selectedStopId) {
          setSelectedStopId(tripData.stops[0].id);
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Failed to load trip builder details:', err);
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    loadTripData();
  }, [id, selectedStopId]);

  // Load activities for the selected stop's city
  useEffect(() => {
    if (trip && selectedStopId) {
      const stop = trip.stops.find(s => s.id === selectedStopId);
      if (stop) {
        const list = tripService.getActivities(stop.cityId);
        setBrowseActivities(list);
      }
    } else {
      setBrowseActivities([]);
    }
  }, [trip, selectedStopId]);

  const handleAddStopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newCityId) return;

    try {
      const stop = await tripService.addStop(id, newCityId, arrivalDate, departureDate);
      if (stop) {
        setSelectedStopId(stop.id);
      }
      
      // Clear inputs
      setNewCityId('');
      setArrivalDate('');
      setDepartureDate('');
      setStopModalOpen(false);
      await loadTripData();
    } catch (err) {
      console.error('Failed to add stop:', err);
      alert(err instanceof Error ? err.message : 'Failed to add stop. Please verify connection and try again.');
    }
  };

  const handleDeleteStop = async (e: React.MouseEvent, stopId: string) => {
    e.stopPropagation();
    if (!id) return;
    if (window.confirm('Delete this stop? All scheduled activities for this stop will be lost.')) {
      try {
        await tripService.deleteStop(id, stopId);
        if (selectedStopId === stopId) {
          setSelectedStopId('');
        }
        await loadTripData();
      } catch (err) {
        console.error('Failed to delete stop:', err);
        alert('Failed to delete stop.');
      }
    }
  };

  const handleOpenScheduleActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivityModalOpen(true);
  };

  const handleScheduleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !selectedStopId || !selectedActivity) return;

    try {
      const stop = trip?.stops.find(s => s.id === selectedStopId);
      let schedDate = stop?.arrival || new Date().toISOString().split('T')[0];
      const timestamp = scheduledTime ? `${schedDate}T${scheduledTime}:00` : schedDate;

      await tripService.addActivityToStop(id, selectedStopId, selectedActivity.id, timestamp);
      
      setScheduledTime('');
      setActivityModalOpen(false);
      setSelectedActivity(null);
      await loadTripData();
    } catch (err) {
      console.error('Failed to schedule activity:', err);
      alert(err instanceof Error ? err.message : 'Failed to schedule activity.');
    }
  };

  const handleDeleteActivity = async (stopId: string, tripActId: string) => {
    if (!id) return;
    if (window.confirm('Remove this activity from your scheduled itinerary?')) {
      try {
        await tripService.deleteActivityFromStop(id, stopId, tripActId);
        await loadTripData();
      } catch (err) {
        console.error('Failed to delete activity:', err);
        alert('Failed to remove activity.');
      }
    }
  };

  if (!trip) return null;

  const currentStop = trip.stops.find(s => s.id === selectedStopId);
  const cities = tripService.getCities();
  
  const filteredActivities = browseActivities.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-grow w-full flex flex-col gap-6 py-2 text-left">
      {/* Sub Navigation / Header tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-label-sm text-[12px] text-terracotta uppercase tracking-wider">Itinerary Experience</span>
          <h1 className="font-display-lg text-[32px] md:text-[36px] font-bold text-primary">{trip.name}</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wide">
            Builder
          </Link>
          <Link to={`/trips/${trip.id}/itinerary`} className="px-4 py-2 bg-white border border-deep-forest/10 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
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

      {/* Main Split Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow min-h-[60vh]">
        {/* Left Pane (7 Columns) - Stop Checklist & Timeline */}
        <div className="lg:col-span-6 xl:col-span-7 bg-white/40 border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-sm text-[22px] font-bold text-primary">Staging Timeline</h2>
              <button
                onClick={() => setStopModalOpen(true)}
                className="bg-transparent text-primary hover:text-secondary border border-outline-variant/30 hover:border-secondary font-label-sm text-[12px] px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Add Stop
              </button>
            </div>

            {/* List of Stops */}
            <div className="space-y-6 relative border-l-2 border-primary/20 ml-3 pl-6">
              {trip.stops.map((stop, index) => {
                const isSelected = stop.id === selectedStopId;
                const actCount = stop.activities?.length || 0;
                
                return (
                  <div
                    key={stop.id}
                    onClick={() => setSelectedStopId(stop.id)}
                    className={`relative cursor-pointer group p-5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-primary shadow-sm'
                        : 'bg-white/50 border-outline-variant/30 hover:bg-white/80'
                    }`}
                  >
                    {/* Circle Bullet along the timeline */}
                    <span className={`absolute -left-[33px] top-7 w-4 h-4 rounded-full border-2 transition-colors ${
                      isSelected ? 'bg-secondary border-primary' : 'bg-white border-primary/30 group-hover:border-primary'
                    }`} />

                    <div className="flex justify-between items-start">
                      <div className="text-left space-y-1">
                        <span className="font-label-sm text-[10px] text-secondary tracking-wider uppercase font-semibold">
                          Stop #{index + 1}
                        </span>
                        <h4 className="font-headline-sm text-[20px] font-bold text-primary">{stop.city?.name}</h4>
                        <p className="font-body-md text-[13px] text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                          {stop.arrival ? `${new Date(stop.arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} to ${stop.departure ? new Date(stop.departure).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}` : 'Flexible Staging'}
                        </p>
                      </div>

                      {/* Right metadata and delete */}
                      <div className="flex items-center gap-3">
                        <span className="bg-surface-container-high px-3 py-1 rounded-full font-label-sm text-[11px] text-primary">
                          {actCount} activities
                        </span>
                        <button
                          onClick={(e) => handleDeleteStop(e, stop.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-black/5 flex items-center justify-center"
                          title="Remove Stop"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Scheduled Activities underneath */}
                    {stop.activities && stop.activities.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-3">
                        {stop.activities.map((tripAct) => (
                          <div
                            key={tripAct.id}
                            className="bg-surface-container-low border border-outline-variant/30 p-3.5 rounded-lg flex justify-between items-center text-[13px]"
                          >
                            <div className="text-left space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary font-body-md text-[14px]">
                                  {tripAct.activity?.name}
                                </span>
                                {tripAct.activity?.cost && tripAct.activity.cost > 0 ? (
                                  <span className="text-[12px] text-on-surface-variant font-bold">
                                    (${tripAct.activity.cost})
                                  </span>
                                ) : null}
                              </div>
                              {tripAct.scheduledAt && (
                                <p className="text-[11px] text-secondary font-label-sm flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                                  {new Date(tripAct.scheduledAt).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })}
                                </p>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleDeleteActivity(stop.id, tripAct.id)}
                              className="text-on-surface-variant hover:text-error transition-colors p-1"
                              title="Delete Activity"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {trip.stops.length === 0 && (
                <div className="py-8 text-center text-on-surface-variant italic">
                  No destinations added to your timeline. Let's add a stop city to begin!
                </div>
              )}
            </div>
          </div>
          
          {/* Summary status */}
          <div className="bg-primary text-white p-6 rounded-xl mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <div>
              <p className="font-label-sm text-[11px] uppercase tracking-wider text-white/70">Itinerary Overview</p>
              <h4 className="font-headline-sm text-[20px] font-bold mt-1">
                {trip.stops.length} Cities, {trip.stops.flatMap(s => s.activities || []).length} Activities
              </h4>
            </div>
            <Link
              to={`/trips/${trip.id}/itinerary`}
              className="bg-white text-primary hover:bg-secondary hover:text-white transition-colors px-6 py-2.5 rounded-full font-label-md text-[13px] font-bold"
            >
              Generate Travel Journal
            </Link>
          </div>
        </div>

        {/* Right Pane (5 Columns) - Browse Activities in Selected Stop */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-6 flex flex-col justify-start h-fit max-h-[85vh] overflow-y-auto">
          {currentStop ? (
            <>
              <header className="space-y-2 text-left">
                <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wider font-semibold">
                  Browse Experiences
                </span>
                <h3 className="font-headline-sm text-[22px] font-bold text-primary">
                  In {currentStop.city?.name}
                </h3>
                <p className="text-[13px] text-on-surface-variant">
                  Select experiences to build into Stop #{trip.stops.indexOf(currentStop) + 1}.
                </p>
              </header>

              {/* Search activities */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="Search local tours, spots..."
                  className="w-full pl-9 pr-4 py-2 border border-outline-variant/50 rounded-full bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-sm font-label-sm text-on-surface"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Activities list */}
              <div className="space-y-4">
                {filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex gap-4 text-left p-3.5 group hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <img
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                      src={act.image}
                      alt={act.name}
                    />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="font-semibold text-primary text-[14px] line-clamp-1 group-hover:text-secondary transition-colors">
                          {act.name}
                        </h4>
                        <p className="text-[11.5px] text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 mt-auto">
                        <span className="font-label-sm text-[10.5px] text-primary/70 flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> {act.duration}
                        </span>
                        <span className="font-bold text-[12px] text-primary">
                          {act.cost === 0 ? 'Free' : `$${act.cost}`}
                        </span>
                        <button
                          onClick={() => handleOpenScheduleActivity(act)}
                          className="bg-primary hover:bg-surface-tint text-on-primary font-label-sm text-[11px] px-3.5 py-1.5 rounded-full transition-colors active:scale-95 font-semibold"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredActivities.length === 0 && (
                  <div className="py-12 text-center text-on-surface-variant italic text-[13px]">
                    No experiences found in {currentStop.city?.name}.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-4">
              <span className="material-symbols-outlined text-[48px] text-primary/20">navigation</span>
              <p className="font-body-md text-on-surface-variant max-w-xs text-[14px]">
                Please select or add a staging stop on the left timeline to explore local experiences.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Stop */}
      <Modal
        isOpen={stopModalOpen}
        onClose={() => setStopModalOpen(false)}
        title="Add Stop to Journey"
      >
        <form onSubmit={handleAddStopSubmit} className="space-y-6 text-left">
          {/* Select City */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
              City Destination
            </label>
            <select
              className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary cursor-pointer text-on-surface"
              value={newCityId}
              onChange={(e) => setNewCityId(e.target.value)}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.country})
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
              Dates
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2 bottom-3 text-on-surface-variant text-[18px]">calendar_today</span>
                <input
                  type="date"
                  className="input-underline w-full pl-8 font-body-md text-body-md text-on-surface"
                  placeholder="Arrival"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2 bottom-3 text-on-surface-variant text-[18px]">calendar_today</span>
                <input
                  type="date"
                  className="input-underline w-full pl-8 font-body-md text-body-md text-on-surface"
                  placeholder="Departure"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth className="py-3 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
            Confirm Add Stop
          </Button>
        </form>
      </Modal>

      {/* Modal: Schedule Activity Time */}
      <Modal
        isOpen={activityModalOpen}
        onClose={() => setActivityModalOpen(false)}
        title={selectedActivity ? `Schedule: ${selectedActivity.name}` : 'Schedule Activity'}
      >
        {selectedActivity && (
          <form onSubmit={handleScheduleActivitySubmit} className="space-y-6 text-left">
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-lg flex gap-4">
              <img src={selectedActivity.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
              <div>
                <h4 className="font-semibold text-primary text-[14px]">{selectedActivity.name}</h4>
                <p className="text-[11.5px] text-on-surface-variant mt-0.5 line-clamp-2">{selectedActivity.description}</p>
                <div className="flex justify-between items-center mt-2 text-[12px]">
                  <span className="text-secondary font-semibold font-label-sm">${selectedActivity.cost} / person</span>
                  <span className="text-primary/70">{selectedActivity.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Scheduled Start Time (Optional)
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

            <Button type="submit" variant="primary" fullWidth className="py-3 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
              Add to Timeline
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ItineraryBuilder;
