const config = require('../migration-config')

const permissions = [
  { id: '9fb3766d-a926-4efb-94bd-f8d4c205bfb0', resourceType: 'hirem.accounts', action: 'r', scope: '*' },
  { id: '11a41c91-6a8e-4e30-b7a3-bcc8ca9f9ff1', resourceType: 'hirem.accounts', action: 'w', scope: '*' },
  { id: '5e089287-a42f-42da-b7ea-c7d4a27c2ca7', resourceType: 'hirem.users', action: 'r', scope: '*' },
  { id: '48369ab7-edd6-4640-a7e3-84f6d8b3a904', resourceType: 'hirem.users', action: 'w', scope: '*' },
  { id: 'be763e2b-5f6c-4bf1-85b0-d178692020af', resourceType: 'hirem.permissions', action: 'r', scope: '*' },
  { id: '8bcce75b-1095-454f-96de-295789c67a6d', resourceType: 'hirem.permissions', action: 'w', scope: '*' },
  { id: 'a1e76553-064a-4166-9dcd-caac33269973', resourceType: 'hirem.roles', action: 'r', scope: '*' },
  { id: 'dbad074e-3e7c-4de3-80cb-e830562fb987', resourceType: 'hirem.roles', action: 'w', scope: '*' }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const permissionList = permissions.map(permission => ({ ...permission, belongsTo: config.superAccountId, createdBy: config.knexUserId }))

  return knex('permissions').insert(permissionList)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  const ids = permissions.map(permission => permission.id)
  return knex('permissions').whereIn('id', ids).delete()
}
