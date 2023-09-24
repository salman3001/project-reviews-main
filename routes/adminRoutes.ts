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

    Route.get('logout', 'AuthController.adminLogout').as('admin.logout')

    Route.resource('admin-users', 'AdminUsersController')
    Route.resource('roles', 'RolesController')
    Route.get('permissions', 'PermissiosnController.index').as('permissions.index')
  }).middleware('auth:adminUserGuard')

  //guest routes
  Route.group(() => {
    Route.get('login', async ({ view }) => {
      return view.render('admin/login')
    }).as('admin.login')

    Route.post('login', 'AuthController.adminLogin').as('admin.login.post')
  }).middleware('guest:adminUserGuard')
}).prefix('admin')
