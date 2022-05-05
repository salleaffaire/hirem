const config = require('../config')

module.exports = {
  knexUserId: 'knex-migration',
  superAccountId: config.auth.superUserAccount,
  superUserId: config.auth.superUserId,
  superUserName: config.auth.superUserName
}
