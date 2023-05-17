import { PrismaClient } from '@prisma/client';
import { RegionSeeder, RoleSeeder } from './seeders';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await new RoleSeeder().main();
  await new RegionSeeder().main();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
