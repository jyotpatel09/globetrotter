import { City, Activity, Trip, User } from '../services/api';

export const mockUser: User = {
  id: 'user-123',
  name: 'Alex Mercer',
  email: 'alex.mercer@globetrotter.com',
  createdAt: '2026-08-01T12:00:00.000Z'
};

export const mockCities: City[] = [
  {
    id: 'city-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMP6YpJSEVWVpagG90Jp_mDojbPoadV43ELVxrNebeypKCVyfjbPmSErnUfxoZ9M4CW13daIBWsi2C-6EtiQG7W6Qeu8QLumIQ7-wfBzv4eGSgK8K7PERaGSWceOFLMjhNYNsKA74a9E2K7Cmq1nFx3zMu7Mp0gAZ7-y_1H1UrsdFk2vOfP4z0oAYXrm6CaotwzOUCc7BiW88KN1d4NEgV8CkRl8_3yDFZFQLU_zK23C8swPK-cltSeg',
    description: 'Neon skylines, futuristic districts, and centuries-old shrines.'
  },
  {
    id: 'city-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1BafMDLt2TQNtdGYqn8TV9sOcyTWigwaNiAeDFBspjy_fY4v7yb49ciA8Yhqgg7q0dkSkkDp8ZZlVixL7IV9nwS3Er4UV-bB3qBDFFLn4PJaeIpJ42rHiTzYLcVy9awfbFpJBITGeydS5Z7lRcZZIlhUyL8944w_ftRIDpVe2ByXn60UcSHFyvuxQMjo2kRNvU-9pZGvjqpJeSle_GntpcnKuWhP_KLvhc_4UgmOQ0ykutVZRF8CclQ',
    description: 'Ancient wooden temples, bamboo forests, and traditional teahouses.'
  },
  {
    id: 'city-osaka',
    name: 'Osaka',
    country: 'Japan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3yf3jT-iWzzrCFgHFp0iBOn_vGO7OmZC-paUxZuMZTbDdjzRbN3vxvJR400Ge1Pf5Uqzf2X-r9tqtkkkYqS1i_Z-T3qWf8IQ8mAv7r-6mmc3Zezq6x4KSCvQc2SUoBD7KSQy-T-6Qz65gL0FN3yLtIbu8o-ZZCgsFuBCTQdMy6r7UKDMHOwSh5QkFdqp4pvTsZiELKAUJY8iVUexZP2JOaMSagemMLEO4iZ6hbNFNIvUKy_MvBXQIoA',
    description: 'Dynamic street food culture, castles, and electric nightlife.'
  },
  {
    id: 'city-paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Cradle of romance, high fashion, fine art, and iconic monuments.'
  },
  {
    id: 'city-london',
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    description: 'A historic metropolis blending royal heritage with cutting-edge trends.'
  },
  {
    id: 'city-singapore',
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    description: 'A futuristic garden city state with diverse cuisines and skyline pools.'
  },
  {
    id: 'city-ahmedabad',
    name: 'Ahmedabad',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1607584144365-c7e6c4e09e1e?auto=format&fit=crop&w=800&q=80',
    description: 'UNESCO World Heritage city with intricate stepwells and rich history.'
  },
  {
    id: 'city-mumbai',
    name: 'Mumbai',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80',
    description: 'A high-energy coastal megacity, Bollywood hub, and historical gateway.'
  },
  {
    id: 'city-delhi',
    name: 'Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    description: 'Vast capital city containing ancient forts, busy markets, and monuments.'
  },
  {
    id: 'city-jaipur',
    name: 'Jaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1477584322904-486188540ec2?auto=format&fit=crop&w=800&q=80',
    description: 'The Pink City, filled with royal fortresses, observatories, and palaces.'
  },
  {
    id: 'city-goa',
    name: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80',
    description: 'Sunkissed beaches, Portuguese churches, and relaxed tropical vibes.'
  },
  {
    id: 'city-bengaluru',
    name: 'Bengaluru',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    description: 'India\'s tech hub, renowned for its gardens, palaces, and microbreweries.'
  }
];

