'use strict'
const requestContext = require('express-http-context')
const logger = require('../logger').child({ component: 'context-helper' })

const getUserName = () => {
  let user = requestContext.get('user')
  if (!user) {
    logger.warn('No user found in request context')
    user = {}
  }
  return user.userName
}

const getAccountName = () => {
  let account = requestContext.get('account')
  if (!account) {
    logger.warn('No account found in request context')
    account = {}
  }
  return account.id
}

module.exports = {
  getAccountName,
  getUserName
}
