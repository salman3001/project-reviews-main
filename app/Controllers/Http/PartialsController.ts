import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PartialsController {
  public getPartial({ params, view }: HttpContextContract) {
    const name = params.name
    switch (name) {
      case 'banUserForm':
        return view.render('partials/forms/banUserForm')
      case 'deleteAdminUserForm':
        return null

      default:
        break
    }
  }
}
