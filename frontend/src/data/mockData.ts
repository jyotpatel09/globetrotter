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
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80',
    description: 'Neon skylines, futuristic districts, and centuries-old shrines.'
  },
  {
    id: 'city-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient wooden temples, bamboo forests, and traditional teahouses.'
  },
  {
    id: 'city-osaka',
    name: 'Osaka',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1571136094091-f3f04bc9c3cf?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1600100397608-cf59c34a5a4d?auto=format&fit=crop&w=800&q=80',
    description: 'UNESCO World Heritage city with intricate stepwells and rich history.'
  },
  {
    id: 'city-mumbai',
    name: 'Mumbai',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80',
    description: 'A high-energy coastal megacity, Bollywood hub, and historical gateway.'
  },
  {
    id: 'city-delhi',
    name: 'Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'Vast capital city containing ancient forts, busy markets, and monuments.'
  },
  {
    id: 'city-jaipur',
    name: 'Jaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'The Pink City, filled with royal fortresses, observatories, and palaces.'
  },
  {
    id: 'city-goa',
    name: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Sunkissed beaches, Portuguese churches, and relaxed tropical vibes.'
  },
  {
    id: 'city-bengaluru',
    name: 'Bengaluru',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    description: 'India\'s tech hub, renowned for its gardens, palaces, and microbreweries.'
  },
  {
    id: 'city-dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1546412414-e035b7c77343?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-modern architectures, luxury shopping, and sweeping desert dunes.'
  },
  {
    id: 'city-bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=800&q=80',
    description: 'Forested volcanic mountains, iconic rice paddies, and sandy resort beaches.'
  },
  {
    id: 'city-zermatt',
    name: 'Zermatt',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    description: 'A car-free ski resort at the base of the iconic Matterhorn peak.'
  },
  {
    id: 'city-bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80',
    description: 'Bustling streets, ornate shrines, and active boat-filled canals.'
  },
  {
    id: 'city-rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
    description: 'Cradle of the Roman Empire, St. Peter\'s Basilica, and fine gelaterias.'
  },
  {
    id: 'city-manali',
    name: 'Manali',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=800&q=80',
    description: 'Himalayan backpacking hub, adventure sports, and snow-capped valleys.'
  },
  {
    id: 'city-srinagar',
    name: 'Srinagar',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful Mughal gardens, absolute serenity, and wooden houseboats.'
  },
  {
    id: 'city-udaipur',
    name: 'Udaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'City of Lakes, boasting floating palaces, gardens, and royal courtrooms.'
  },
  {
    id: 'city-alleppey',
    name: 'Alleppey',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Network of tranquil backwater canals, palm-fringed houseboats, and coir.'
  },
  {
    id: 'city-istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    description: 'Straddling two continents, a city of grand mosques, bazaars, and Bosphorus views.'
  },
  {
    id: 'city-barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: 'Gaudí masterpieces, sun-soaked beaches, and electric tapas culture.'
  }
];

