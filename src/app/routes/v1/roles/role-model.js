const { Model } = require('objection')
const BaseModel = require('../../../db/base-model')
const CrudRepositoryBuilder = require('../../../db/crud-repo-builder')

class Role extends BaseModel(Model) {
  static get tableName () {
    return 'roles'
  }

  static get relationMappings () {
    // Importing models here is one way to avoid require loops.

    const UserModel = require('../users/user-model')
    const UserRoleModel = require('../users/userrole-model')

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel.model,
        join: {
          from: 'roles.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: UserRoleModel.model,
            from: 'userroles.roleId',
            to: 'userroles.userId'
          },
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = {
  ...CrudRepositoryBuilder(Role),
  findAll: (accountsFilter) => {
    const query = Role.query().debug().where('status', null)
    if (accountsFilter) {
      query.whereIn('belongsTo', accountsFilter)
    }
    return query
  }
  // findCreatedByUser: ({ userName }) => User.query().debug().where('status', null).where('createdBy', userName),
  // findByIds: (accountIdList) => User.query().debug().where('status', null).whereIn('id', accountIdList)
}
