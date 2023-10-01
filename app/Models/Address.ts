import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Country from './Country'
import AdminUser from './AdminUser'
import State from './State'
import City from './City'
import Street from './Street'
import Continent from './Continent'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public adminUserId: number

  @belongsTo(() => AdminUser)
  public adminUser: BelongsTo<typeof AdminUser>

  @column()
  public continentId: number | null

  @belongsTo(() => Continent)
  public continent: BelongsTo<typeof Continent>

  @column()
  public countryId: number | null

  @belongsTo(() => Country)
  public country: BelongsTo<typeof Country>

  @column()
  public stateId: number

  @belongsTo(() => State)
  public state: BelongsTo<typeof State>

  @column()
  public cityId: number

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @column()
  public streetId: number

  @belongsTo(() => Street)
  public street: BelongsTo<typeof Street>

  @column()
  public zip: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
