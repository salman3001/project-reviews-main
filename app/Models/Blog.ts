import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
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

  @manyToMany(() => BlogCategory, {
    pivotTable: 'blog_categories_pivot',
  })
  public category: ManyToMany<typeof BlogCategory>

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
