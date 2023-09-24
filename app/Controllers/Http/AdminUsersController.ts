import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { paginate } from 'App/Helpers/Paginate'

export default class AdminUsersController {
  public async index({ view, request }: HttpContextContract) {
    const query = request.qs()
    const page = Number(query.page) || 1
    const take = 3

    const users = await prisma.adminUser.findMany({
      skip: take * (page - 1),
      take,
    })

    const count = await prisma.adminUser.count({})
    const pagination = paginate(count, page, take, 'admin_users.index')

    const roles = await prisma.role.findMany()
    return view.render('admin/users', { users, roles, pagination })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
