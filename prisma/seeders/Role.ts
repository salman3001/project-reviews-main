import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const roles = [
  {
    id: 1,
    name: 'Super Admin',
  },
  {
    id: 2,
    name: 'Vender',
  },
  {
    id: 3,
    name: 'Member',
  },
  {
    id: 3,
    name: 'Moderator',
  },
]

export default class RoleSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Write your database queries inside the run method
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i]
      await prisma.role.upsert({
        where: {
          id: role.id,
        },
        update: {
          name: role.name,
        },
        create: {
          id: role.id,
          name: role.name,
        },
      })
    }

    const permission = await prisma.permission.findMany({
      select: { id: true },
    })

    await prisma.role.update({
      where: { id: 1 },
      data: {
        permissions: { set: [] },
      },
    })

    await prisma.role.update({
      where: { id: 1 },
      data: {
        permissions: { set: permission },
      },
    })
  }
}
