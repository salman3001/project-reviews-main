import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.updateOrCreate(
      { id: 1 },
      {
        id: 1,
        name: 'Super Admin',
      }
    ).then((role) => {
      ;[1, 2, 3, 4].forEach(async (perm) => {
        const permissionExist = await role
          .related('permissions')
          .query()
          .where('permission_id', perm)
          .first()
        if (!permissionExist) role.related('permissions').attach([perm])
      })
    })

    await Role.updateOrCreate(
      { id: 2 },
      {
        id: 2,
        name: 'Vender',
      }
    )

    await Role.updateOrCreate(
      { id: 3 },
      {
        id: 3,
        name: 'Moderator',
      }
    )
  }
}
