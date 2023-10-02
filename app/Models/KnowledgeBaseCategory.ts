import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import KnowledgeBaseContent from './KnowledgeBaseContent'

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
  public metaTitle: string

  @column()
  public metaDesc: string

  @column()
  public metaKeywords: string

  @hasMany(() => KnowledgeBaseContent)
  public contents: HasMany<typeof KnowledgeBaseContent>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
