import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const city1 = await prisma.city.create({
    data: {
      name: 'Ahmedabad',
      country: 'India',
      activities: {
        create: [
          { name: 'Sabarmati Ashram', description: 'Historical site', cost: 0 },
          { name: 'Kankaria Lake', description: 'Popular lake front', cost: 50 },
        ],
      },
    },
  });

  const city2 = await prisma.city.create({
    data: {
      name: 'Paris',
      country: 'France',
      activities: {
        create: [
          { name: 'Eiffel Tower', description: 'Iconic monument', cost: 25 },
          { name: 'Louvre Museum', description: 'Art museum', cost: 20 },
        ],
      },
    },
  });

  console.log('Seeding completed!', { city1, city2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
