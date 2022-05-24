const express = require('express')
const httpContext = require('express-http-context')
const { Model } = require('objection')

const AccountModel = require('./routes/v1/accounts/account-model')
const UserModel = require('./routes/v1/users/user-model')
const PermissionModel = require('./routes/v1/permissions/permission-model')
const RoleModel = require('./routes/v1/roles/role-model')

module.exports = ({ dbConnection, authHandler, errorHandler, defaultHandler }) => {
  const app = express()

  /* This is a preliminary implementation for api docs using openapiv2 and default spec
   * This could be enhanced later to use custom spec or upgraded to OAS3.
   * Docs are hosted at http://0.0.0.0:8080/api/v1/documentation/api-docs/
   */
  // expressOasGenerator.handleResponses(app, { swaggerUiServePath: 'api/v1/documentation/api-docs' })

  Model.knex(dbConnection)

  app.use(express.json())
  app.use(httpContext.middleware)

  // Set unique request identifier for each request
  // app.use([decorateRequest])
  // app.use(cors())

  // PostgreSQL backed routes
  app.use('/api/v1/', require('./routes/v1/accounts/router')({ model: AccountModel, authHandler }))
  app.use('/api/v1/', require('./routes/v1/users/router')({ model: UserModel, authHandler }))
  app.use('/api/v1/', require('./routes/v1/permissions/router')({ model: PermissionModel, authHandler }))
  app.use('/api/v1/', require('./routes/v1/roles/router')({ model: RoleModel, authHandler }))

  // expressOasGenerator.handleRequests(app)

  app.use(defaultHandler)
  app.use(errorHandler)

  return app
}
