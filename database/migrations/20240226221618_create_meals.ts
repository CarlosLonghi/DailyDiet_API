import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').notNullable()
    table.string('name', 100).notNullable()
    table.text('description').notNullable()
    table.string('date', 100).notNullable()
    table.string('hour', 100).notNullable()
    table.enu('diet_compliant', ['yes', 'no']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
