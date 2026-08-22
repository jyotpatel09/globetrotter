export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  image?: string;
  description?: string;
}

export interface Activity {
  id: string;
  cityId: string;
  name: string;
  description?: string;
  cost?: number; // In USD or INR equivalent
  category?: 'Active' | 'Culture' | 'Food' | 'Relax' | string;
  duration?: string;
  image?: string;
}

export interface TripActivity {
  id: string;
  stopId: string;
  activityId: string;
  scheduledAt?: string; // ISO DateTime string or just YYYY-MM-DD
  activity?: Activity; // Populated in frontend
}

export interface Stop {
  id: string;
  tripId: string;
  cityId: string;
  arrival?: string; // ISO DateTime string or date
  departure?: string; // ISO DateTime string or date
  city?: City; // Populated in frontend
  activities?: TripActivity[]; // Populated in frontend
}

export interface Expense {
  id: string;
  budgetId: string;
  title: string;
  amount: number;
  category: 'Accommodation' | 'Transport' | 'Food' | 'Activities' | 'Other';
  date: string;
}

export interface Budget {
  id: string;
  tripId: string;
  totalLimit: number;
  expenses: Expense[];
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  startDate?: string; // ISO DateTime or date
  endDate?: string; // ISO DateTime or date
  createdAt: string;
  updatedAt: string;
  stops: Stop[];
  budget?: Budget; // Frontend specific extension
}

// Standard API response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
