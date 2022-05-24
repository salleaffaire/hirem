module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const accountValidator = require('../accounts/account-validator')
  const userValidator = require('./user-validator')
  const roleValidator = require('../roles/role-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('accountId', accountValidator)
  router.param('userId', userValidator)
  router.param('roleId', roleValidator)

  router.get('/users', authHandler(authorizationHandler('hirem.users', 'r')), controller.listUsers)
  router.get('/accounts/:accountId/users', authHandler(authorizationHandler('hirem.users', 'r')), controller.listAccountUsers)
  router.get('/accounts/:accountId/users/:userId', authHandler(authorizationHandler('hirem.users', 'r')), controller.getUser)
  router.get('/accounts/:accountId/users/:userId/roles', authHandler(authorizationHandler('hirem.users', 'r')), controller.listAccountUserRoles)

  router.post('/accounts/:accountId/users', authHandler(authorizationHandler('hirem.users', 'w')), controller.createUser)
  router.post('/accounts/:accountId/users/:userId/roles/:roleId', authHandler(authorizationHandler('hirem.users', 'w')), controller.addAccountUserRole)

  return router
}
