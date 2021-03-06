const { Model } = require('objection')
const BaseModel = require('../../../db/base-model')
const CrudRepositoryBuilder = require('../../../db/crud-repo-builder')

// const path = require('node:path')

// const RoleModel = require('../roles/role-model')

class User extends BaseModel(Model) {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    // Importing models here is one way to avoid require loops.

    const RoleModel = require('../roles/role-model')
    const UserRoleModel = require('./userrole-model')

    // console.log('Is RoleModel a subclass of Model ', User.prototype instanceof Model)

    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel.model,
        join: {
          from: 'users.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: UserRoleModel.model,
            from: 'userroles.userId',
            to: 'userroles.roleId'
          },
          to: 'roles.id'
        }
      }
    }
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
  },
  findRolesByAccountIdUserId: (accountId, userId) => User.relatedQuery('roles').debug().for(User.query().where({ id: userId, belongsTo: accountId }))
  // relateRoleIdtoAccountIdUserId: (accountId, userId, roleId) => {
  //   User.relatedQuery('roles')
  //     .debug()
  //     .for(User.query().where({ id: userId, belongsTo: accountId }))
  //     .relate(RoleModel.model.query().where({ id: roleId, belongsTo: accountId }))
  // }
  // findCreatedByUser: ({ userName }) => User.query().debug().where('status', null).where('createdBy', userName),
  // findByIds: (accountIdList) => User.query().debug().where('status', null).whereIn('id', accountIdList)
}
