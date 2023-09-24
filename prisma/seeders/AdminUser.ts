import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'

const adminusers = [
  {
    id: 1,
    firstName: 'salman',
    lastName: 'khan',
    email: 'salman@gmail.com',
    password: Hash.make('123456789'),
    roleId: 1,
    isActive: true,
  },
  {
    id: 2,
    firstName: 'rajeev',
    lastName: 'khan',
    email: 'rajeevn@gmail.com',
    password: Hash.make('123456789'),
    roleId: 2,
    isActive: true,
  },
  {
    id: 3,
    firstName: 'kajal',
    lastName: 'khan',
    email: 'kajal@gmail.com',
    password: Hash.make('123456789'),
    roleId: 2,
    isActive: true,
  },
  {
    id: 4,
    firstName: 'abhished',
    lastName: 'khan',
    email: 'abhishek@gmail.com',
    password: Hash.make('123456789'),
    roleId: 3,
    isActive: true,
  },
  {
    id: 5,
    firstName: 'rinku',
    lastName: 'khan',
    email: 'rinku@gmail.com',
    password: Hash.make('123456789'),
    roleId: 3,
    isActive: true,
  },
]

export default class AdminUserSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Write your database queries inside the run method
    for (let i = 0; i < adminusers.length; i++) {
      const adminuser = adminusers[i]

      await prisma.adminUser.upsert({
        where: { id: adminuser.id },
        update: {
          email: adminuser.email,
          firstName: adminuser.firstName,
          lastName: adminuser.lastName,
          password: await adminuser.password,
          roleId: adminuser.roleId,
          isActive: true,
        },
        create: {
          id: adminuser.id,
          email: adminuser.email,
          firstName: adminuser.firstName,
          lastName: adminuser.lastName,
          password: await adminuser.password,
          roleId: adminuser.roleId,
          isActive: true,
        },
      })
    }
  }
}
