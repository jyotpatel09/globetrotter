import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  {
    name: 'Ahmedabad',
    country: 'India',
    activities: [
      { name: 'Sabarmati Ashram', description: 'Historical site and residence of Mahatma Gandhi', cost: 0 },
      { name: 'Kankaria Lake', description: 'Popular lake front with entertainment', cost: 50 },
      { name: 'Adalaj Stepwell', description: 'Intricately carved 5-story stepwell', cost: 25 },
      { name: 'Manek Chowk', description: 'Bustling night street food market', cost: 300 },
    ],
  },
  {
    name: 'Mumbai',
    country: 'India',
    activities: [
      { name: 'Gateway of India', description: 'Iconic monument overlooking the Arabian Sea', cost: 0 },
      { name: 'Marine Drive', description: 'Beautiful promenade for evening walks', cost: 0 },
      { name: 'Elephanta Caves', description: 'Ancient cave temples on an island', cost: 250 },
      { name: 'Colaba Causeway', description: 'Street shopping and bustling market', cost: 500 },
    ],
  },
  {
    name: 'Delhi',
    country: 'India',
    activities: [
      { name: 'Red Fort', description: 'Historic fort complex from Mughal era', cost: 35 },
      { name: 'Qutub Minar', description: 'Tallest brick minaret in the world', cost: 35 },
      { name: 'India Gate', description: 'War memorial located astride the Rajpath', cost: 0 },
      { name: 'Chandni Chowk', description: 'One of the oldest and busiest markets', cost: 100 },
      { name: 'Lotus Temple', description: 'Baháʼí House of Worship notable for its flowerlike shape', cost: 0 },
    ],
  },
  {
    name: 'Jaipur',
    country: 'India',
    activities: [
      { name: 'Amer Fort', description: 'Majestic fort situated on a hill', cost: 100 },
      { name: 'Hawa Mahal', description: 'Palace of Winds with red and pink sandstone', cost: 50 },
      { name: 'City Palace', description: 'Royal residence with courtyards and gardens', cost: 200 },
      { name: 'Jantar Mantar', description: 'Astronomical observation site', cost: 50 },
    ],
  },
  {
    name: 'Goa',
    country: 'India',
    activities: [
      { name: 'Baga Beach', description: 'Popular beach known for water sports and nightlife', cost: 0 },
      { name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage church', cost: 0 },
      { name: 'Dudhsagar Falls', description: 'Four-tiered waterfall on the Mandovi River', cost: 400 },
      { name: 'Fort Aguada', description: '17th-century Portuguese fort and lighthouse', cost: 25 },
    ],
  },
  {
    name: 'Bengaluru',
    country: 'India',
    activities: [
      { name: 'Lalbagh Botanical Garden', description: 'Historic garden with a glasshouse', cost: 20 },
      { name: 'Bangalore Palace', description: 'Tudor-style palace with elegant wood carvings', cost: 230 },
      { name: 'Cubbon Park', description: 'Landmark park in the heart of the city', cost: 0 },
      { name: 'Vidhana Soudha', description: 'Imposing state legislature building', cost: 0 },
    ],
  },
];

async function main() {
  console.log('Seeding data...');

  for (const cityData of seedData) {
    // Check if city exists by name and country
    let city = await prisma.city.findFirst({
      where: {
        name: cityData.name,
        country: cityData.country,
      },
    });

    if (!city) {
      console.log(`Creating city: ${cityData.name}`);
      city = await prisma.city.create({
        data: {
          name: cityData.name,
          country: cityData.country,
        },
      });
    } else {
      console.log(`City ${cityData.name} already exists.`);
    }

    // Seed activities for the city
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

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
