import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index({ view }: HttpContextContract) {
    const roles = await Role.query().preload('permissions')

    return view.render('admin/roles/index', { roles })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const role = await Role.query().where('id', +params.id).preload('permissions').first()

    const permissions = await Permission.all()

    const rolePermissions = role ? role.permissions.map((p) => p.id) : []

    return view.render('admin/roles/edit', { role, permissions, rolePermissions })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const permissions = request.input('permissionId')
      ? request.input('permissionId').map((p: string) => p)
      : []

    console.log(permissions)

    const role = await Role.findOrFail(+params.id)

    await role.related('permissions').detach()
    await role.related('permissions').attach([...permissions])

    session.flash('message', { type: 'success', title: 'Permissions updated !' })

    return response.redirect().toRoute('roles.index')
  }

  public async destroy({}: HttpContextContract) {}
}
