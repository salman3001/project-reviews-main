import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //protected routes
  Route.group(() => {
    Route.get('/dashboard', async ({ view }) => {
      return view.render('admin/dashboard')
    }).as('admin.dashboard')

    Route.get('logout', 'AuthController.adminLogout').as('admin.logout')

    Route.resource('admin-users', 'AdminUsersController')
    Route.get('admin-users/ban/:id', 'AdminUsersController.banUser').as('admin_users.ban')
    Route.get('admin-users/change-role/:id', 'AdminUsersController.changeRole').as(
      'admin_users.changerole'
    )
    Route.resource('roles', 'RolesController')
    Route.get('permissions', 'PermissiosnController.index').as('permissions.index')
  }).middleware('auth:webAdmin')

  //guest routes
  Route.group(() => {
    Route.get('login', async ({ view }) => {
      return view.render('admin/login')
    }).as('admin.login')

    Route.post('login', 'AuthController.adminLogin').as('admin.login.post')
  }).middleware('guest:webAdmin')
}).prefix('admin')
