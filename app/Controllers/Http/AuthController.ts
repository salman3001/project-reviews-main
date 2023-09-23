import Hash from '@ioc:Adonis/Core/Hash'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async adminLogin({ auth, request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe')
    try {
      await auth.use('adminUserGuard').attempt(email, password, rememberMe)
    } catch (error) {
      session.flash('message', 'Invalid credentials')
      return response.redirect('back')
    }

    return response.redirect().toRoute('admin.dashboard')
  }

  public async adminLogout({ auth, response }: HttpContextContract) {
    await auth.use('adminUserGuard').logout(true)

    return response.redirect().toRoute('admin.login')
  }
}
