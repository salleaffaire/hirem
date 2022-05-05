
const requestContext = require('express-http-context')

module.exports = (req, user, permissions) => {
  req.user = user
  req.permissions = permissions
  requestContext.set('user', user)
  requestContext.set('permissions', permissions)
}
