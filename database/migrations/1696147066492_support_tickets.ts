import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TicketStatus } from 'App/Helpers/enums'

export default class extends BaseSchema {
  protected tableName = 'support_tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('subject').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')

      table.enum('status', Object.values(TicketStatus)).defaultTo('Open').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "support_ticket_status"')
    this.schema.dropTable(this.tableName)
  }
}
