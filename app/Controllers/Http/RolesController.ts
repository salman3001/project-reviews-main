import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolesController {
  public async index({ view }: HttpContextContract) {
    const roles = await prisma.role.findMany({ include: { permissions: true } })
    return view.render('admin/roles/index', { roles })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const role = await prisma.role.findUnique({
      where: { id: Number(params.id) },
      include: { permissions: true },
    })

    const permissions = await prisma.permission.findMany()

    const rolePermissions = role ? role.permissions.map((p) => p.id) : []

    return view.render('admin/roles/edit', { role, permissions, rolePermissions })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const permissions = request.input('permissionId')
      ? request.input('permissionId').map((p: string) => ({
          id: Number(p),
        }))
      : []

    await prisma.role.update({
      where: { id: Number(params.id) },
      data: {
        permissions: { set: [] },
      },
    })

    await prisma.role.update({
      where: { id: Number(params.id) },
      data: {
        permissions: { connect: [...permissions] },
      },
    })

    session.flash('message', { type: 'success', title: 'Permissions updated !' })

    return response.redirect().toRoute('roles.index')
  }

  public async destroy({}: HttpContextContract) {}
}
