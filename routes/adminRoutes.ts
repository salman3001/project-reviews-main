import { prisma } from '@ioc:Adonis/Addons/Prisma'
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //protected routes
  Route.group(() => {
    Route.get('/dashboard', async ({ view }) => {
      const users = await prisma.adminUser.findMany()
      return view.render('admin/dashboard', {
        users,
      })
    }).as('admin.dashboard')
  }).middleware('auth:adminUserGuard')

  //guest routes
  Route.group(() => {
    Route.get('login', async ({ view }) => {
      return view.render('admin/login')
    }).as('admin.login')

    Route.post('login', 'AuthController.adminLogin').as('admin.login.post')
  }).middleware('guest:adminUserGuard')
}).prefix('admin')
