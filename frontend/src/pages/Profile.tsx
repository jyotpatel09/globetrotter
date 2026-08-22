import React, { useState } from 'react';
import Input from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { mockUser } from '../data/mockData';

export const Profile: React.FC = () => {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [currency, setCurrency] = useState('USD');
  const [travelStyle, setTravelStyle] = useState('Comfort');
  const [isPublic, setIsPublic] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex-grow w-full py-4 text-left max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <header className="border-b border-outline-variant/30 pb-4">
        <h1 className="font-display-lg text-[36px] font-bold text-primary">Profile & Settings</h1>
        <p className="font-body-md text-on-surface-variant text-[14.5px] mt-1">
          Customize your traveler profile and general preferences for curated itineraries.
        </p>
      </header>

      {success && (
        <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl text-label-sm text-[13.5px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Your settings have been saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Avatar block (4 columns) */}
        <div className="md:col-span-4 flex flex-col items-center p-6 bg-white border border-outline-variant/30 rounded-xl space-y-4">
          <img
            alt={name}
            className="w-28 h-28 rounded-full object-cover border-2 border-primary/20 shadow-md"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
          />
          <div className="text-center">
            <h4 className="font-headline-sm text-[18px] font-bold text-primary">{name}</h4>
            <p className="text-[12px] text-on-surface-variant mt-0.5">Explorer Level 3</p>
          </div>
          <button
            type="button"
            className="text-secondary font-label-sm text-[12px] hover:underline font-semibold"
            onClick={() => alert('Mock photo upload triggered!')}
          >
            Change Photo
          </button>
        </div>

        {/* Form Inputs (8 columns) */}
        <div className="md:col-span-8 bg-white border border-outline-variant/30 p-6 md:p-8 rounded-xl space-y-6">
          <Input
            id="profile-name"
            type="text"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon="person"
          />

          <Input
            id="profile-email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon="mail"
          />

          <div className="grid grid-cols-2 gap-6">
            {/* Preferred Currency */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Currency
              </label>
              <select
                className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary text-on-surface cursor-pointer"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block font-semibold">
                Travel Style
              </label>
              <select
                className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary text-on-surface cursor-pointer"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
              >
                <option value="Budget">Budget Minimalist</option>
                <option value="Comfort">Comfort Curated</option>
                <option value="Luxury">Luxury Premium</option>
              </select>
            </div>
          </div>

          {/* Toggle sharing */}
          <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
            <div className="text-left space-y-0.5 max-w-md">
              <span className="font-semibold text-primary text-[14px]">Public Shared Links</span>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                By default, generate public viewing tokens when creating new itinerary details.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isPublic ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
              }`}
            >
              <span className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>

          <div className="pt-4 border-t border-outline-variant/20">
            <Button type="submit" variant="primary" className="px-8 py-2.5 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
              Save Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
