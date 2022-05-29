module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const roleValidator = require('./role-validator')
  const accountValidator = require('../accounts/account-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('accountId', accountValidator)
  router.param('roleId', roleValidator)

  router.get('/roles', authHandler(authorizationHandler('hirem.roles', 'r')), controller.listRoles)
  router.get('/accounts/:accountId/roles', authHandler(authorizationHandler('hirem.roles', 'r')), controller.listAccountRoles)
  router.get('/accounts/:accountId/roles/:roleId', authHandler(authorizationHandler('hirem.roles', 'r')), controller.getRole)
  // router.get('/accounts/:accountId/roles/:rolesId/permissions', authHandler(authorizationHandler('hirem.roles', 'r')), controller.listAccountRolePermissions)

  // router.post('/accounts/:accountId/roles', authHandler(authorizationHandler('hirem.roles', 'w')), controller.createRole)
  // router.post('/accounts/:accountId/roles/:rolesId/permissions', authHandler(authorizationHandler('hirem.roles', 'w')), controller.createRolePermission)
  return router
}