export const mockActivities: Activity[] = [
  // Kyoto
  {
    id: 'act-fushimi-inari',
    cityId: 'city-kyoto',
    name: 'Fushimi Inari Hike',
    description: 'A morning trek through thousands of vermilion torii gates winding up the sacred wooded mountainside.',
    cost: 0,
    category: 'Active',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=800&q=80',
    location: 'Kyoto, Japan',
    bestTime: '07:00 AM'
  },
  {
    id: 'act-arashiyama',
    cityId: 'city-kyoto',
    name: 'Arashiyama Bamboo Walk',
    description: 'Walk through the towering green stalks of the Arashiyama Bamboo Grove bathed in soft, ethereal morning light.',
    cost: 15,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1610882648335-ced8fc8eefd4?auto=format&fit=crop&w=800&q=80',
    location: 'Arashiyama, Kyoto',
    bestTime: '08:30 AM'
  },
  {
    id: 'act-tea-ceremony',
    cityId: 'city-kyoto',
    name: 'Traditional Tea Ceremony',
    description: 'An intimate, moody Japanese tea ceremony in a minimalist tatami room with a certified tea master.',
    cost: 45,
    category: 'Culture',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    location: 'Higashiyama, Kyoto',
    bestTime: '02:00 PM'
  },

  // Tokyo
  {
    id: 'act-shibuya-sky',
    cityId: 'city-tokyo',
    name: 'Shibuya Sky Observation',
    description: 'Look down at the famous Shibuya scramble crossing from 229 meters high at sunset.',
    cost: 20,
    category: 'Active',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80',
    location: 'Shibuya, Tokyo',
    bestTime: '05:30 PM'
  },
  {
    id: 'act-tsukiji',
    cityId: 'city-tokyo',
    name: 'Tsukiji Sushi Tasting',
    description: 'Sample incredibly fresh sashimi and street foods at the historic outer fish market.',
    cost: 50,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    location: 'Tsukiji, Tokyo',
    bestTime: '10:00 AM'
  },

  // Osaka
  {
    id: 'act-dotonbori-food',
    cityId: 'city-osaka',
    name: 'Dotonbori Street Eats',
    description: 'Indulge in takoyaki (octopus balls) and okonomiyaki on a canal-side food hop.',
    cost: 30,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1571136094091-f3f04bc9c3cf?auto=format&fit=crop&w=800&q=80',
    location: 'Dotonbori, Osaka',
    bestTime: '07:00 PM'
  },

  // Ahmedabad
  {
    id: 'act-sabarmati',
    cityId: 'city-ahmedabad',
    name: 'Sabarmati Ashram',
    description: 'Historical site and residence of Mahatma Gandhi along the banks of Sabarmati River.',
    cost: 0,
    category: 'Culture',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1600100397608-cf59c34a5a4d?auto=format&fit=crop&w=800&q=80',
    location: 'Sabarmati, Ahmedabad',
    bestTime: '09:00 AM'
  },
  {
    id: 'act-manek-chowk',
    cityId: 'city-ahmedabad',
    name: 'Manek Chowk Street Food',
    description: 'Bustling night market famous for unique sandwiches, pav bhaji, and kulfi.',
    cost: 10,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    location: 'Manek Chowk, Old City',
    bestTime: '09:30 PM'
  },

  // Goa
  {
    id: 'act-baga-beach',
    cityId: 'city-goa',
    name: 'Baga Beach Water Sports',
    description: 'Popular beach known for jet skiing, parasailing, and lively beachside shacks.',
    cost: 25,
    category: 'Active',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Baga Beach, North Goa',
    bestTime: '10:30 AM'
  },

  // Paris
  {
    id: 'act-louvre',
    cityId: 'city-paris',
    name: 'Louvre Gallery Walk',
    description: 'Explore the world\'s largest museum containing the Mona Lisa and Winged Victory.',
    cost: 22,
    category: 'Culture',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    location: 'Rue de Rivoli, Paris',
    bestTime: '09:00 AM'
  },
  {
    id: 'act-seine-cruise',
    cityId: 'city-paris',
    name: 'Seine River Sunset Cruise',
    description: 'Sail down the Seine admiring historic bridges, Notre-Dame, and the glittering Eiffel Tower.',
    cost: 18,
    category: 'Relax',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9647a6406a?auto=format&fit=crop&w=800&q=80',
    location: 'Port de la Bourdonnais, Paris',
    bestTime: '07:30 PM'
  },

  // Switzerland (Zermatt)
  {
    id: 'act-matterhorn-glacier',
    cityId: 'city-zermatt',
    name: 'Matterhorn Glacier Paradise',
    description: 'Ascend Europe\'s highest cable car station for panoramic views of Matterhorn glaciers.',
    cost: 95,
    category: 'Active',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    location: 'Zermatt Station, Valais',
    bestTime: '08:30 AM'
  },
  {
    id: 'act-swiss-fondue',
    cityId: 'city-zermatt',
    name: 'Alpine Cheese Fondue Feast',
    description: 'Enjoy a rich traditional Swiss gruyère and vacherin fondue dinner in a wooden ski lodge.',
    cost: 40,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&w=800&q=80',
    location: 'Bahnhofstrasse, Zermatt',
    bestTime: '07:00 PM'
  },

  // Dubai
  {
    id: 'act-desert-safari',
    cityId: 'city-dubai',
    name: 'Dune Bashing Safari & BBQ',
    description: 'Experience intense dune bashing, camel riding, and a barbecue dinner under stars.',
    cost: 65,
    category: 'Active',
    duration: '6 Hours',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    location: 'Lahbab Desert, Dubai',
    bestTime: '03:30 PM'
  },
  {
    id: 'act-burj-khalifa',
    cityId: 'city-dubai',
    name: 'Burj Khalifa Sky Deck',
    description: 'Ascend to the 148th floor of the world\'s tallest tower for sunset city views.',
    cost: 110,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1546412414-e035b7c77343?auto=format&fit=crop&w=800&q=80',
    location: 'Downtown Dubai',
    bestTime: '05:00 PM'
  },

  // Bali
  {
    id: 'act-ubud-swing',
    cityId: 'city-bali',
    name: 'Tegallalang Jungle Swing',
    description: 'Swing high over breathtaking terraced green valley rice paddies.',
    cost: 20,
    category: 'Active',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=800&q=80',
    location: 'Ubud Valley, Bali',
    bestTime: '09:00 AM'
  },
  {
    id: 'act-uluwatu-kecak',
    cityId: 'city-bali',
    name: 'Uluwatu Kecak Fire Dance',
    description: 'Watch the epic Ramayana fire dance performance on a cliff edge overlooking the Indian Ocean.',
    cost: 12,
    category: 'Culture',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    location: 'Pecatu, South Kuta',
    bestTime: '06:00 PM'
  },

  // Singapore
  {
    id: 'act-gardens-by-bay',
    cityId: 'city-singapore',
    name: 'Supertree Light Show',
    description: 'Observe the futuristic Gardens by the Bay domes and Avatar-like supertrees lit up with sound.',
    cost: 24,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    location: 'Marina Gardens Dr, Singapore',
    bestTime: '07:45 PM'
  },

  // London
  {
    id: 'act-tower-bridge',
    cityId: 'city-london',
    name: 'Historic Tower of London',
    description: 'Explore the royal fortress and the Crown Jewels under historic stone arches.',
    cost: 35,
    category: 'Culture',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    location: 'London Hill, London',
    bestTime: '10:00 AM'
  },

  // Rome
  {
    id: 'act-colosseum',
    cityId: 'city-rome',
    name: 'Colosseum & Roman Forum Tour',
    description: 'Explore the arena where gladiators fought, followed by walks through the Roman Forum.',
    cost: 30,
    category: 'Culture',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
    location: 'Piazza del Colosseo, Rome',
    bestTime: '08:30 AM'
  },
  {
    id: 'act-gelato-making',
    cityId: 'city-rome',
    name: 'Gourmet Gelato Class',
    description: 'Learn to blend traditional ingredients to churn gourmet gelato at a historic kitchen.',
    cost: 45,
    category: 'Food',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    location: 'Piazza Navona, Rome',
    bestTime: '03:30 PM'
  },

  // Bangkok
  {
    id: 'act-grand-palace',
    cityId: 'city-bangkok',
    name: 'Grand Palace Exploration',
    description: 'Admire the breathtaking golden spires, mosaics, and Wat Phra Kaew (Emerald Buddha).',
    cost: 15,
    category: 'Culture',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    location: 'Na Phra Lan Rd, Bangkok',
    bestTime: '09:00 AM'
  },

  // Istanbul
  {
    id: 'act-bosphorus-cruise',
    cityId: 'city-istanbul',
    name: 'Bosphorus Yacht Sunset',
    description: 'Sail between Europe and Asia past castles and ornate wooden waterside villas.',
    cost: 35,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    location: 'Galata Port, Istanbul',
    bestTime: '06:30 PM'
  },

  // Manali
  {
    id: 'act-solang-paragliding',
    cityId: 'city-manali',
    name: 'Solang Valley Paragliding',
    description: 'Fly over deep pine forests and winding valleys with experienced local pilots.',
    cost: 40,
    category: 'Active',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    location: 'Solang Valley, Manali',
    bestTime: '11:00 AM'
  },

  // Srinagar
  {
    id: 'act-dal-lake-shikara',
    cityId: 'city-srinagar',
    name: 'Dal Lake Shikara Tour',
    description: 'Ride a wooden boat past floating gardens and houseboats at sunset.',
    cost: 8,
    category: 'Relax',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    location: 'Dal Lake Gate 1, Srinagar',
    bestTime: '05:30 PM'
  },
  {
    id: 'act-gulmarg-gondola',
    cityId: 'city-srinagar',
    name: 'Gulmarg Gondola Ride',
    description: 'Ride the highest ski lift in India to view Mt. Apharwat glaciers.',
    cost: 12,
    category: 'Active',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    location: 'Gulmarg Gondola Station',
    bestTime: '09:00 AM'
  },

  // Udaipur
  {
    id: 'act-pichola-boat',
    cityId: 'city-udaipur',
    name: 'Lake Pichola Royal Cruise',
    description: 'Sail past Jag Mandir Island Palace as golden rays light up the City Palace.',
    cost: 10,
    category: 'Relax',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    location: 'Ambrai Ghat, Udaipur',
    bestTime: '05:30 PM'
  },

  // Alleppey
  {
    id: 'act-houseboat-safari',
    cityId: 'city-alleppey',
    name: 'Alleppey Backwater Cruise',
    description: 'Sail a traditional coir and wood houseboat through palm tree arches.',
    cost: 15,
    category: 'Relax',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    location: 'Punnamada Jetty, Alleppey',
    bestTime: '12:00 PM'
  }
];

