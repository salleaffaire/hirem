/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('full_name')
      table.boolean('active').defaultTo(true)
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false })
      table.string('created_by')
      table.string('updated_by')
      table.string('status')
      table.uuid('belongs_to').notNullable()
      table.foreign('belongs_to').references('accounts.id')
      table.index('belongs_to')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
}
