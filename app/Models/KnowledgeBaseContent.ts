import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import KnowledgeBaseCategory from './KnowledgeBaseCategory'

export default class KnowledgeBaseContent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  @column()
  public slug: string
  @column()
  public knowledgeBaseCategoryId: number

  @belongsTo(() => KnowledgeBaseCategory)
  public category: BelongsTo<typeof KnowledgeBaseCategory>

  @column()
  public languageId: number

  @column()
  public content: string

  @column()
  public metaTitle: string
  @column()
  public metaDesc: string
  @column()
  public metaKeywords: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
