'use strict'

const { UnauthorizedError } = require('express-jwt')

const authorizationHandler = (permission) => (req, res, next) => {
  // console.log('authorizationHandler Called')
  // console.log(req.permissions.permissions)
  // console.log(permission)
  if (req.permissions.permissions.find(e => e === permission)) {
    next()
  } else {
    next(new UnauthorizedError('credentials_required', { message: 'Unauthorized' }))
  }
}

module.exports = {
  authorizationHandler
}
