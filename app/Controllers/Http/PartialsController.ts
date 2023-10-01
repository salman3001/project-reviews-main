import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class PartialsController {
  public async getPartial({ params, view, request }: HttpContextContract) {
    const name = params.name
    switch (name) {
      case 'banUserForm':
        return view.render('partials/forms/banUserForm')
      case 'deleteAdminUserForm':
        return view.render('partials/forms/deleteAdminUserForm')
      case 'changeRoleForm':
        const roles = await Role.all()
        return view.render('partials/forms/changeRoleForm', {
          roles,
          currentRole: request.qs().currentRole,
        })

      default:
        break
    }
  }
}
