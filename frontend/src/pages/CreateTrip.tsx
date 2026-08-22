import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import Input from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('2000');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('Please provide a name for your trip.');
      return;
    }
    
    // Dates validation (optional, but if provided should be valid range)
    if (startDate && endDate && startDate > endDate) {
      setError('Start date cannot be after end date.');
      return;
    }

    try {
      const limit = parseFloat(budgetLimit) || 2000;
      const newTrip = await tripService.createTrip(name, startDate, endDate, limit);
      
      // Automatically redirect to the itinerary builder of the new trip!
      navigate(`/trips/${newTrip.id}/builder`);
    } catch (err) {
      console.error('Failed to create trip:', err);
      setError(err instanceof Error ? err.message : 'Failed to create trip. Please verify connection and try again.');
    }
  };

  // Calculate duration if dates are selected
  const getDaysCount = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const daysCount = getDaysCount();

  return (
    <div className="flex-grow w-full py-4 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[70vh]">
        {/* Left Column: Form Focus */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center space-y-12">
          <header className="space-y-3">
            <h1 className="font-display-lg text-[48px] text-primary font-bold leading-tight">Start your next journey</h1>
            <p className="font-body-lg text-on-surface-variant text-[16px]">
              Provide a few details to begin building your personalized editorial travel journal.
            </p>
          </header>

          {error && (
            <div className="bg-error-container/30 border border-error/20 text-error p-3 rounded-lg text-label-sm text-[13px] flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Trip Name */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block" htmlFor="trip-name">
                Trip Name
              </label>
              <input
                id="trip-name"
                className="input-underline w-full font-headline-md text-[28px] text-on-surface placeholder:text-outline-variant outline-none"
                placeholder="e.g., Japan Autumn Discovery"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                required
                type="text"
              />
            </div>

            {/* Dates */}
            <div className="space-y-3">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Travel Dates
              </label>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-1/2 relative">
                  <span className="material-symbols-outlined absolute left-0 bottom-3 text-on-surface-variant text-[20px] pointer-events-none">calendar_today</span>
                  <input
                    className="input-underline w-full pl-8 font-body-lg text-body-lg text-on-surface"
                    placeholder="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="hidden sm:block text-outline-variant font-light pb-2">to</div>
                <div className="w-full sm:w-1/2 relative">
                  <span className="material-symbols-outlined absolute left-0 bottom-3 text-on-surface-variant text-[20px] pointer-events-none">calendar_today</span>
                  <input
                    className="input-underline w-full pl-8 font-body-lg text-body-lg text-on-surface"
                    placeholder="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              {daysCount !== null && (
                <div className="pt-2">
                  <span className="bg-surface-container-high text-primary font-label-sm text-label-sm px-3.5 py-1.5 rounded-full inline-block font-bold">
                    {daysCount} Days
                  </span>
                </div>
              )}
            </div>

            {/* Budget Limit */}
            <Input
              id="budgetLimit"
              type="number"
              label="Trip Budget Limit ($)"
              placeholder="e.g. 2000"
              icon="payments"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
            />

            {/* Submit */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button type="submit" variant="primary" size="lg" className="px-10 py-3.5 bg-primary hover:bg-surface-tint text-on-primary rounded-xl font-label-md font-semibold transition-all active:scale-95">
                Create & Add Stops
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-primary hover:bg-black/5 rounded-xl font-semibold"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Editorial Graphic */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative rounded-xl overflow-hidden border border-outline-variant/30 min-h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Contemplative Zen Garden"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi8yiUDmaZZifB7TyPvu2ExY19BUVcHGAFmoCD5YP3HQZ6ce5Be4SE7pnSg1l4DpfYu-I9YGisNFAxL1AfYhcA3jvc1d28bvxd8Kv0vpoxkTfJVgpm0NE9NH5N3m7tjcPmheBClWq_vsspEu-fCeUSwtNGmEUoobD3MGLZfySJIg0Je0kyIsnYKkbqbigBlK7u4vJqiGyeBpwwdojEYRMDa-y81Y8B9BAIgETEGt5l0rT8YWj3Cjq9ZQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 text-white space-y-4">
            <h3 className="font-headline-sm text-[26px]">Tethered Horizon</h3>
            <p className="font-body-md text-white/80 leading-relaxed text-[14px]">
              "Journey-planning is an art form rather than a logistical chore. We prioritize high-quality composition, white space, and rich typography to mimic the feeling of a premium physical travel journal."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
