module.exports = ({ model, authHandler }) => {
  const router = require('express').Router()
  const controller = require('./controller')(model)
  const accountValidator = require('./account-validator')

  const { authorizationHandler } = require('../../../auth/authz/authz-handler')

  router.param('accountId', accountValidator)

  router.get('/accounts/:accountId', authHandler(authorizationHandler('hirem.accounts', 'r')), controller.getAccount)
  router.get('/accounts', authHandler(authorizationHandler('hirem.accounts', 'r')), controller.listAccounts)
  router.post('/accounts', authHandler(authorizationHandler('hirem.accounts', 'w')), controller.createAccount)
  router.post('/accounts/accountId', authHandler(authorizationHandler('hirem.accounts', 'w')), controller.createAccountsAccount)
  return router
}
