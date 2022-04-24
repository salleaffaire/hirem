const express = require('express')
const httpContext = require('express-http-context')
const { Model } = require('objection')

const Account = require('./routes/v1/accounts/account-model')

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
  app.use('/api/v1/', require('./routes/v1/accounts/router')({ model: Account, authHandler }))
  // app.use('/api/v1/', require('./routes/v1/users/router')({ model: UserModel, authHandler }))

  // expressOasGenerator.handleRequests(app)

  app.use(defaultHandler)
  app.use(errorHandler)

  return app
}
