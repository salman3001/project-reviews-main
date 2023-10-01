import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BlogCategory from './BlogCategory'

export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public categoryId: string

  @belongsTo(() => BlogCategory)
  public category: BelongsTo<typeof BlogCategory>

  @column()
  public languageId: string

  @column()
  public shortDesc: string

  @column()
  public longDesc: string

  @column()
  public metaTitle: string

  @column()
  public metaKeywords: string

  @column()
  public metaDesc: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
