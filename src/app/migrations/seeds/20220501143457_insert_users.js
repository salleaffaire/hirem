const config = require('../migration-config')

const superAdmins = [
  { id: config.superUserId, userName: config.superUserName }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const userList = superAdmins.map(user => ({ ...user, belongsTo: config.superAccountId, createdBy: config.knexUserId }))

  return knex('users').insert(userList)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  const ids = superAdmins.map(user => user.id)
  return knex('users').whereIn('id', ids).delete()
}
