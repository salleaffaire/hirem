module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const accountValidator = require('./account-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('accountId', accountValidator)

  router.get('/accounts/:accountId', authHandler(authorizationHandler('hirem.accounts', 'r', true)), controller.getAccount)
  router.get('/accounts', authHandler(authorizationHandler('hirem.accounts', 'r', true)), controller.listAccounts)
  router.post('/accounts', authHandler(authorizationHandler('hirem.accounts', 'w', false)), controller.createAccount)

  return router
}
