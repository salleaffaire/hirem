
const requestContext = require('express-http-context')

module.exports = (req, user, account, permissions) => {
  req.user = user
  req.account = account
  req.permissions = permissions
  requestContext.set('user', user)
  requestContext.set('account', account)
  requestContext.set('permissions', permissions)
}
