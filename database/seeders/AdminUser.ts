import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminUser from 'App/Models/AdminUser'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const user = await AdminUser.updateOrCreate(
      { email: 'salman@gmail.com' },
      {
        firstName: 'salman',
        lastName: 'khan',
        email: 'salman@gmail.com',
        password: '123456789',
        phone: '9999999999',
        isActive: true,
      }
    )

    const role = await Role.find(1)

    if (role) user.related('role').save(role)
  }
}
