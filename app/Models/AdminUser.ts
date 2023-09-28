import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Image from './Image'
import Role from './Role'

export default class AdminUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phone: string

  @column()
  public desc: string

  @column()
  public isActive: boolean

  @hasOne(() => Role, {
    foreignKey: 'admin_user_id',
  })
  public role: HasOne<typeof Role>

  @hasOne(() => Image, {
    foreignKey: 'avatarId',
  })
  public avatar: HasOne<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(adminUser: AdminUser) {
    if (adminUser.$dirty.password) {
      adminUser.password = await Hash.make(adminUser.password)
    }
  }
}