export const initialTrips: Trip[] = [
  // Trip 1: Japan Autumn Discovery
  {
    id: 'trip-japan-2026',
    userId: 'user-123',
    name: 'Japan Autumn Discovery',
    startDate: '2026-10-12',
    endDate: '2026-10-17',
    createdAt: '2026-08-01T15:00:00.000Z',
    updatedAt: '2026-08-22T12:00:00.000Z',
    description: 'Experience a sensory tour of Japanese heritage.',
    fullDescription: 'Journey from the historic pathways of Kyoto and temples of Nara to Osaka\'s vibrant street food scene.',
    category: 'Culture & Food',
    travelStyle: 'Comfort Curated',
    difficulty: 'Easy',
    bestSeason: 'Autumn (October - November)',
    highlights: [
      'Zen gardens of Kinkaku-ji',
      'Intimate tea ceremony in Higashiyama',
      'Morning walk in Arashiyama Bamboo Grove',
      'Tsukiji Sushi Outer Market exploration',
      'Night foodie tour of Dotonbori Canal'
    ],
    tips: [
      'Respect silence on public trains.',
      'Purchase an IC card for local subway travel.',
      'Carry cash; some traditional shrines do not take cards.'
    ],
    accommodationOptions: [
      {
        name: 'Sowaka Heritage Ryokan stay',
        area: 'Gion Quarter, Kyoto',
        priceRange: '$$$$',
        rating: 4.9,
        type: 'Ryokan/Boutique Stay',
        amenities: ['Private Garden', 'Onsen bath', 'Michelin dining'],
        reason: 'Restored century-old Machiya villa with traditional tatami rooms.'
      }
    ],
    foodPlan: {
      breakfast: 'Traditional Japanese set breakfast at Kishin Kyoto.',
      lunch: 'Chilled Soba noodles at Arashiyama Yoshimura.',
      dinner: 'Multi-course kaiseki feast at Gion Karyo.',
      mustTry: 'Kyoto Matcha soft-serve ice cream.'
    },
    transportationInfo: 'Shinkansen Bullet Train for regional travel, and local subways using Suica cards.',
    stops: [
      {
        id: 'stop-kyoto-1',
        tripId: 'trip-japan-2026',
        cityId: 'city-kyoto',
        arrival: '2026-10-12',
        departure: '2026-10-15',
        city: mockCities[1],
        description: 'Explore the imperial heart of traditional Japanese culture.',
        thingsToSee: ['Kinkaku-ji', 'Fushimi Inari Torii gates', 'Gion quarter'],
        recommendedArrival: '12:00 PM',
        travelTimeToNext: '2 Hours',
        transportMethod: 'Bullet Train',
        estimatedCost: 350,
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
            activity: mockActivities[2]
          }
        ]
      },
      {
        id: 'stop-tokyo-1',
        tripId: 'trip-japan-2026',
        cityId: 'city-tokyo',
        arrival: '2026-10-15',
        departure: '2026-10-17',
        city: mockCities[0],
        description: 'Venture into Tokyo\'s neon-lit avenues and historic fish markets.',
        thingsToSee: ['Scramble Crossing', 'Senso-ji Temple', 'Tsukiji Market'],
        recommendedArrival: '02:30 PM',
        travelTimeToNext: '1 Hour',
        transportMethod: 'Limited Express Train',
        estimatedCost: 200,
        activities: [
          {
            id: 'trip-act-4',
            stopId: 'stop-tokyo-1',
            activityId: 'act-tsukiji',
            scheduledAt: '2026-10-16T10:00:00.000Z',
            activity: mockActivities[4]
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
          date: '2026-10-15'
        },
        {
          id: 'exp-3',
          budgetId: 'budget-japan-2026',
          title: 'Kaiseki Dinner Gion',
          amount: 190,
          category: 'Food',
          date: '2026-10-13'
        }
      ]
    }
  },

  // Trip 2: Goa Beachside Sabbatical
  {
    id: 'trip-goa-2026',
    userId: 'user-123',
    name: 'Goa Beachside Sabbatical',
    startDate: '2026-11-20',
    endDate: '2026-11-25',
    createdAt: '2026-08-10T11:00:00.000Z',
    updatedAt: '2026-08-10T11:00:00.000Z',
    description: 'Explore the golden coastlines and spice plantations of Goa.',
    fullDescription: 'Spend five nights lounging on sandy white beaches, exploring Portuguese cathedrals, and drinking regional cashew feni.',
    category: 'Beach & Relax',
    travelStyle: 'Relaxed/Budget',
    difficulty: 'Easy',
    bestSeason: 'Winter (November - February)',
    highlights: [
      'Sunset at Palolem beach shacks',
      'Old Goa Basilica history walks',
      'North Goa parasailing adventure',
      'Portuguese Latin Quarter architecture',
      'Fresh coastal fish curry lunch'
    ],
    tips: [
      'Rent a gearless scooter for inexpensive travel.',
      'Always confirm prices before hiring auto-rickshaws.',
      'Keep hydrated and apply sun lotion frequently.'
    ],
    accommodationOptions: [
      {
        name: 'The Leela Goa',
        area: 'Cavelossim Beach',
        priceRange: '$$$$',
        rating: 4.8,
        type: 'Luxury Beach Resort',
        amenities: ['Private beach access', 'Infinity lagoon pools', 'AYURVEDA wellness spas'],
        reason: 'Surrounded by tranquil lagoons and pristine white sand shores.'
      }
    ],
    foodPlan: {
      breakfast: 'Fresh fruit smoothies and organic pancakes at Artjuna Cafe.',
      lunch: 'Traditional Goan fish thali at Ritz Classic Panaji.',
      dinner: 'Candlelit seafood dinner at Curlies beach shack.',
      mustTry: 'Bebinca cake dessert with coconut cream.'
    },
    transportationInfo: 'Rental scooters for nearby travel, pre-paid taxis for airport transit.',
    stops: [
      {
        id: 'stop-goa-1',
        tripId: 'trip-goa-2026',
        cityId: 'city-goa',
        arrival: '2026-11-20',
        departure: '2026-11-25',
        city: mockCities[10],
        description: 'Bask in tropical sea breezes and explore UNESCO legacy monuments.',
        thingsToSee: ['Baga beach shacks', 'Basilica of Bom Jesus', 'Fontainhas Quarter'],
        recommendedArrival: '01:00 PM',
        travelTimeToNext: '45 mins',
        transportMethod: 'Taxi',
        estimatedCost: 150,
        activities: [
          {
            id: 'trip-act-goa-1',
            stopId: 'stop-goa-1',
            activityId: 'act-baga-beach',
            scheduledAt: '2026-11-21T10:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-baga-beach')
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
  },

  // Trip 3: Ahmedabad Cultural Weekend
  {
    id: 'trip-ahmedabad-2026',
    userId: 'user-123',
    name: 'Ahmedabad Cultural Weekend',
    startDate: '2026-09-12',
    endDate: '2026-09-14',
    createdAt: '2026-08-15T10:00:00.000Z',
    updatedAt: '2026-08-15T10:00:00.000Z',
    description: 'Explore the heritage stepwells and street foods of Ahmedabad.',
    fullDescription: 'Discover India\'s first UNESCO World Heritage city. Admire Gandhi\'s historical ashram, explore stepwells, and sample night foods.',
    category: 'Heritage & Food',
    travelStyle: 'Cultural Exploration',
    difficulty: 'Easy',
    bestSeason: 'Monsoon/Winter (September - March)',
    highlights: [
      'Sunset at Sabarmati Ashram banks',
      'Exquisite details of Adalaj stepwells',
      'Midnight food hopping at Manek Chowk',
      'Historic poles heritage morning walk',
      'Traditional handloom textile museum'
    ],
    tips: [
      'Dress modestly when entering historic shrines.',
      'Enjoy street foods, but prefer busy hot stalls.',
      'Schedules fill quickly; pre-book city heritage walks.'
    ],
    accommodationOptions: [
      {
        name: 'The House of MG',
        area: 'Lal Darwaja, Old City',
        priceRange: '$$$',
        rating: 4.7,
        type: 'Heritage Boutique Hotel',
        amenities: ['Indoor pool', 'Agashiye Terrace restaurant', 'Art galleries'],
        reason: 'Restored 20th-century mansion offering an authentic royal Gujarati experience.'
      }
    ],
    foodPlan: {
      breakfast: 'Fafda, jalebi, and hot tea at Chandravilas.',
      lunch: 'Grand Gujarati Thali at Agashiye terrace restaurant.',
      dinner: 'Pav bhaji, Gwalior dosa, and chocolate sandwiches at Manek Chowk.',
      mustTry: 'Hand-churned seasonal Mango Kulfi.'
    },
    transportationInfo: 'Auto-rickshaws for short transits, Uber for longer city commutes.',
    stops: [
      {
        id: 'stop-ahm-1',
        tripId: 'trip-ahmedabad-2026',
        cityId: 'city-ahmedabad',
        arrival: '2026-09-12',
        departure: '2026-09-14',
        city: mockCities.find(c => c.id === 'city-ahmedabad'),
        description: 'Explore historic pols, Gandhi\'s legacy, and Gujarati culinary crafts.',
        thingsToSee: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Manek Chowk'],
        recommendedArrival: '10:00 AM',
        travelTimeToNext: '30 mins',
        transportMethod: 'Auto Rickshaw',
        estimatedCost: 50,
        activities: [
          {
            id: 'trip-act-ahm-1',
            stopId: 'stop-ahm-1',
            activityId: 'act-sabarmati',
            scheduledAt: '2026-09-12T10:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-sabarmati')
          },
          {
            id: 'trip-act-ahm-2',
            stopId: 'stop-ahm-1',
            activityId: 'act-manek-chowk',
            scheduledAt: '2026-09-13T20:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-manek-chowk')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-ahmedabad-2026',
      tripId: 'trip-ahmedabad-2026',
      totalLimit: 300,
      expenses: [
        {
          id: 'exp-ahm-1',
          budgetId: 'budget-ahmedabad-2026',
          title: 'Heritage Haveli Hotel Stay',
          amount: 150,
          category: 'Accommodation',
          date: '2026-09-12'
        },
        {
          id: 'exp-ahm-2',
          budgetId: 'budget-ahmedabad-2026',
          title: 'Local Auto Transit',
          amount: 20,
          category: 'Transport',
          date: '2026-09-13'
        }
      ]
    }
  },

  // Trip 4: Parisian Summer Escapade
  {
    id: 'trip-paris-2026',
    userId: 'user-123',
    name: 'Parisian Summer Escapade',
    startDate: '2026-07-05',
    endDate: '2026-07-10',
    createdAt: '2026-08-16T12:00:00.000Z',
    updatedAt: '2026-08-16T12:00:00.000Z',
    description: 'Immerse in art, fashion, and romantic landmarks of Paris.',
    fullDescription: 'Spend a week visiting top galleries, drifting along the Seine, and picnic-dining on cheeses in classic French style.',
    category: 'Romantic & Art',
    travelStyle: 'Luxury Premium',
    difficulty: 'Easy',
    bestSeason: 'Summer (June - August)',
    highlights: [
      'Private morning tour of the Louvre museum',
      'Seine River cruise at sunset',
      'Versailles Palace Hall of Mirrors walk',
      'Picnic under the Eiffel Tower lawn',
      'Freshly baked croissants in Montmartre'
    ],
    tips: [
      'Book museum entry tickets weeks in advance.',
      'Download offline subway map apps.',
      'A simple Bonjour at shops goes a long way.'
    ],
    accommodationOptions: [
      {
        name: 'Hôtel Regina Louvre',
        area: '1st Arrondissement, Paris',
        priceRange: '$$$$',
        rating: 4.8,
        type: 'Historic Luxury Hotel',
        amenities: ['Eiffel Tower views', 'Fine dining restaurant', 'Gym'],
        reason: 'Classical French elegance situated steps away from the Louvre Museum.'
      }
    ],
    foodPlan: {
      breakfast: 'Warm café au lait and pain au chocolat at Angelina.',
      lunch: 'Steak frites at Relais de l\'Entrecôte.',
      dinner: 'Fine modern French cuisine at Frenchie.',
      mustTry: 'Assorted almond macarons from Ladurée.'
    },
    transportationInfo: 'Paris Métro transit cards, walking along the historic Seine banks.',
    stops: [
      {
        id: 'stop-paris-1',
        tripId: 'trip-paris-2026',
        cityId: 'city-paris',
        arrival: '2026-07-05',
        departure: '2026-07-10',
        city: mockCities[3],
        description: 'Explore the home of high art, Seine river cruises, and cozy street cafés.',
        thingsToSee: ['Louvre Museum', 'Seine Riverbanks', 'Eiffel Tower'],
        recommendedArrival: '11:00 AM',
        travelTimeToNext: '1 Hour',
        transportMethod: 'Metro',
        estimatedCost: 200,
        activities: [
          {
            id: 'trip-act-paris-1',
            stopId: 'stop-paris-1',
            activityId: 'act-louvre',
            scheduledAt: '2026-07-06T09:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-louvre')
          },
          {
            id: 'trip-act-paris-2',
            stopId: 'stop-paris-1',
            activityId: 'act-seine-cruise',
            scheduledAt: '2026-07-08T19:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-seine-cruise')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-paris-2026',
      tripId: 'trip-paris-2026',
      totalLimit: 2500,
      expenses: [
        {
          id: 'exp-paris-1',
          budgetId: 'budget-paris-2026',
          title: 'Regina Louvre Hotel Stay',
          amount: 1200,
          category: 'Accommodation',
          date: '2026-07-05'
        },
        {
          id: 'exp-paris-2',
          budgetId: 'budget-paris-2026',
          title: 'Louvre & Museum passes',
          amount: 80,
          category: 'Activities',
          date: '2026-07-06'
        }
      ]
    }
  },

  // Trip 5: Swiss Alpine Wonderland
  {
    id: 'trip-swiss-2026',
    userId: 'user-123',
    name: 'Swiss Alpine Wonderland',
    startDate: '2026-01-10',
    endDate: '2026-01-15',
    createdAt: '2026-08-18T10:00:00.000Z',
    updatedAt: '2026-08-18T10:00:00.000Z',
    description: 'Traverse the snowy slopes and scenic railways of Switzerland.',
    fullDescription: 'Discover snow-capped peaks in Zermatt, ride Alpine cable cars, and eat traditional Swiss cheese fondue by open log fires.',
    category: 'Mountains & Adventure',
    travelStyle: 'Premium Luxury',
    difficulty: 'Moderate',
    bestSeason: 'Winter (December - February)',
    highlights: [
      'Spectacular views of Matterhorn peaks',
      'Matterhorn Glacier Paradise cable car ride',
      'Traditional gruyère fondue lodge dinner',
      'Scenic Gornergrat alpine railway journey',
      'Zurich old-town chocolate tour walk'
    ],
    tips: [
      'Swiss Travel Pass saves significant transit fare.',
      'Pack layered winter clothes; mountain summits are very cold.',
      'Public tap water is pristine and free to drink.'
    ],
    accommodationOptions: [
      {
        name: 'The Omnia Hotel Chalet',
        area: 'Matterhorn Village, Zermatt',
        priceRange: '$$$$',
        rating: 4.9,
        type: 'Alpine Luxury Hotel',
        amenities: ['Indoor/Outdoor pool', 'Matterhorn terraces', 'Saunas'],
        reason: 'Architectural masterpiece perched on high rock face with alpine valley views.'
      }
    ],
    foodPlan: {
      breakfast: 'Swiss granola, local cheese cuts, and hot chocolate at hotel.',
      lunch: 'Rösti potato pancakes at Chez Vrony mountain hut.',
      dinner: 'Warm bubbling cheese fondue at Saycheese Zermatt.',
      mustTry: 'Auer traditional handmade chocolate truffles.'
    },
    transportationInfo: 'Swiss Federal Railways (SBB) trains, local cogwheel rails, and car-free walking.',
    stops: [
      {
        id: 'stop-zermatt-1',
        tripId: 'trip-swiss-2026',
        cityId: 'city-zermatt',
        arrival: '2026-01-10',
        departure: '2026-01-15',
        city: mockCities[14],
        description: 'Arrive at the car-free mountain village under the Matterhorn peak.',
        thingsToSee: ['Matterhorn peak views', 'Gornergrat railway', 'Glacier Paradise'],
        recommendedArrival: '02:00 PM',
        travelTimeToNext: '3 Hours',
        transportMethod: 'Cogwheel Train',
        estimatedCost: 300,
        activities: [
          {
            id: 'trip-act-swiss-1',
            stopId: 'stop-zermatt-1',
            activityId: 'act-matterhorn-glacier',
            scheduledAt: '2026-01-11T08:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-matterhorn-glacier')
          },
          {
            id: 'trip-act-swiss-2',
            stopId: 'stop-zermatt-1',
            activityId: 'act-swiss-fondue',
            scheduledAt: '2026-01-12T19:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-swiss-fondue')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-swiss-2026',
      tripId: 'trip-swiss-2026',
      totalLimit: 3500,
      expenses: [
        {
          id: 'exp-swiss-1',
          budgetId: 'budget-swiss-2026',
          title: 'Alpine Chalet stay',
          amount: 1500,
          category: 'Accommodation',
          date: '2026-01-10'
        },
        {
          id: 'exp-swiss-2',
          budgetId: 'budget-swiss-2026',
          title: 'Matterhorn Lift passes',
          amount: 190,
          category: 'Activities',
          date: '2026-01-11'
        }
      ]
    }
  },

  // Trip 6: Bali Tropical Sanctuary
  {
    id: 'trip-bali-2026',
    userId: 'user-123',
    name: 'Bali Tropical Sanctuary',
    startDate: '2026-05-15',
    endDate: '2026-05-20',
    createdAt: '2026-08-19T10:00:00.000Z',
    updatedAt: '2026-08-19T10:00:00.000Z',
    description: 'Explore the green rice paddies and coastal temples of Bali.',
    fullDescription: 'Spend six days wandering through Ubud rice terraces, viewing Uluwatu fire dances, and relaxing on sandy Seminyak beaches.',
    category: 'Relax & Wellness',
    travelStyle: 'Wellness Curated',
    difficulty: 'Easy',
    bestSeason: 'Dry Season (April - October)',
    highlights: [
      'Sunrise over Mount Batur volcano',
      'Tegallalang green valley swing',
      'Uluwatu ocean-cliff temple dance',
      'Snorkeling at Nusa Penida beaches',
      'Authentic Balinese herbal spa day'
    ],
    tips: [
      'Hire a private driver; it is highly affordable and safe.',
      'Wear sarongs when entering sacred Hindu temples.',
      'Pack plenty of mosquito repellent.'
    ],
    accommodationOptions: [
      {
        name: 'Maya Ubud Resort & Spa Villa',
        area: 'Ubud Valley, Bali',
        priceRange: '$$$',
        rating: 4.8,
        type: 'Eco Wellness Resort',
        amenities: ['Jungle pools', 'Yoga shala', 'Riverside spa'],
        reason: 'Nestled between dramatic river valleys and lush rice fields.'
      }
    ],
    foodPlan: {
      breakfast: 'Fresh dragonfruit smoothie bowl at Nalu Bowls.',
      lunch: 'Babi Guling suckling pig at Warung Ibu Oka.',
      dinner: 'Freshly grilled snapper on Jimbaran beach sands.',
      mustTry: 'Balinese spiced Luwak coffee.'
    },
    transportationInfo: 'Private rental car with local driver, boat transit to Nusa Penida.',
    stops: [
      {
        id: 'stop-bali-1',
        tripId: 'trip-bali-2026',
        cityId: 'city-bali',
        arrival: '2026-05-15',
        departure: '2026-05-20',
        city: mockCities[13],
        description: 'Explore terraced valleys, ancient cliff shrines, and wellness massage spaces.',
        thingsToSee: ['Tegallalang terraces', 'Uluwatu Temple', 'Jimbaran Bay'],
        recommendedArrival: '12:00 PM',
        travelTimeToNext: '1.5 Hours',
        transportMethod: 'Private Car',
        estimatedCost: 100,
        activities: [
          {
            id: 'trip-act-bali-1',
            stopId: 'stop-bali-1',
            activityId: 'act-ubud-swing',
            scheduledAt: '2026-05-16T09:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-ubud-swing')
          },
          {
            id: 'trip-act-bali-2',
            stopId: 'stop-bali-1',
            activityId: 'act-uluwatu-kecak',
            scheduledAt: '2026-05-17T18:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-uluwatu-kecak')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-bali-2026',
      tripId: 'trip-bali-2026',
      totalLimit: 1200,
      expenses: [
        {
          id: 'exp-bali-1',
          budgetId: 'budget-bali-2026',
          title: 'Maya Ubud Pool Villa stay',
          amount: 600,
          category: 'Accommodation',
          date: '2026-05-15'
        },
        {
          id: 'exp-bali-2',
          budgetId: 'budget-bali-2026',
          title: 'Private Driver Rental',
          amount: 150,
          category: 'Transport',
          date: '2026-05-16'
        }
      ]
    }
  },

  // Trip 7: Singapore Futuristic Gardens
  {
    id: 'trip-singapore-2026',
    userId: 'user-123',
    name: 'Singapore Futuristic Gardens',
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    createdAt: '2026-08-20T10:00:00.000Z',
    updatedAt: '2026-08-20T10:00:00.000Z',
    description: 'Explore the modern structures and diverse food styles of Singapore.',
    fullDescription: 'Spend 5 days touring Gardens by the Bay domes, Marina Bay infinity heights, and dining at bustling hawker centers.',
    category: 'City & Family',
    travelStyle: 'Modern Exploration',
    difficulty: 'Easy',
    bestSeason: 'Year-round',
    highlights: [
      'Gardens by the Bay supertree lights',
      'Marina Bay Sands rooftop view',
      'Sentosa Island cable car flight',
      'Hawker center food tour walk',
      'Chinatown heritage street explore'
    ],
    tips: [
      'Singapore MRT subway system is clean, fast, and inexpensive.',
      'It is strictly illegal to litter or chew gum in public.',
      'Tap water is clean and fully potable.'
    ],
    accommodationOptions: [
      {
        name: 'Marina Bay Sands Hotel Resort',
        area: 'Bayfront, Singapore',
        priceRange: '$$$$',
        rating: 4.8,
        type: 'Iconic Luxury Hotel',
        amenities: ['Infinity pool', 'Skypark deck', 'Mall access'],
        reason: 'Home to the world\'s largest and most famous rooftop infinity pool.'
      }
    ],
    foodPlan: {
      breakfast: 'Kaya toast, soft boiled eggs, and kopi coffee at Ya Kun.',
      lunch: 'Michelin-starred soy sauce chicken noodles at Hawker Chan.',
      dinner: 'Fresh black pepper crab at Jumbo Seafood.',
      mustTry: 'Fluffy Hainanese Chicken Rice.'
    },
    transportationInfo: 'Singapore MRT subways and local Grab taxis.',
    stops: [
      {
        id: 'stop-sg-1',
        tripId: 'trip-singapore-2026',
        cityId: 'city-singapore',
        arrival: '2026-08-15',
        departure: '2026-08-20',
        city: mockCities[5],
        description: 'Explore glass conservatories, Sentosa beaches, and Chinatown street foods.',
        thingsToSee: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa'],
        recommendedArrival: '02:00 PM',
        travelTimeToNext: '30 mins',
        transportMethod: 'Metro',
        estimatedCost: 150,
        activities: [
          {
            id: 'trip-act-sg-1',
            stopId: 'stop-sg-1',
            activityId: 'act-gardens-by-bay',
            scheduledAt: '2026-08-16T19:45:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-gardens-by-bay')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-singapore-2026',
      tripId: 'trip-singapore-2026',
      totalLimit: 1500,
      expenses: [
        {
          id: 'exp-sg-1',
          budgetId: 'budget-singapore-2026',
          title: 'Marina Bay Sands hotel stay',
          amount: 900,
          category: 'Accommodation',
          date: '2026-08-15'
        },
        {
          id: 'exp-sg-2',
          budgetId: 'budget-singapore-2026',
          title: 'Gardens by the Bay entrance',
          amount: 48,
          category: 'Activities',
          date: '2026-08-16'
        }
      ]
    }
  },

  // Trip 8: Dubai Luxury Oasis
  {
    id: 'trip-dubai-2026',
    userId: 'user-123',
    name: 'Dubai Luxury Oasis',
    startDate: '2026-12-05',
    endDate: '2026-12-10',
    createdAt: '2026-08-21T10:00:00.000Z',
    updatedAt: '2026-08-21T10:00:00.000Z',
    description: 'Experience futuristic skylines and desert dunes in Dubai.',
    fullDescription: 'Spend six days touring high observatories, riding luxury yachts, and riding SUVs over desert dunes.',
    category: 'Luxury & Adventure',
    travelStyle: 'High-end Premium',
    difficulty: 'Easy',
    bestSeason: 'Winter (November - February)',
    highlights: [
      'BURJ KHALIFA 148th floor sky view',
      'Desert dune bashing safari & BBQ',
      'Marina luxury yacht sunset cruise',
      'Palm Jumeirah scenic boardwalk walk',
      'Dubai Mall dancing fountain shows'
    ],
    tips: [
      'Pre-book Burj Khalifa sunset slots weeks ahead.',
      'Dress modestly in local shopping malls.',
      'Dubai Metro is efficient for Downtown travel.'
    ],
    accommodationOptions: [
      {
        name: 'Atlantis The Palm Luxury Palace',
        area: 'Palm Jumeirah, Dubai',
        priceRange: '$$$$',
        rating: 4.8,
        type: '5-Star Resort',
        amenities: ['Waterpark access', 'Aquarium pools', 'Spas'],
        reason: 'Iconic resort situated on the crescent of the Palm Jumeirah.'
      }
    ],
    foodPlan: {
      breakfast: 'Avocado toast and latte at Tom & Serg.',
      lunch: 'Traditional Middle Eastern mezze at Al Fanar.',
      dinner: 'Award-winning Asian fusion dining at Zuma Dubai.',
      mustTry: 'Luqaimat sweet dumplings with date syrup.'
    },
    transportationInfo: 'Dubai Metro trains, Careem/Uber cabs, and yacht transits.',
    stops: [
      {
        id: 'stop-dubai-1',
        tripId: 'trip-dubai-2026',
        cityId: 'city-dubai',
        arrival: '2026-12-05',
        departure: '2026-12-10',
        city: mockCities[12],
        description: 'Explore the tallest spires, sand dune safaris, and ocean-facing docks.',
        thingsToSee: ['Burj Khalifa', 'Dubai Marina', 'Lahbab Desert'],
        recommendedArrival: '01:00 PM',
        travelTimeToNext: '1 Hour',
        transportMethod: 'Private SUV',
        estimatedCost: 250,
        activities: [
          {
            id: 'trip-act-dubai-1',
            stopId: 'stop-dubai-1',
            activityId: 'act-desert-safari',
            scheduledAt: '2026-12-06T15:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-desert-safari')
          },
          {
            id: 'trip-act-dubai-2',
            stopId: 'stop-dubai-1',
            activityId: 'act-burj-khalifa',
            scheduledAt: '2026-12-07T17:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-burj-khalifa')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-dubai-2026',
      tripId: 'trip-dubai-2026',
      totalLimit: 2200,
      expenses: [
        {
          id: 'exp-dubai-1',
          budgetId: 'budget-dubai-2026',
          title: 'Atlantis The Palm stay',
          amount: 1100,
          category: 'Accommodation',
          date: '2026-12-05'
        },
        {
          id: 'exp-dubai-2',
          budgetId: 'budget-dubai-2026',
          title: 'Burj Khalifa Sky tickets',
          amount: 110,
          category: 'Activities',
          date: '2026-12-07'
        }
      ]
    }
  },

  // Trip 9: Kashmir Heaven on Earth
  {
    id: 'trip-kashmir-2026',
    userId: 'user-123',
    name: 'Kashmir Heaven on Earth',
    startDate: '2026-10-05',
    endDate: '2026-10-10',
    createdAt: '2026-08-22T09:00:00.000Z',
    updatedAt: '2026-08-22T09:00:00.000Z',
    description: 'Explore the houseboats and glaciers of Srinagar and Gulmarg.',
    fullDescription: 'Spend six days taking Shikara boat rides on Dal Lake, riding Gulmarg cable cars, and walking through royal Mughal gardens.',
    category: 'Mountains & Nature',
    travelStyle: 'Scenic Mountain',
    difficulty: 'Easy',
    bestSeason: 'Autumn/Spring (September - May)',
    highlights: [
      'Houseboat stay on serene Dal Lake',
      'Shikara wooden boat sunset tour',
      'Gulmarg Gondola high glacier lift',
      'Betaab Valley rivers in Pahalgam',
      'Mughal Shalimar Bagh gardens walk'
    ],
    tips: [
      'Only postpaid mobile SIM cards function in Kashmir.',
      'Pack heavy woolens; Gulmarg is extremely cold.',
      'Negotiate pony ride prices prior to hiring.'
    ],
    accommodationOptions: [
      {
        name: 'The Khyber Resort Palace',
        area: 'Gulmarg hills',
        priceRange: '$$$$',
        rating: 4.9,
        type: '5-Star Mountain Resort',
        amenities: ['Indoor heated pool', 'Spas', 'Mountain valley views'],
        reason: 'Premium wooden resort overlooking snow-covered pine forests.'
      }
    ],
    foodPlan: {
      breakfast: 'Warm Kashmiri Kahwa tea with local almond bread.',
      lunch: 'Traditional Kashmiri Rogan Josh curry at Mughal Darbar.',
      dinner: 'Detailed Multi-course Kashmiri Wazwan meal.',
      mustTry: 'Fresh walnut fudge from Srinagar.'
    },
    transportationInfo: 'Prepaid private cars for intercity drives, wooden Shikara boats on lakes.',
    stops: [
      {
        id: 'stop-sri-1',
        tripId: 'trip-kashmir-2026',
        cityId: 'city-srinagar',
        arrival: '2026-10-05',
        departure: '2026-10-10',
        city: mockCities.find(c => c.id === 'city-srinagar'),
        description: 'Explore floating gardens, houseboats, Mughal shrines, and mountain lifts.',
        thingsToSee: ['Dal Lake Houseboats', 'Shalimar Gardens', 'Gulmarg Hills'],
        recommendedArrival: '12:00 PM',
        travelTimeToNext: '2 Hours',
        transportMethod: 'Private Cab',
        estimatedCost: 120,
        activities: [
          {
            id: 'trip-act-kash-1',
            stopId: 'stop-sri-1',
            activityId: 'act-dal-lake-shikara',
            scheduledAt: '2026-10-06T17:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-dal-lake-shikara')
          },
          {
            id: 'trip-act-kash-2',
            stopId: 'stop-sri-1',
            activityId: 'act-gulmarg-gondola',
            scheduledAt: '2026-10-07T09:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-gulmarg-gondola')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-kashmir-2026',
      tripId: 'trip-kashmir-2026',
      totalLimit: 1000,
      expenses: [
        {
          id: 'exp-kash-1',
          budgetId: 'budget-kashmir-2026',
          title: 'Mascot Deluxe Houseboat stay',
          amount: 450,
          category: 'Accommodation',
          date: '2026-10-05'
        },
        {
          id: 'exp-kash-2',
          budgetId: 'budget-kashmir-2026',
          title: 'Gulmarg Gondola Phase 2 ticket',
          amount: 24,
          category: 'Activities',
          date: '2026-10-07'
        }
      ]
    }
  },

  // Trip 10: Rajasthan Royal Heritage
  {
    id: 'trip-rajasthan-2026',
    userId: 'user-123',
    name: 'Rajasthan Royal Heritage',
    startDate: '2026-12-15',
    endDate: '2026-12-20',
    createdAt: '2026-08-22T10:00:00.000Z',
    updatedAt: '2026-08-22T10:00:00.000Z',
    description: 'Explore the pink fortresses and lake palaces of Rajasthan.',
    fullDescription: 'Spend six days touring historic Amer Fort, boating on Lake Pichola in Udaipur, and experiencing desert hospitality.',
    category: 'Culture & Royal',
    travelStyle: 'Royal Heritage',
    difficulty: 'Easy',
    bestSeason: 'Winter (October - March)',
    highlights: [
      'Jaipur Amer Fort elephant gate tour',
      'Boat cruise on Lake Pichola Udaipur',
      'Hawa Mahal lattice palace photo walk',
      'Rajasthan royal folk dance dinner show',
      'Vintage car museum collection tour'
    ],
    tips: [
      'Always hire official ASI-licensed guides at forts.',
      'Carry hats, shades, and sunblock; deserts are sunny.',
      'Try the Rajasthani Laal Maas curry.'
    ],
    accommodationOptions: [
      {
        name: 'Taj Lake Palace Luxury Stay',
        area: 'Lake Pichola, Udaipur',
        priceRange: '$$$$',
        rating: 4.9,
        type: 'Heritage Palace Stay',
        amenities: ['Lake pool', 'Royal spas', 'Heritage boat transits'],
        reason: 'Breathtaking white marble palace floating in the center of Lake Pichola.'
      }
    ],
    foodPlan: {
      breakfast: 'Pyaaz kachori and ginger tea at Rawat Jaipur.',
      lunch: 'Rajasthani thali at Chokhi Dhani.',
      dinner: 'Sunset lakeside dinner at Ambrai Restaurant.',
      mustTry: 'Dal Baati Churma cooked in woodfire.'
    },
    transportationInfo: 'Intercity private cab driver, heritage boat rides on Pichola.',
    stops: [
      {
        id: 'stop-raj-1',
        tripId: 'trip-rajasthan-2026',
        cityId: 'city-jaipur',
        arrival: '2026-12-15',
        departure: '2026-12-18',
        city: mockCities[9],
        description: 'Explore royal observatories, pink sandstone palaces, and heritage forts.',
        thingsToSee: ['Amer Fort', 'Hawa Mahal', 'City Palace'],
        recommendedArrival: '11:00 AM',
        travelTimeToNext: '6 Hours',
        transportMethod: 'Private Car',
        estimatedCost: 180,
        activities: []
      },
      {
        id: 'stop-raj-2',
        tripId: 'trip-rajasthan-2026',
        cityId: 'city-udaipur',
        arrival: '2026-12-18',
        departure: '2026-12-20',
        city: mockCities.find(c => c.id === 'city-udaipur'),
        description: 'Bask in lakeside tranquility, view floating palaces, and tour courtyards.',
        thingsToSee: ['Lake Pichola', 'Udaipur City Palace', 'Jag Mandir'],
        recommendedArrival: '03:00 PM',
        travelTimeToNext: '1 Hour',
        transportMethod: 'Taxi',
        estimatedCost: 150,
        activities: [
          {
            id: 'trip-act-raj-1',
            stopId: 'stop-raj-2',
            activityId: 'act-pichola-boat',
            scheduledAt: '2026-12-19T17:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-pichola-boat')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-rajasthan-2026',
      tripId: 'trip-rajasthan-2026',
      totalLimit: 1300,
      expenses: [
        {
          id: 'exp-raj-1',
          budgetId: 'budget-rajasthan-2026',
          title: 'Taj Lake Palace luxury stay',
          amount: 800,
          category: 'Accommodation',
          date: '2026-12-18'
        },
        {
          id: 'exp-raj-2',
          budgetId: 'budget-rajasthan-2026',
          title: 'Private Intercity Cab',
          amount: 120,
          category: 'Transport',
          date: '2026-12-15'
        }
      ]
    }
  },

  // Trip 11: Kerala Backwaters & Spice
  {
    id: 'trip-kerala-2026',
    userId: 'user-123',
    name: 'Kerala Backwaters & Spice',
    startDate: '2026-09-20',
    endDate: '2026-09-25',
    createdAt: '2026-08-22T11:00:00.000Z',
    updatedAt: '2026-08-22T11:00:00.000Z',
    description: 'Navigate the palm-fringed houseboats and tea gardens of Kerala.',
    fullDescription: 'Spend six days floating along Alleppey backwater canals, walking through Munnar tea fields, and enjoying ayurvedic massages.',
    category: 'Relax & Nature',
    travelStyle: 'Tropical Nature',
    difficulty: 'Easy',
    bestSeason: 'Monsoon/Winter (September - March)',
    highlights: [
      'Overnight stay on Alleppey houseboat',
      'Munnar rolling green tea garden walk',
      'Kathakali cultural traditional dance show',
      'Periyar tiger reserve boat safari walk',
      'Ayurvedic oil full-body massage therapy'
    ],
    tips: [
      'Book a private deluxe air-conditioned houseboat.',
      'Carry loose light cotton clothes and sandals.',
      'Try Toddy (local palm sap drink) with Karimeen curry.'
    ],
    accommodationOptions: [
      {
        name: 'Kumarakom Lake Resort Villa',
        area: 'Vembanad Lake, Kumarakom',
        priceRange: '$$$$',
        rating: 4.8,
        type: 'Luxury Lake Resort',
        amenities: ['Infinity lake pool', 'Houseboat docks', 'Spas'],
        reason: 'Restored 16th-century heritage villas floating on lakeside shores.'
      }
    ],
    foodPlan: {
      breakfast: 'Fluffy appams with vegetable stew and coconut milk.',
      lunch: 'Traditional sadya meal served on banana leaves.',
      dinner: 'Karimeen fish curry baked in banana leaves.',
      mustTry: 'Banana chips fried in fresh coconut oil.'
    },
    transportationInfo: 'Private hire taxi cars for hills, wooden houseboats for canal transits.',
    stops: [
      {
        id: 'stop-ker-1',
        tripId: 'trip-kerala-2026',
        cityId: 'city-alleppey',
        arrival: '2026-09-20',
        departure: '2026-09-25',
        city: mockCities.find(c => c.id === 'city-alleppey'),
        description: 'Explore palm tree lakes, houseboat rides, spice gardens, and spas.',
        thingsToSee: ['Vembanad Lake backwaters', 'Spice plantations', 'Chinese Fishing nets'],
        recommendedArrival: '12:00 PM',
        travelTimeToNext: '1.5 Hours',
        transportMethod: 'Houseboat',
        estimatedCost: 100,
        activities: [
          {
            id: 'trip-act-ker-1',
            stopId: 'stop-ker-1',
            activityId: 'act-houseboat-safari',
            scheduledAt: '2026-09-21T12:00:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-houseboat-safari')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-kerala-2026',
      tripId: 'trip-kerala-2026',
      totalLimit: 900,
      expenses: [
        {
          id: 'exp-ker-1',
          budgetId: 'budget-kerala-2026',
          title: 'Kumarakom Pool Villa stay',
          amount: 550,
          category: 'Accommodation',
          date: '2026-09-20'
        },
        {
          id: 'exp-ker-2',
          budgetId: 'budget-kerala-2026',
          title: 'Ayurvedic Massage Treatment',
          amount: 40,
          category: 'Activities',
          date: '2026-09-22'
        }
      ]
    }
  },

  // Trip 12: Rome Historic Journey
  {
    id: 'trip-rome-2026',
    userId: 'user-123',
    name: 'Rome Historic Journey',
    startDate: '2026-04-12',
    endDate: '2026-04-17',
    createdAt: '2026-08-22T12:00:00.000Z',
    updatedAt: '2026-08-22T12:00:00.000Z',
    description: 'Walk through the historical ruins of Roman antiquity.',
    fullDescription: 'Discover the Colosseum arena, Vatican art collection galleries, and dine at classic outdoor piazzas.',
    category: 'Culture & History',
    travelStyle: 'Historic Walk',
    difficulty: 'Easy',
    bestSeason: 'Spring (April - June)',
    highlights: [
      'Gladiator arena Colosseum tour walk',
      'Vatican Chapel skip-the-line gallery',
      'Piazza Navona gelato tasting crawl',
      'Roman pizza wood-fired making class',
      'Coins toss at Trevi fountain pools'
    ],
    tips: [
      'Roma Pass cards offer free transit and skip lines.',
      'Carry refillable water bottles for public fountains.',
      'Vatican visits require modest dress (cover shoulders/knees).'
    ],
    accommodationOptions: [
      {
        name: 'Singer Palace Boutique Hotel',
        area: 'Via del Corso, Rome',
        priceRange: '$$$$',
        rating: 4.8,
        type: 'Luxury Boutique Stay',
        amenities: ['Rooftop terrace dining', 'Spas', 'Champagne lounges'],
        reason: 'Restored Art Deco palace in the center of historic Rome.'
      }
    ],
    foodPlan: {
      breakfast: 'Creamy espresso and freshly baked cornetto at Sant\'Eustachio.',
      lunch: 'Rigatoni Carbonara pasta at Da Enzo al 29.',
      dinner: 'Thin-crust Roman pizza at Emma Pizza.',
      mustTry: 'Dark chocolate gelato from Giolitti.'
    },
    transportationInfo: 'Rome Metro subways, walking, and city bus transits.',
    stops: [
      {
        id: 'stop-rom-1',
        tripId: 'trip-rome-2026',
        cityId: 'city-rome',
        arrival: '2026-04-12',
        departure: '2026-04-17',
        city: mockCities[16],
        description: 'Explore Gladiator ruins, Vatican collections, fountains, and pizza bars.',
        thingsToSee: ['Colosseum', 'Vatican Museums', 'Trevi Fountain'],
        recommendedArrival: '02:00 PM',
        travelTimeToNext: '30 mins',
        transportMethod: 'Metro',
        estimatedCost: 180,
        activities: [
          {
            id: 'trip-act-rom-1',
            stopId: 'stop-rom-1',
            activityId: 'act-colosseum',
            scheduledAt: '2026-04-13T08:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-colosseum')
          },
          {
            id: 'trip-act-rom-2',
            stopId: 'stop-rom-1',
            activityId: 'act-gelato-making',
            scheduledAt: '2026-04-15T15:30:00.000Z',
            activity: mockActivities.find(a => a.id === 'act-gelato-making')
          }
        ]
      }
    ],
    budget: {
      id: 'budget-rome-2026',
      tripId: 'trip-rome-2026',
      totalLimit: 1800,
      expenses: [
        {
          id: 'exp-rom-1',
          budgetId: 'budget-rome-2026',
          title: 'Singer Palace rooftop stay',
          amount: 950,
          category: 'Accommodation',
          date: '2026-04-12'
        },
        {
          id: 'exp-rom-2',
          budgetId: 'budget-rome-2026',
          title: 'Colosseum Skip Line guide ticket',
          amount: 60,
          category: 'Activities',
          date: '2026-04-13'
        }
      ]
    }
  }
];
