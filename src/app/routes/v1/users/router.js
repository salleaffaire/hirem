module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const userValidator = require('./user-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('userId', userValidator)

  router.get('/users', authHandler(authorizationHandler('hirem.users', 'r')), controller.listUsers)
  router.get('/accounts/:accountId/users', authHandler(authorizationHandler('hirem.users', 'r')), controller.listAccountUsers)
  router.get('/accounts/:accountId/users/:userId', authHandler(authorizationHandler('hirem.users', 'r')), controller.getUser)

  router.post('/accounts/:accountId/users', authHandler(authorizationHandler('hirem.users', 'w')), controller.createUser)

  return router
}
