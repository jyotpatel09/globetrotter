import { Trip, Stop, TripActivity, Budget, Expense, City, Activity } from './api';
import { mockCities, mockActivities, initialTrips } from '../data/mockData';

const LOCAL_STORAGE_KEY = 'globetrotter_trips';

// Initialize localStorage with mock data if not present
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

// Internal state
let tripsState: Trip[] = initializeStorage();

const saveState = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tripsState));
};

export const tripService = {
  // Cities & Activities
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

  // Trips CRUD
  getTrips(): Trip[] {
    return tripsState;
  },

  getTripById(id: string): Trip | undefined {
    return tripsState.find(t => t.id === id);
  },

  createTrip(name: string, startDate?: string, endDate?: string, totalLimit: number = 2000): Trip {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: 'user-123',
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
  },

  updateTrip(id: string, updates: Partial<Pick<Trip, 'name' | 'startDate' | 'endDate'>>): Trip | undefined {
    const tripIndex = tripsState.findIndex(t => t.id === id);
    if (tripIndex === -1) return undefined;

    tripsState[tripIndex] = {
      ...tripsState[tripIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveState();
    return tripsState[tripIndex];
  },

  deleteTrip(id: string): boolean {
    const len = tripsState.length;
    tripsState = tripsState.filter(t => t.id !== id);
    saveState();
    return tripsState.length < len;
  },

  // Stops management
  addStop(tripId: string, cityId: string, arrival?: string, departure?: string): Stop | undefined {
    const trip = this.getTripById(tripId);
    if (!trip) return undefined;

    const city = this.getCityById(cityId);
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
  },

  deleteStop(tripId: string, stopId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip) return false;

    const initialLen = trip.stops.length;
    // Clean up stop's activities from budget expenses as well
    const stop = trip.stops.find(s => s.id === stopId);
    if (stop && stop.activities && trip.budget) {
      const actIds = stop.activities.map(a => a.id);
      trip.budget.expenses = trip.budget.expenses.filter(e => !actIds.includes(e.id));
    }

    trip.stops = trip.stops.filter(s => s.id !== stopId);
    trip.updatedAt = new Date().toISOString();
    saveState();
    return trip.stops.length < initialLen;
  },

  // Stop Activities management
  addActivityToStop(tripId: string, stopId: string, activityId: string, scheduledAt?: string): TripActivity | undefined {
    const trip = this.getTripById(tripId);
    if (!trip) return undefined;

    const stop = trip.stops.find(s => s.id === stopId);
    if (!stop) return undefined;

    const activity = this.getActivityById(activityId);
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

    // CRITICAL INTERACTION: auto-add activity cost to budget expenses
    if (trip.budget && activity.cost && activity.cost > 0) {
      const newExpense: Expense = {
        id: tripActivityId, // share ID for easy tracking/deletion
        budgetId: trip.budget.id,
        title: `Activity: ${activity.name}`,
        amount: activity.cost,
        category: 'Activities',
        date: scheduledAt || stop.arrival || new Date().toISOString().split('T')[0]
      };
      trip.budget.expenses.push(newExpense);
    }

    trip.updatedAt = new Date().toISOString();
    saveState();
    return newTripActivity;
  },

  deleteActivityFromStop(tripId: string, stopId: string, tripActivityId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip) return false;

    const stop = trip.stops.find(s => s.id === stopId);
    if (!stop || !stop.activities) return false;

    const initialLen = stop.activities.length;
    stop.activities = stop.activities.filter(a => a.id !== tripActivityId);

    // CRITICAL INTERACTION: auto-remove activity cost from budget
    if (trip.budget) {
      trip.budget.expenses = trip.budget.expenses.filter(e => e.id !== tripActivityId);
    }

    trip.updatedAt = new Date().toISOString();
    saveState();
    return stop.activities.length < initialLen;
  },

  // Budget management
  updateBudgetLimit(tripId: string, totalLimit: number): Budget | undefined {
    const trip = this.getTripById(tripId);
    if (!trip) return undefined;

    if (!trip.budget) {
      trip.budget = {
        id: `budget-${Date.now()}`,
        tripId,
        totalLimit,
        expenses: []
      };
    } else {
      trip.budget.totalLimit = totalLimit;
    }

    trip.updatedAt = new Date().toISOString();
    saveState();
    return trip.budget;
  },

  addExpense(tripId: string, title: string, amount: number, category: Expense['category'], date: string): Expense | undefined {
    const trip = this.getTripById(tripId);
    if (!trip || !trip.budget) return undefined;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      budgetId: trip.budget.id,
      title,
      amount,
      category,
      date
    };

    trip.budget.expenses.push(newExpense);
    trip.updatedAt = new Date().toISOString();
    saveState();
    return newExpense;
  },

  deleteExpense(tripId: string, expenseId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || !trip.budget) return false;

    const initialLen = trip.budget.expenses.length;
    trip.budget.expenses = trip.budget.expenses.filter(e => e.id !== expenseId);
    trip.updatedAt = new Date().toISOString();
    saveState();
    return trip.budget.expenses.length < initialLen;
  }
};
