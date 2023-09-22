import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import * as bcrypt from 'bcrypt'

const adminusers = [
  {
    id: 1,
    firstName: 'salman',
    lastName: 'khan',
    email: 'salman@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
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
          password: adminuser.password,
          roleId: adminuser.roleId,
          isActive: true,
        },
        create: {
          id: adminuser.id,
          email: adminuser.email,
          firstName: adminuser.firstName,
          lastName: adminuser.lastName,
          password: adminuser.password,
          roleId: adminuser.roleId,
          isActive: true,
        },
      })
    }
  }
}
