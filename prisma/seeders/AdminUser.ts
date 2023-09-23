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
