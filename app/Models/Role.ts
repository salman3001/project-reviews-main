import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AdminUser from './AdminUser'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @belongsTo(() => AdminUser, {
    foreignKey: 'admin_user_id',
  })
  public AdminUser: BelongsTo<typeof AdminUser> | null

  @column()
  public adminUserId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
