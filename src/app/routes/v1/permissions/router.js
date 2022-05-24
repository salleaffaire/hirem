module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const permissionValidator = require('./permission-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('permissionId', permissionValidator)

  router.get('/permissions', authHandler(authorizationHandler('hirem.permissions', 'r')), controller.listPermissions)
  // router.get('/accounts/:accountId/permissions', authHandler(authorizationHandler('hirem.users', 'r')), controller.listAccountUsers)
  // router.get('/accounts/:accountId/permissions/:permissionId', authHandler(authorizationHandler('hirem.users', 'r')), controller.getUser)

  // router.post('/accounts/:accountId/permissions', authHandler(authorizationHandler('hirem.users', 'w')), controller.createUser)

  return router
}
