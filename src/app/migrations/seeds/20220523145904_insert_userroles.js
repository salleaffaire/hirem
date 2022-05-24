
const config = require('../migration-config')

const userroles = [
  {
    id: 'e83ae6e3-0f9f-4d03-82f6-3b4e523843d4',
    userId: config.superUserId,
    roleId: 'e83ae6e3-0f9f-4d03-82f6-3b4e523843d4'
  }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const userroleList = userroles.map(userrole => ({ ...userrole, createdBy: config.knexUserId }))

  return knex('userroles').insert(userroleList)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  const ids = userroles.map(role => role.id)
  return knex('userroles').whereIn('id', ids).delete()
}
