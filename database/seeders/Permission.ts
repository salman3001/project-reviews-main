import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Permission.updateOrCreate(
      {
        id: 1,
      },
      {
        id: 1,
        name: 'Create Admin User',
      }
    )

    await Permission.updateOrCreate(
      {
        id: 2,
      },
      {
        id: 2,
        name: 'View Admin User',
      }
    )

    await Permission.updateOrCreate(
      {
        id: 3,
      },
      {
        id: 3,
        name: 'Edit Admin User',
      }
    )

    await Permission.updateOrCreate(
      {
        id: 4,
      },
      {
        id: 4,
        name: 'Delete Admin User',
      }
    )
  }
}
