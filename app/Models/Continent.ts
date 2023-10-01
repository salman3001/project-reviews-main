import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Country from './Country'

export default class Continent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasOne(() => Country)
  public state: HasOne<typeof Country>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
