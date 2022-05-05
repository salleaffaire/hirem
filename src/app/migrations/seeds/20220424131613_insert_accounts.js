const config = require('../migration-config')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex('accounts').insert([{
    id: config.superAccountId,
    name: 'Super Account',
    belongsTo: config.superAccountId,
    createdBy: config.knexUserId
  },
  // What is below is just for testing (will be deleted)
  {
    id: '723e7a68-78bf-466a-96f0-d67fcc7a187a',
    name: 'Secondary Super Account',
    belongsTo: '723e7a68-78bf-466a-96f0-d67fcc7a187a',
    createdBy: config.knexUserId
  }]
  )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

}
