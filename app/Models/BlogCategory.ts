import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Blog from './Blog'

export default class BlogCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public languageId: string

  @column()
  public metaTitle: string

  @column()
  public metaKeywords: string

  @column()
  public metaDesc: string

  @manyToMany(() => Blog, { pivotTable: 'blog_categories_pivot' })
  public blogs: ManyToMany<typeof Blog>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
