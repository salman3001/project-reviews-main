import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blog_categories_pivot'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('blog_id').unsigned().references('id').inTable('blogs')
      table.integer('blog_category_id').unsigned().references('id').inTable('blog_categories')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
