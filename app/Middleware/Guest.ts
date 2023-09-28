import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    guardName: (keyof GuardsList)[]
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (await auth.use(guardName[0]).check()) {
      if (guardName[0] === 'webAdmin') {
        return response.redirect().toRoute('admin.dashboard')
      }
      if (guardName[0] === 'webUser') {
        return response.redirect().toRoute('home')
      }
    }
    await next()
  }
}
