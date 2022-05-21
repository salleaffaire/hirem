
const checkJwt = require('./jwt')
const errorHandler = require('./error-handler')
const authConfig = require('../config').auth
const logger = require('../logger').child({ component: 'auth' })
const setHttpContext = require('./set-http-context')

const { passThroughPermissions } = require('./pass-through-authz')

if (!authConfig.enabled) {
  logger.warn('Using pass-through authentication handler!')
}

const passThroughAuthHandler = (req, res, next) => {
  // console.log('passThroughAuthHandler Called')
  // Fake AuthN/AuthZ
  setHttpContext(req,
    { userName: authConfig.testUserName, id: authConfig.testUserId }, // User
    { // Permissions
      accountId: authConfig.testAccountId,
      permissions: passThroughPermissions
    })

  next()
}

const accountInScope = (accountId, scopeList) => {
  if (scopeList !== undefined) {
    // If the accountId is not in the belongsToFilter
    if (!scopeList.find(e => e === accountId)) {
      return false
    }
  }
  return true
}

module.exports = {
  /*
  * requestHandler returns a chain of expressJS middlewares, so order is VERY important
  *  1) extract and validate JWT in request
  */
  requestHandler: (authFunction) => authConfig.enabled
    ? [checkJwt, authFunction]
    : [passThroughAuthHandler, authFunction],

  /*
  * "Global" error handler for Authentication/Authorization related errors
  */
  errorHandler,

  accountInScope
}
