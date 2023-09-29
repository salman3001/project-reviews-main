import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import AdminUser from './AdminUser'
import Permission from './Permission'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @belongsTo(() => AdminUser, {
    foreignKey: 'adminUserId',
  })
  public AdminUser: BelongsTo<typeof AdminUser> | null

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column()
  public adminUserId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
