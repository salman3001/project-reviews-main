import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const permissions = [
  {
    id: 1,
    name: 'CREATE USER',
  },
  {
    id: 2,
    name: 'EDIT USER',
  },
  {
    id: 3,
    name: 'DELETE USER',
  },
]

export default class PermissionSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Write your database queries inside the run method
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i]
      await prisma.permission.upsert({
        where: { id: permission.id },
        update: { name: permission.name },
        create: { id: permission.id, name: permission.name },
      })
    }
  }
}
