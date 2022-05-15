const { Model } = require('objection')
const BaseModel = require('../../../db/base-model')
const CrudRepositoryBuilder = require('../../../db/crud-repo-builder')

class User extends BaseModel(Model) {
  static get tableName () {
    return 'users'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(User),
  findAll: (accountsFilter) => {
    const query = User.query().debug().where('status', null)
    if (accountsFilter) {
      query.whereIn('belongsTo', accountsFilter)
    }
    return query
  }
  // findCreatedByUser: ({ userName }) => User.query().debug().where('status', null).where('createdBy', userName),
  // findByIds: (accountIdList) => User.query().debug().where('status', null).whereIn('id', accountIdList)
}
