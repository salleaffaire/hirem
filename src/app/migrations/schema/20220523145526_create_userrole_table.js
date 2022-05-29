/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('userroles', table => {
      table.uuid('id').primary()
      table.string('status')

      table.uuid('user_id').notNullable()
      table.foreign('user_id').references('users.id')

      table.uuid('role_id').notNullable()
      table.foreign('role_id').references('roles.id')

      table.unique(['user_id', 'role_id'])

      // belongsTo is used as the parent/child relationship for accounts
      // table.uuid('belongs_to').notNullable()
      // table.foreign('belongs_to').references('accounts.id')
      // table.index('belongs_to')
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.string('created_by')
      table.string('updated_by')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('userroles')
}
