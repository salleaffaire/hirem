
const checkJwt = require('./jwt')
const errorHandler = require('./error-handler')
const authConfig = require('../config').auth
const logger = require('../logger').child({ component: 'auth' })
const setHttpContext = require('./set-http-context')

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
      permissions: [
        {
          resource: 'hirem.accounts',
          action: 'r',
          scope: '#',
          level: 1
        },
        {
          resource: 'hirem.accounts',
          action: 'w',
          scope: '#',
          level: 1
        },
        {
          resource: 'hirem.users',
          action: 'r',
          scope: '*',
          level: 1
        },
        {
          resource: 'hirem.users',
          action: 'w',
          scope: '*',
          level: 1
        }
      ]
    })

  next()
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
  errorHandler
}
