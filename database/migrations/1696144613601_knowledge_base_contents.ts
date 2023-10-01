import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'knowledge_base_contents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').unique().notNullable()
      table.string('slug').unique().notNullable()
      table
        .integer('knowledge_base_category_id')
        .unsigned()
        .references('id')
        .inTable('knowledge_base_categories')
        .onDelete('SET NULL')

      table.integer('language_id').unsigned().references('id').inTable('languages')
      table.text('content')
      table.string('meta_title')
      table.string('meta_desc')
      table.string('meta_keywords')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['slug'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
