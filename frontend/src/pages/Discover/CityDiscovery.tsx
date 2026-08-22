import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { City, Trip } from '../../services/api';
import Modal from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';

export const CityDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  // Stop form state
  const [targetTripId, setTargetTripId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setCities(tripService.getCities());
    const loadTrips = async () => {
      try {
        const userTrips = await tripService.getTrips();
        setTrips(userTrips);
        if (userTrips.length > 0) {
          setTargetTripId(userTrips[0].id);
        }
      } catch (err) {
        console.error('Failed to load trips for discovery:', err);
      }
    };
    loadTrips();
  }, []);

  const handleOpenAddModal = (e: React.MouseEvent, city: City) => {
    e.stopPropagation();
    setSelectedCity(city);
    setModalOpen(true);
    setSuccessMessage('');
  };

  const handleAddStopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity || !targetTripId) return;

    try {
      await tripService.addStop(targetTripId, selectedCity.id, arrivalDate, departureDate);
      setSuccessMessage(`Successfully added ${selectedCity.name} to your trip!`);
      
      // Clear inputs
      setArrivalDate('');
      setDepartureDate('');
      
      setTimeout(() => {
        setModalOpen(false);
        setSelectedCity(null);
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      console.error('Failed to add stop to trip:', err);
      alert(err instanceof Error ? err.message : 'Failed to add stop. Please verify connection and try again.');
    }
  };

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-grow w-full flex flex-col gap-10 py-4 text-left">
      {/* Header & Search */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-6">
        <div className="space-y-2">
          <h1 className="font-display-lg text-[40px] text-deep-forest font-bold leading-tight">Explore Destinations</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl text-[15px]">
            Discover hand-picked cultural capitals, coastal retreats, and historical marvels to include in your journals.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-deep-forest/50 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search by city or country..."
            className="w-full pl-10 pr-4 py-2 border border-outline-variant/50 rounded-full bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md font-body-md text-on-surface"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 -mt-4">
        <button
          onClick={() => navigate('/discover')}
          className="px-5 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wider font-semibold"
        >
          Cities
        </button>
        <button
          onClick={() => navigate('/discover/activities')}
          className="px-5 py-2 bg-white hover:bg-surface-container border border-outline-variant/30 rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wider transition-colors font-semibold"
        >
          Activities
        </button>
      </div>

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCities.map((city) => (
          <div
            key={city.id}
            onClick={() => navigate('/discover/activities', { state: { cityId: city.id } })}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-outline-variant/30 aspect-[3/4] flex flex-col justify-end text-left"
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] group-hover:scale-105"
              style={{ backgroundImage: `url('${city.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>

            {/* Content Details */}
            <div className="relative p-6 text-white space-y-3 z-10">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-surface/90 backdrop-blur-sm rounded-full font-label-sm text-[10px] text-primary font-bold uppercase tracking-wide mb-2">
                  {city.country}
                </span>
                <h3 className="font-headline-sm text-[26px] font-semibold tracking-tight">{city.name}</h3>
              </div>
              <p className="font-body-md text-white/85 text-[13.5px] leading-relaxed line-clamp-2">
                {city.description}
              </p>
              
              <div className="pt-2 flex gap-3">
                <button
                  onClick={(e) => handleOpenAddModal(e, city)}
                  className="flex-1 bg-white text-primary font-label-sm text-[12px] py-2.5 rounded-full hover:bg-surface-tint hover:text-white transition-colors text-center font-bold active:scale-95 shadow-sm"
                >
                  Add to Trip
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/discover/activities', { state: { cityId: city.id } });
                  }}
                  className="bg-white/15 hover:bg-white/25 text-white font-label-sm text-[12px] px-4 py-2.5 rounded-full transition-colors active:scale-95 flex items-center justify-center"
                  title="View Activities"
                >
                  <span className="material-symbols-outlined text-[18px]">local_activity</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCities.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-outline-variant/30 shadow-sm space-y-3 max-w-lg mx-auto w-full">
            <span className="material-symbols-outlined text-[48px] text-primary/30">location_off</span>
            <h4 className="font-headline-sm text-primary">No destinations found</h4>
            <p className="font-body-md text-on-surface-variant text-[14px]">
              We couldn't find any cities matching your query. Check spelling or clear search filters.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-secondary font-semibold font-label-sm text-[12px] hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Modal: Add stop to trip */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCity ? `Add ${selectedCity.name} to Itinerary` : 'Add Stop'}
      >
        {successMessage ? (
          <div className="py-8 text-center space-y-4">
            <span className="material-symbols-outlined text-[64px] text-primary animate-bounce">check_circle</span>
            <p className="font-headline-sm text-primary font-semibold">{successMessage}</p>
          </div>
        ) : trips.length > 0 ? (
          <form onSubmit={handleAddStopSubmit} className="space-y-6 text-left">
            {/* Select Trip */}
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

            {/* Arrival & Departure */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Staging Dates (Optional)
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
        ) : (
          /* Empty Trips state in modal */
          <div className="text-center py-6 space-y-4">
            <p className="font-body-md text-on-surface-variant text-center">
              You don't have any planned trips yet to add stops to. Let's create one first!
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

export default CityDiscovery;
