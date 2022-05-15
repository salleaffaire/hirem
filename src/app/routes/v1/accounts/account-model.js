const { Model } = require('objection')
const BaseModel = require('../../../db/base-model')
const CrudRepositoryBuilder = require('../../../db/crud-repo-builder')

class Account extends BaseModel(Model) {
  static get tableName () {
    return 'accounts'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(Account),
  findAll: (accountsFilter) => {
    const query = Account.query().debug().where('status', null)
    if (accountsFilter) {
      query.whereIn('belongsTo', accountsFilter)
    }
    return query
  }
  // findCreatedByUser: ({ userName }) => Account.query().debug().where('status', null).where('createdBy', userName),
  // findByIds: (accountIdList) => Account.query().debug().where('status', null).whereIn('id', accountIdList)
}
