const config = require('../migration-config')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex('accounts').insert({
    id: config.MainAccountId,
    name: 'Main Account',
    belongsTo: config.MainAccountId,
    createdBy: config.knexUserId
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

}
