// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { seedAdminUsers } from './seeders/seedAdminUser'
import { seedRoles } from './seeders/seedRoles'
import { seedPermissions } from './seeders/seedPermissions'
import { seedLanguages } from './seeders/seedLanguage'

// initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  // create two dummy articles
  await seedPermissions(prisma)
  await seedRoles(prisma)
  await seedAdminUsers(prisma)
  await seedLanguages(prisma)
}

// execute the main function
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect()
  })
