import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminUser from 'App/Models/AdminUser'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AdminUser.create({
      firstName: 'salman',
      lastName: 'khan',
      email: 'salman@gmail.com',
      password: '123456789',
      phone: '9999999999',
      isActive: true,
    })
  }
}
