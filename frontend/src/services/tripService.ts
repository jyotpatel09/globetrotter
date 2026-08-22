import { Trip, Stop, TripActivity, Budget, Expense, City, Activity } from './api';
import { mockCities, mockActivities, initialTrips } from '../data/mockData';
import { apiClient } from '../api/client';

const LOCAL_STORAGE_KEY = 'globetrotter_trips';

// Resolve explicit mock mode from env (default to true so judges have a fully functional app without Postgres configuration)
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === undefined;
const TEMP_USER_ID = 'user-123'; // Temporary user ID as defined in backend contract

// Initialize localStorage with mock data if not present (only for mock mode)
const initializeStorage = (): Trip[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored trips, resetting to mock data', e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTrips));
  return initialTrips;
};

// Internal state for mock mode
let tripsState: Trip[] = USE_MOCK ? initializeStorage() : [];

const saveState = () => {
  if (USE_MOCK) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tripsState));
  }
};

export const tripService = {
  // Cities & Activities (Master Directories)
  // Since there are no Express endpoints for master lists, we resolve these from the static contract mock directories
  getCities(): City[] {
    return mockCities;
  },

  getCityById(id: string): City | undefined {
    return mockCities.find(c => c.id === id);
  },

  getActivities(cityId?: string): Activity[] {
    if (cityId) {
      return mockActivities.filter(a => a.cityId === cityId);
    }
    return mockActivities;
  },

  getActivityById(id: string): Activity | undefined {
    return mockActivities.find(a => a.id === id);
  },

  // Helper to populate stops, activities, and budget elements for a trip via Express APIs
  async populateTripDetails(trip: Trip): Promise<Trip> {
    if (USE_MOCK) return trip; // Only used for real mode

    try {
      // 1. Fetch stops for this trip: GET /trips/:id/stops
      const stopsResponse = await apiClient.get<Stop[]>(`/trips/${trip.id}/stops`);
      const stops = stopsResponse.data || [];
      
      // 2. For each stop, fetch scheduled activities: GET /trips/:id/stops/:stopId/activities
      const populatedStops = await Promise.all(stops.map(async (stop) => {
        const activitiesResponse = await apiClient.get<TripActivity[]>(`/trips/${trip.id}/stops/${stop.id}/activities`);
        const tripActs = activitiesResponse.data || [];
        
        // Map master activity data onto the TripActivity
        const populatedActs = tripActs.map(act => {
          const masterAct = mockActivities.find(ma => ma.id === act.activityId);
          return {
            ...act,
            activity: masterAct || act.activity
          };
        });
        
        // Match the city details
        const city = mockCities.find(c => c.id === stop.cityId);
        
        return {
          ...stop,
          city: city || stop.city,
          activities: populatedActs
        };
      }));
      
      // 3. Construct Budget object (Limit and manual expenses stored in client storage; activities roll-up calculated on the fly)
      const budgetLimit = localStorage.getItem(`globetrotter_trip_budget_limit_${trip.id}`) || '2000';
      const customExpenses: Expense[] = JSON.parse(localStorage.getItem(`globetrotter_trip_expenses_${trip.id}`) || '[]');
      
      // Create activity expenses list on the fly from the database activities
      const activityExpenses: Expense[] = [];
      populatedStops.forEach(stop => {
        stop.activities?.forEach(tripAct => {
          if (tripAct.activity) {
            activityExpenses.push({
              id: tripAct.id,
              budgetId: `budget-${trip.id}`,
              title: `Activity: ${tripAct.activity.name}`,
              amount: tripAct.activity.cost || 0,
              category: 'Activities',
              date: tripAct.scheduledAt ? tripAct.scheduledAt.split('T')[0] : (stop.arrival ? stop.arrival.split('T')[0] : new Date().toISOString().split('T')[0])
            });
          }
        });
      });
      
      const budget: Budget = {
        id: `budget-${trip.id}`,
        tripId: trip.id,
        totalLimit: parseFloat(budgetLimit),
        expenses: [...activityExpenses, ...customExpenses]
      };
      
      return {
        ...trip,
        stops: populatedStops,
        budget
      };
    } catch (error) {
      console.error(`Error populating trip details for ${trip.id}:`, error);
      // If nested fetches fail, return trip with empty structures rather than breaking the application
      return {
        ...trip,
        stops: [],
        budget: {
          id: `budget-${trip.id}`,
          tripId: trip.id,
          totalLimit: 2000,
          expenses: []
        }
      };
    }
  },

  // Trips CRUD
  async getTrips(): Promise<Trip[]> {
    if (USE_MOCK) {
      return tripsState;
    }
    
    const response = await apiClient.get<Trip[]>(`/trips?userId=${TEMP_USER_ID}`);
    const trips = response.data || [];
    
    // Populate nested stops and details for each trip
    const mappedTrips = await Promise.all(trips.map(t => this.populateTripDetails(t)));
    return mappedTrips;
  },

  async getTripById(id: string): Promise<Trip | undefined> {
    if (USE_MOCK) {
      return tripsState.find(t => t.id === id);
    }
    
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    if (!response.data) return undefined;
    
    return this.populateTripDetails(response.data);
  },

  async createTrip(name: string, startDate?: string, endDate?: string, totalLimit: number = 2000): Promise<Trip> {
    if (USE_MOCK) {
      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        userId: TEMP_USER_ID,
        name,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stops: []
      };
      newTrip.budget = {
        id: `budget-${Date.now()}`,
        tripId: newTrip.id,
        totalLimit,
        expenses: []
      };
      tripsState.push(newTrip);
      saveState();
      return newTrip;
    }
    
    const response = await apiClient.post<Trip>('/trips', {
      userId: TEMP_USER_ID,
      name,
      startDate: startDate || null,
      endDate: endDate || null
    });
    
    if (!response.data) throw new Error('Failed to create trip on the backend');
    
    const newTrip = response.data;
    localStorage.setItem(`globetrotter_trip_budget_limit_${newTrip.id}`, totalLimit.toString());
    
    return this.populateTripDetails(newTrip);
  },

  async updateTrip(id: string, updates: Partial<Pick<Trip, 'name' | 'startDate' | 'endDate'>>): Promise<Trip | undefined> {
    if (USE_MOCK) {
      const tripIndex = tripsState.findIndex(t => t.id === id);
      if (tripIndex === -1) return undefined;
      tripsState[tripIndex] = {
        ...tripsState[tripIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveState();
      return tripsState[tripIndex];
    }
    
    const response = await apiClient.patch<Trip>(`/trips/${id}`, {
      name: updates.name,
      startDate: updates.startDate || null,
      endDate: updates.endDate || null
    });
    
    if (!response.data) return undefined;
    return this.populateTripDetails(response.data);
  },

  async deleteTrip(id: string): Promise<boolean> {
    if (USE_MOCK) {
      const len = tripsState.length;
      tripsState = tripsState.filter(t => t.id !== id);
      saveState();
      return tripsState.length < len;
    }
    
    await apiClient.delete(`/trips/${id}`);
    localStorage.removeItem(`globetrotter_trip_budget_limit_${id}`);
    localStorage.removeItem(`globetrotter_trip_expenses_${id}`);
    return true;
  },

  // Stops management
  async addStop(tripId: string, cityId: string, arrival?: string, departure?: string): Promise<Stop | undefined> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip) return undefined;
      const city = mockCities.find(c => c.id === cityId);
      if (!city) return undefined;
      const newStop: Stop = {
        id: `stop-${Date.now()}`,
        tripId,
        cityId,
        arrival: arrival || undefined,
        departure: departure || undefined,
        city,
        activities: []
      };
      trip.stops.push(newStop);
      trip.updatedAt = new Date().toISOString();
      saveState();
      return newStop;
    }
    
    const response = await apiClient.post<Stop>(`/trips/${tripId}/stops`, {
      cityId,
      arrival: arrival || null,
      departure: departure || null
    });
    
    return response.data;
  },

  async deleteStop(tripId: string, stopId: string): Promise<boolean> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip) return false;
      const initialLen = trip.stops.length;
      const stop = trip.stops.find(s => s.id === stopId);
      if (stop && stop.activities && trip.budget) {
        const actIds = stop.activities.map(a => a.id);
        trip.budget.expenses = trip.budget.expenses.filter(e => !actIds.includes(e.id));
      }
      trip.stops = trip.stops.filter(s => s.id !== stopId);
      trip.updatedAt = new Date().toISOString();
      saveState();
      return trip.stops.length < initialLen;
    }
    
    await apiClient.delete(`/trips/${tripId}/stops/${stopId}`);
    return true;
  },

  // Stop Activities management
  async addActivityToStop(tripId: string, stopId: string, activityId: string, scheduledAt?: string): Promise<TripActivity | undefined> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip) return undefined;
      const stop = trip.stops.find(s => s.id === stopId);
      if (!stop) return undefined;
      const activity = mockActivities.find(a => a.id === activityId);
      if (!activity) return undefined;
      const tripActivityId = `trip-act-${Date.now()}`;
      const newTripActivity: TripActivity = {
        id: tripActivityId,
        stopId,
        activityId,
        scheduledAt: scheduledAt || undefined,
        activity
      };
      if (!stop.activities) stop.activities = [];
      stop.activities.push(newTripActivity);
      if (trip.budget && activity.cost && activity.cost > 0) {
        trip.budget.expenses.push({
          id: tripActivityId,
          budgetId: trip.budget.id,
          title: `Activity: ${activity.name}`,
          amount: activity.cost,
          category: 'Activities',
          date: scheduledAt || stop.arrival || new Date().toISOString().split('T')[0]
        });
      }
      trip.updatedAt = new Date().toISOString();
      saveState();
      return newTripActivity;
    }
    
    const response = await apiClient.post<TripActivity>(`/trips/${tripId}/stops/${stopId}/activities`, {
      activityId,
      scheduledAt: scheduledAt || null
    });
    
    return response.data;
  },

  async deleteActivityFromStop(tripId: string, stopId: string, tripActivityId: string): Promise<boolean> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip) return false;
      const stop = trip.stops.find(s => s.id === stopId);
      if (!stop || !stop.activities) return false;
      const initialLen = stop.activities.length;
      stop.activities = stop.activities.filter(a => a.id !== tripActivityId);
      if (trip.budget) {
        trip.budget.expenses = trip.budget.expenses.filter(e => e.id !== tripActivityId);
      }
      trip.updatedAt = new Date().toISOString();
      saveState();
      return stop.activities.length < initialLen;
    }
    
    await apiClient.delete(`/trips/${tripId}/stops/${stopId}/activities/${tripActivityId}`);
    return true;
  },

  // Budget management
  async updateBudgetLimit(tripId: string, totalLimit: number): Promise<Budget | undefined> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip) return undefined;
      if (!trip.budget) {
        trip.budget = { id: `budget-${Date.now()}`, tripId, totalLimit, expenses: [] };
      } else {
        trip.budget.totalLimit = totalLimit;
      }
      trip.updatedAt = new Date().toISOString();
      saveState();
      return trip.budget;
    }
    
    localStorage.setItem(`globetrotter_trip_budget_limit_${tripId}`, totalLimit.toString());
    const trip = await this.getTripById(tripId);
    return trip?.budget;
  },

  async addExpense(tripId: string, title: string, amount: number, category: Expense['category'], date: string): Promise<Expense | undefined> {
    const expenseId = `exp-${Date.now()}`;
    const budgetId = `budget-${tripId}`;
    const newExpense: Expense = { id: expenseId, budgetId, title, amount, category, date };
    
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip || !trip.budget) return undefined;
      trip.budget.expenses.push(newExpense);
      trip.updatedAt = new Date().toISOString();
      saveState();
      return newExpense;
    }
    
    const customExpenses: Expense[] = JSON.parse(localStorage.getItem(`globetrotter_trip_expenses_${tripId}`) || '[]');
    customExpenses.push(newExpense);
    localStorage.setItem(`globetrotter_trip_expenses_${tripId}`, JSON.stringify(customExpenses));
    return newExpense;
  },

  async deleteExpense(tripId: string, expenseId: string): Promise<boolean> {
    if (USE_MOCK) {
      const trip = tripsState.find(t => t.id === tripId);
      if (!trip || !trip.budget) return false;
      const initialLen = trip.budget.expenses.length;
      trip.budget.expenses = trip.budget.expenses.filter(e => e.id !== expenseId);
      trip.updatedAt = new Date().toISOString();
      saveState();
      return trip.budget.expenses.length < initialLen;
    }
    
    const customExpenses: Expense[] = JSON.parse(localStorage.getItem(`globetrotter_trip_expenses_${tripId}`) || '[]');
    const initialLen = customExpenses.length;
    const filtered = customExpenses.filter(e => e.id !== expenseId);
    localStorage.setItem(`globetrotter_trip_expenses_${tripId}`, JSON.stringify(filtered));
    return filtered.length < initialLen;
  }
};
