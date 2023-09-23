import Hash from '@ioc:Adonis/Core/Hash'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async adminLogin({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe')

    await auth.use('adminUserGuard').attempt(email, password, rememberMe)

    return response.redirect().toRoute('admin.dashboard')
  }
}
