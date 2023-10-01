import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class KnowledgeBaseCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public language_id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public meta_title: string

  @column()
  public meta_desc: string

  @column()
  public meta_keywords: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
