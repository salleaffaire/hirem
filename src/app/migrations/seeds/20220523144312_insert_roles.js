
const config = require('../migration-config')

const roles = [
  { id: 'e83ae6e3-0f9f-4d03-82f6-3b4e523843d4', name: 'SuperUser' }]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const roleList = roles.map(role => ({ ...role, belongsTo: config.superAccountId, createdBy: config.knexUserId }))

  return knex('roles').insert(roleList)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  const ids = roles.map(role => role.id)
  return knex('roles').whereIn('id', ids).delete()
}
