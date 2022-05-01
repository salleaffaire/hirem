'use strict'

// const { UnauthorizedError } = require('express-jwt')

const authorizationHandler = (resource, action, filter) => (req, res, next) => {
  console.log('authorizationHandler Called')
  const permissions = req.permissions.permissions
  console.log({ permissions })

  const filteredPermissions = permissions.filter(e => e.resource === resource && e.action === action)

  if (filteredPermissions.length !== 0) {
    // Here we have found the right resource
    // We then let the call go and setup the `req.filter` field depending on the scope
    console.log({ filteredPermissions })
    const scope = filteredPermissions[0].scope

    switch (scope) {
      case '*':
        req.belongsToFilter = undefined
        next()
        break
      case '@':
        req.belongsToFilter = [req.account.id]
        next()
        break
      case '#':
        req.belongsToFilter = [req.account.id]
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