export const mockActivities: Activity[] = [
  // Kyoto Activities
  {
    id: 'act-fushimi-inari',
    cityId: 'city-kyoto',
    name: 'Fushimi Inari Hike',
    description: 'A morning trek through thousands of vibrant vermilion torii gates winding up the sacred wooded mountainside.',
    cost: 0,
    category: 'Active',
    duration: '3 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNXjww8QPYsLPkZal8UjnHmkN-Ey0_pbOdb9eBIgE7RTd8J9--AWyI4h9XnGJxDBXgY_YkcZ_k1VN0Tv1PA0vDCbw-4vFFgq_bgxZa1UcQzlGjiyfAmzHnAS-JNZuxCE8w553s9cXAOTq2AB52Y9z2VHflryWlWif7K8PlFlbHvzT-ee-UVySSB96X5IcPOKeADoS702JYjyocbMKDi_waB3r5kZKo6Gioga3i0GgRaPgRzTvsQMUkUw'
  },
  {
    id: 'act-arashiyama',
    cityId: 'city-kyoto',
    name: 'Arashiyama Bamboo Walk',
    description: 'Walk through the towering green stalks of the Arashiyama Bamboo Grove bathed in soft, ethereal morning light.',
    cost: 15,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRI2GfRd-lpYleVvGBlrVNqpB5d3r5pemMTGL1xOqVBnDUXAH6OMrWCsjUqPk75baw71XKSL9SsJg5ruG1CjfBYgknNLjKquNIO43yBa6B3cR1WFLTXqJuY-FJScR46JthbwDTKPbNBGgKUu0pUWKdP_nNaCwe14kf5im5TiOLwArPg0bUeRBLsSntw2SIL34xQSBWKypbILDQrUx9pSS9Bj4D8ZN1vVL4f1TlorhCjA79UIPgE6-t1Q'
  },
  {
    id: 'act-kinkaku-ji',
    cityId: 'city-kyoto',
    name: 'Kinkaku-ji Temple Visit',
    description: 'Visit the Golden Pavilion reflecting beautifully on the calm dark waters of the surrounding pond.',
    cost: 5,
    category: 'Culture',
    duration: '2 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7HaFJ8Bw1jHa2KxPA0_Vkq5NOHU5hL__W4GhZG-97MOxDizkAXJ6M1jsmGb8_ncocFmx4QIbb4ubO-o0Tsl603LB_w0z_tAuZYy2YEgS5P6QL0RuSEFJsApZgaw8K4-KVao_sunwQ6Ux6zqhS-0kYDpom6X2o0UcfDZSXyMiU47BWayeyOWzTARvb2Aos6rdq4tmJL1G163MNt25tNbo_McsOq9z5qEGnSX20LyTd-adnxIgNZcUauA'
  },
  {
    id: 'act-tea-ceremony',
    cityId: 'city-kyoto',
    name: 'Traditional Tea Ceremony',
    description: 'An intimate, moody Japanese tea ceremony in a minimalist tatami room with a certified tea master.',
    cost: 45,
    category: 'Culture',
    duration: '1.5 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsgy7PWfi6h4kEICCy3IyJM2czn3SVHbxx3pldAL0Xt7Av3wBHX7-8pOA0VhVFrdrn-TDa254gCEr9sJKg6IrWleUDkPBfxoZuhzF7ZKNZaZx0uzOr9f4A0Dg4CXkcgtkTi6IisL_Pt21hd1IxJX5bfr-tvHyj4vGPTI0XcJYSMdvkBxSSAI11qabgfh50_-QN_TyiRXbc8z5FpX4iJtfU8RtUcVkP4ruKF4bowW6lMDuscys8O3S0Aw'
  },
  {
    id: 'act-nishiki-market',
    cityId: 'city-kyoto',
    name: 'Nishiki Market Food Tour',
    description: 'Explore a narrow covered market filled with fresh local delicacies, skewers, and traditional kitchenware.',
    cost: 35,
    category: 'Food',
    duration: '2.5 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxkge3BpzJyh4qyA7rAQUb9pi55HYooSkXVXinA6LcZILO0F5u-MJdk1RcqJz_4KFxMczs_UXd31u-ky-NbeDb0r2q0oPBVco9Z_B84fxdJAiQVqM2gfqWr-R_6u-WkXrV1o_ADkiiqK8b0sWXNV2Ov1kFTiXXEDmABNZp0H61HSh8CHKvyRADx0WGZgM1pqSMVPh9hr41CWInCGF6WfWD_G9Fg8c_uyz58WpTuPXewpUGq-w1EbfbAA'
  },

  // Tokyo Activities
  {
    id: 'act-shibuya-sky',
    cityId: 'city-tokyo',
    name: 'Shibuya Sky Observation',
    description: 'Look down at the famous Shibuya scramble crossing from 229 meters high at sunset.',
    cost: 20,
    category: 'Active',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-sensoji',
    cityId: 'city-tokyo',
    name: 'Senso-ji Ancient Temple Tour',
    description: 'Explore Tokyo\'s oldest and most iconic Buddhist temple in Asakusa.',
    cost: 0,
    category: 'Culture',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-tsukiji',
    cityId: 'city-tokyo',
    name: 'Tsukiji Sushi Tasting',
    description: 'Sample incredibly fresh sashimi and street foods at the historic outer fish market.',
    cost: 50,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
  },

  // Osaka Activities
  {
    id: 'act-osaka-castle',
    cityId: 'city-osaka',
    name: 'Osaka Castle & Gardens',
    description: 'Tour the grand historic fortress with towers, stone walls, and surrounding cherry tree park.',
    cost: 8,
    category: 'Culture',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-dotonbori-food',
    cityId: 'city-osaka',
    name: 'Dotonbori Street Eats',
    description: 'Indulge in takoyaki (octopus balls) and okonomiyaki on a canal-side food hop.',
    cost: 30,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1590250672723-6a978f8c440a?auto=format&fit=crop&w=800&q=80'
  },

  // Ahmedabad Activities
  {
    id: 'act-sabarmati',
    cityId: 'city-ahmedabad',
    name: 'Sabarmati Ashram',
    description: 'Historical site and residence of Mahatma Gandhi along the banks of Sabarmati.',
    cost: 0,
    category: 'Culture',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1599824425072-ca49ca6db0a6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-adalaj',
    cityId: 'city-ahmedabad',
    name: 'Adalaj Stepwell',
    description: 'Intricately carved 5-story stepwell representing spectacular Indian architecture.',
    cost: 1,
    category: 'Culture',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1627483262769-04d0a1400f8e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-manek-chowk',
    cityId: 'city-ahmedabad',
    name: 'Manek Chowk Street Food',
    description: 'Bustling night market famous for unique sandwiches, pav bhaji, and kulfi.',
    cost: 10,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
  },

  // Goa Activities
  {
    id: 'act-baga-beach',
    cityId: 'city-goa',
    name: 'Baga Beach Water Sports',
    description: 'Popular beach known for jet skiing, parasailing, and lively beachside shacks.',
    cost: 25,
    category: 'Active',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'act-bom-jesus',
    cityId: 'city-goa',
    name: 'Basilica of Bom Jesus',
    description: 'UNESCO World Heritage church holding the mortal remains of St. Francis Xavier.',
    cost: 0,
    category: 'Culture',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialTrips: Trip[] = [
  {
    id: 'trip-japan-2026',
    userId: 'user-123',
    name: 'Japan Autumn Discovery',
    startDate: '2026-10-12',
    endDate: '2026-10-24',
    createdAt: '2026-08-01T15:00:00.000Z',
    updatedAt: '2026-08-22T12:00:00.000Z',
    stops: [
      {
        id: 'stop-kyoto-1',
        tripId: 'trip-japan-2026',
        cityId: 'city-kyoto',
        arrival: '2026-10-12',
        departure: '2026-10-17',
        city: mockCities[1],
        activities: [
          {
            id: 'trip-act-1',
            stopId: 'stop-kyoto-1',
            activityId: 'act-fushimi-inari',
            scheduledAt: '2026-10-13T08:00:00.000Z',
            activity: mockActivities[0]
          },
          {
            id: 'trip-act-2',
            stopId: 'stop-kyoto-1',
            activityId: 'act-tea-ceremony',
            scheduledAt: '2026-10-14T14:00:00.000Z',
            activity: mockActivities[3]
          },
          {
            id: 'trip-act-3',
            stopId: 'stop-kyoto-1',
            activityId: 'act-arashiyama',
            scheduledAt: '2026-10-15T09:00:00.000Z',
            activity: mockActivities[1]
          }
        ]
      },
      {
        id: 'stop-tokyo-1',
        tripId: 'trip-japan-2026',
        cityId: 'city-tokyo',
        arrival: '2026-10-17',
        departure: '2026-10-22',
        city: mockCities[0],
        activities: [
          {
            id: 'trip-act-4',
            stopId: 'stop-tokyo-1',
            activityId: 'act-tsukiji',
            scheduledAt: '2026-10-18T10:00:00.000Z',
            activity: mockActivities[7]
          },
          {
            id: 'trip-act-5',
            stopId: 'stop-tokyo-1',
            activityId: 'act-shibuya-sky',
            scheduledAt: '2026-10-19T17:00:00.000Z',
            activity: mockActivities[5]
          }
        ]
      },
      {
        id: 'stop-osaka-1',
        tripId: 'trip-japan-2026',
        cityId: 'city-osaka',
        arrival: '2026-10-22',
        departure: '2026-10-24',
        city: mockCities[2],
        activities: [
          {
            id: 'trip-act-6',
            stopId: 'stop-osaka-1',
            activityId: 'act-dotonbori-food',
            scheduledAt: '2026-10-23T19:00:00.000Z',
            activity: mockActivities[9]
          }
        ]
      }
    ],
    budget: {
      id: 'budget-japan-2026',
      tripId: 'trip-japan-2026',
      totalLimit: 3000,
      expenses: [
        {
          id: 'exp-1',
          budgetId: 'budget-japan-2026',
          title: 'Kyoto Machiya Hotel Stay',
          amount: 850,
          category: 'Accommodation',
          date: '2026-10-12'
        },
        {
          id: 'exp-2',
          budgetId: 'budget-japan-2026',
          title: 'Shinkansen Bullet Train Ticket',
          amount: 280,
          category: 'Transport',
          date: '2026-10-17'
        },
        {
          id: 'exp-3',
          budgetId: 'budget-japan-2026',
          title: 'Fine Dining Kaiseki Dinner',
          amount: 190,
          category: 'Food',
          date: '2026-10-14'
        },
        {
          id: 'exp-4',
          budgetId: 'budget-japan-2026',
          title: 'Activity: Traditional Tea Ceremony',
          amount: 45,
          category: 'Activities',
          date: '2026-10-14'
        },
        {
          id: 'exp-5',
          budgetId: 'budget-japan-2026',
          title: 'Activity: Shibuya Sky',
          amount: 20,
          category: 'Activities',
          date: '2026-10-19'
        }
      ]
    }
  },
  {
    id: 'trip-goa-2026',
    userId: 'user-123',
    name: 'Goa Coastal Escape',
    startDate: '2026-11-20',
    endDate: '2026-11-25',
    createdAt: '2026-08-10T11:00:00.000Z',
    updatedAt: '2026-08-10T11:00:00.000Z',
    stops: [
      {
        id: 'stop-goa-1',
        tripId: 'trip-goa-2026',
        cityId: 'city-goa',
        arrival: '2026-11-20',
        departure: '2026-11-25',
        city: mockCities[10],
        activities: [
          {
            id: 'trip-act-goa-1',
            stopId: 'stop-goa-1',
            activityId: 'act-baga-beach',
            scheduledAt: '2026-11-21T10:00:00.000Z',
            activity: mockActivities[13]
          }
        ]
      }
    ],
    budget: {
      id: 'budget-goa-2026',
      tripId: 'trip-goa-2026',
      totalLimit: 800,
      expenses: [
        {
          id: 'exp-goa-1',
          budgetId: 'budget-goa-2026',
          title: 'Beachside Villa Accommodation',
          amount: 320,
          category: 'Accommodation',
          date: '2026-11-20'
        },
        {
          id: 'exp-goa-2',
          budgetId: 'budget-goa-2026',
          title: 'Scooter Rental',
          amount: 30,
          category: 'Transport',
          date: '2026-11-21'
        }
      ]
    }
  }
];
