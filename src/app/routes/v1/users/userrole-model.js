const { Model } = require('objection')
const BaseModel = require('../../../db/base-model')
const CrudRepositoryBuilder = require('../../../db/crud-repo-builder')

class UserRole extends BaseModel(Model) {
  static get tableName () {
    return 'userroles'
  }
}

module.exports = {
  ...CrudRepositoryBuilder(UserRole),
  findAll: (accountsFilter) => {
    const query = UserRole.query().debug().where('status', null)
    if (accountsFilter) {
      query.whereIn('belongsTo', accountsFilter)
    }
    return query
  }
  // findCreatedByUser: ({ userName }) => User.query().debug().where('status', null).where('createdBy', userName),
  // findByIds: (accountIdList) => User.query().debug().where('status', null).whereIn('id', accountIdList)
}
