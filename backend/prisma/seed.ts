import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCities = [
  {
    name: 'Tokyo',
    country: 'Japan',
    activities: [
      { name: 'Senso-ji Temple', description: 'Culture: Historic Buddhist temple located in Asakusa with iconic giant red lantern', cost: 0 },
      { name: 'Shibuya Crossing & Hachiko Statue', description: 'Sightseeing: World-famous pedestrian scramble crossing and memorial statue', cost: 0 },
      { name: 'Tsukiji Outer Market Food Tour', description: 'Food: Fresh sashimi, wagyu skewers, and traditional street delicacies', cost: 40 },
      { name: 'Meiji Jingu Shrine', description: 'Culture: Shinto shrine dedicated to Emperor Meiji surrounded by tranquil forest', cost: 0 },
    ],
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    activities: [
      { name: 'Fushimi Inari-Taisha', description: 'Culture: Famous mountain trail lined with thousands of bright vermilion torii gates', cost: 0 },
      { name: 'Arashiyama Bamboo Grove', description: 'Nature: Soaring green bamboo stalks swaying peacefully in the wind', cost: 0 },
      { name: 'Kinkaku-ji Golden Pavilion', description: 'History: Zen Buddhist temple whose top two floors are completely covered in gold leaf', cost: 5 },
      { name: 'Gion District Geisha Walk', description: 'Culture: Historic district known for traditional wooden machiya merchant houses', cost: 0 },
    ],
  },
  {
    name: 'Osaka',
    country: 'Japan',
    activities: [
      { name: 'Dotonbori Food Walk', description: 'Food: Neon-lit entertainment district celebrated for takoyaki and okonomiyaki', cost: 15 },
      { name: 'Osaka Castle', description: 'History: Historic 16th-century landmark castle set inside an expansive park', cost: 6 },
      { name: 'Shinsekai District', description: 'Culture: Nostalgic neighborhood featuring Tsutenkaku Tower and kushikatsu stalls', cost: 0 },
    ],
  },
  {
    name: 'Paris',
    country: 'France',
    activities: [
      { name: 'Eiffel Tower Summit', description: 'Sightseeing: Iconic wrought-iron lattice tower offering panoramic views of Paris', cost: 30 },
      { name: 'Louvre Museum', description: 'Culture: World famous art museum housing the Mona Lisa and Venus de Milo', cost: 22 },
      { name: 'Montmartre & Sacré-Cœur', description: 'Culture: Bohemian hilltop neighborhood with street painters and stunning basilica', cost: 0 },
      { name: 'Seine River Cruise', description: 'Sightseeing: Scenic boat ride passing Notre-Dame, Musée d Orsay, and grand bridges', cost: 18 },
    ],
  },
  {
    name: 'London',
    country: 'United Kingdom',
    activities: [
      { name: 'British Museum', description: 'Culture: Vast global collection of historic antiquities including the Rosetta Stone', cost: 0 },
      { name: 'Tower of London & Crown Jewels', description: 'History: Royal fortress and former prison hosting the magnificent Crown Jewels', cost: 35 },
      { name: 'Hyde Park & Serpentine', description: 'Nature: Expansive royal park ideal for strolls, boating, and relaxation', cost: 0 },
      { name: 'Borough Market Culinary Tour', description: 'Food: Historic gourmet food market with artisanal breads, cheeses, and street food', cost: 20 },
    ],
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    activities: [
      { name: 'Gardens by the Bay & Supertree Grove', description: 'Nature: Futuristic botanical gardens with giant vertical gardens and conservatories', cost: 20 },
      { name: 'Marina Bay Sands SkyPark', description: 'Sightseeing: Cantilevered observation deck providing spectacular skyline panoramas', cost: 25 },
      { name: 'Chinatown & Maxwell Hawker Centre', description: 'Food: Renowned hawker food center famous for authentic Hainanese chicken rice', cost: 10 },
    ],
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    activities: [
      { name: 'Burj Khalifa Top Observation Deck', description: 'Sightseeing: Stand atop the tallest building on earth for sweeping desert views', cost: 45 },
      { name: 'Desert 4x4 Safari & Dune Bashing', description: 'Adventure: High-octane sand dune drive followed by traditional Bedouin camp dinner', cost: 65 },
      { name: 'Dubai Mall & Fountain Spectacle', description: 'Entertainment: Massive shopping complex with indoor waterfall and synchronized water show', cost: 0 },
    ],
  },
  {
    name: 'Mumbai',
    country: 'India',
    activities: [
      { name: 'Gateway of India', description: 'Sightseeing: Iconic 20th-century basalt arch monument overlooking Mumbai Harbour', cost: 0 },
      { name: 'Marine Drive Sunset Stroll', description: 'Sightseeing: Sweeping coastal promenade affectionately dubbed Queen s Necklace', cost: 0 },
      { name: 'Elephanta Caves Island Tour', description: 'History: Rock-cut cave temples dedicated to Shiva on Elephanta Island', cost: 10 },
      { name: 'Colaba Causeway Bazaar', description: 'Shopping: Lively shopping street lined with antiques, handicrafts, and cafes', cost: 0 },
    ],
  },
  {
    name: 'Delhi',
    country: 'India',
    activities: [
      { name: 'Red Fort Complex', description: 'History: Massive 17th-century Mughal red sandstone citadel and UNESCO site', cost: 5 },
      { name: 'Qutub Minar & Iron Pillar', description: 'History: 73-meter tall minaret and victory tower built in the 12th century', cost: 5 },
      { name: 'Chandni Chowk Old Delhi Walk', description: 'Food: Historic market lanes packed with traditional sweet shops and spice stalls', cost: 10 },
      { name: 'Lotus Temple', description: 'Culture: Baháʼí House of Worship celebrated for its flowerlike architectural design', cost: 0 },
    ],
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    activities: [
      { name: 'Basílica de la Sagrada Família', description: 'Culture: Masterpiece basilica designed by Antoni Gaudí with extraordinary stained glass', cost: 26 },
      { name: 'Park Güell', description: 'Culture: Colorful mosaic-covered architectural park perched over Barcelona', cost: 13 },
      { name: 'Gothic Quarter Walking Tour', description: 'History: Charming labyrinth of medieval alleyways, hidden plazas, and tapas bars', cost: 0 },
    ],
  },
  {
    name: 'Rome',
    country: 'Italy',
    activities: [
      { name: 'Colosseum & Roman Forum', description: 'History: Ancient gladiatorial arena and ruins of the heart of Roman civilization', cost: 18 },
      { name: 'Vatican Museums & Sistine Chapel', description: 'Culture: Renowned collection of classical sculptures and Michelangelo frescoes', cost: 25 },
      { name: 'Trevi Fountain & Spanish Steps', description: 'Sightseeing: Iconic Baroque landmark fountain where visitors toss coins for luck', cost: 0 },
    ],
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    activities: [
      { name: 'The Grand Palace & Emerald Buddha', description: 'Culture: Opulent complex of royal palaces and sacred temple of Wat Phra Kaew', cost: 15 },
      { name: 'Wat Arun (Temple of Dawn)', description: 'Culture: Riverside Buddhist temple with steep porcelain-decorated spires', cost: 3 },
      { name: 'Chatuchak Weekend Market', description: 'Shopping: One of the largest open-air markets in the world with 15,000+ stalls', cost: 0 },
    ],
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    activities: [
      { name: 'Sacred Monkey Forest Sanctuary', description: 'Nature: Lush rainforest sanctuary in Ubud inhabited by hundreds of grey macaques', cost: 6 },
      { name: 'Tanah Lot Sunset Temple', description: 'Culture: Ancient Hindu pilgrimage shrine perched dramatically on an offshore rock', cost: 4 },
      { name: 'Tegallalang Rice Terraces', description: 'Nature: Emerald-green terraced rice fields offering stunning valley vistas', cost: 2 },
    ],
  },
  {
    name: 'New York',
    country: 'United States',
    activities: [
      { name: 'Central Park Walk', description: 'Nature: 843-acre urban oasis featuring Bow Bridge, Bethesda Terrace, and lawns', cost: 0 },
      { name: 'Empire State Building Observatory', description: 'Sightseeing: Legendary 102-story Art Deco skyscraper with 360-degree city views', cost: 44 },
      { name: 'Metropolitan Museum of Art', description: 'Culture: World-class art museum spanning over 5,000 years of global human creativity', cost: 30 },
      { name: 'High Line Park', description: 'Sightseeing: Elevated rail line converted into a public park on Manhattan s West Side', cost: 0 },
    ],
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    activities: [
      { name: 'Rijksmuseum', description: 'Culture: Grand national museum housing Rembrandt s Night Watch and Vermeer art', cost: 23 },
      { name: 'Canal Cruise through UNESCO Ring', description: 'Sightseeing: Guided boat journey through historic 17th-century canal rings', cost: 18 },
      { name: 'Vondelpark Cycling & Walk', description: 'Nature: Famous public city park filled with cafes, ponds, and green paths', cost: 0 },
    ],
  },
  {
    name: 'Ahmedabad',
    country: 'India',
    activities: [
      { name: 'Sabarmati Ashram', description: 'History: Historic riverside ashram residence of Mahatma Gandhi and freedom struggle', cost: 0 },
      { name: 'Adalaj Stepwell', description: 'Culture: Intricately carved 15th-century five-story subterranean stepwell architecture', cost: 1 },
      { name: 'Manek Chowk Night Food Square', description: 'Food: Traditional bustling night street market with famous pav bhaji and desserts', cost: 5 },
      { name: 'Kankaria Lakefront', description: 'Entertainment: Circular lake featuring promenade, zoo, light shows, and gardens', cost: 1 },
    ],
  },
  {
    name: 'Jaipur',
    country: 'India',
    activities: [
      { name: 'Amer Fort', description: 'History: Majestic hilltop fort blending Hindu and Rajput architecture above Maota Lake', cost: 7 },
      { name: 'Hawa Mahal (Palace of Winds)', description: 'History: Five-story pink sandstone palace with 953 intricately carved jharokhas', cost: 3 },
      { name: 'City Palace Courtyards', description: 'Culture: Regal residence containing museums, courtyards, and royal attire exhibits', cost: 8 },
    ],
  },
  {
    name: 'Goa',
    country: 'India',
    activities: [
      { name: 'Baga & Calangute Beach', description: 'Entertainment: Bustling golden sandy beach known for water sports and seaside shacks', cost: 0 },
      { name: 'Basilica of Bom Jesus', description: 'History: UNESCO World Heritage baroque church holding mortal remains of St. Francis Xavier', cost: 0 },
      { name: 'Dudhsagar Waterfalls Trek', description: 'Adventure: Majestic four-tiered cascading waterfall located in Bhagwan Mahaveer Sanctuary', cost: 15 },
    ],
  },
];

async function main() {
  console.log('Seeding Discovery and GlobeTrotter data...');

  for (const cityData of seedCities) {
    let city = await prisma.city.findFirst({
      where: {
        name: cityData.name,
        country: cityData.country,
      },
    });

    if (!city) {
      console.log(`Creating city: ${cityData.name}, ${cityData.country}`);
      city = await prisma.city.create({
        data: {
          name: cityData.name,
          country: cityData.country,
        },
      });
    } else {
      console.log(`City ${cityData.name} already exists.`);
    }

    for (const activityData of cityData.activities) {
      const existingActivity = await prisma.activity.findFirst({
        where: {
          cityId: city.id,
          name: activityData.name,
        },
      });

      if (!existingActivity) {
        console.log(`  Creating activity: ${activityData.name}`);
        await prisma.activity.create({
          data: {
            ...activityData,
            cityId: city.id,
          },
        });
      } else {
        console.log(`  Activity ${activityData.name} already exists.`);
      }
    }
  }

  console.log('Discovery seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
