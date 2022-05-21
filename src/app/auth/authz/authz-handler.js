'use strict'

// const { UnauthorizedError } = require('express-jwt')

const AccountModel = require('../../routes/v1/accounts/account-model')
const AccountController = require('../../routes/v1/accounts/controller')(AccountModel)

// function sleep (ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }

const authorizationHandler = (resource, action) => async (req, res, next) => {
  console.log('authorizationHandler Called')
  console.log('User\'s full permissions')
  const permissionsObject = req.permissions
  const permissions = permissionsObject.permissions
  console.log(permissionsObject)

  const filteredPermissions = permissions.filter(e => e.resource === resource && e.action === action)

  if (filteredPermissions.length !== 0) {
    // Here we have found the right resource
    // We then let the call go and setup the `req.filter` field depending on the scope
    console.log('User\'s necessary permissions to perform the operation')
    console.log({ filteredPermissions })
    const scope = filteredPermissions[0].scope
    const level = filteredPermissions[0].level

    switch (scope) {
      case '*':
        req.scopeList = undefined
        next()
        break
      case '@':
        req.scopeList = [req.permissions.accountId]
        next()
        break
      case '#':
        req.scopeList = await AccountController.childrenAccounts(req.permissions.accountId, level)
        console.log('req.scopeList')
        console.log(req.scopeList)
        next()
        break
      default:
        next({ status: 403, message: 'Unauthorized' })
    }
  } else {
    // Send very simplistic 'Unauthorized' message
    next({ status: 403, message: 'Unauthorized' })
  }
}

module.exports = {
  authorizationHandler
}
