'use strict'

const testAccountId = require('./migrations/migration-config').MainAccountId

const config = module.exports

config.express = {
  port: process.env.EXPRESS_PORT || 8080,
  ip: process.env.HOST || '0.0.0.0'
}

config.db = {
  client: 'pg',
  connection: {
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DB || 'postgres',
    timezone: 'UTC'
  },
  migrations: {
    /*
    * Directories are processed in aplphabetical order,
    * so make sure that data migrations follow schema
    */
    directory: ['./src/app/migrations/schema', './src/app/migrations/seeds/'],
    sortDirsSeparately: true
  },
  pool: {
    min: 2,
    max: 10
  }
}

config.logger = {
  label: process.env.LABEL || 'HiReM',
  logging: {
    level: process.env.LOG_LEVEL || 'debug', // debug, verbose, info, warn, error
    format: process.env.LOG_FORMAT || 'json' // text , json
  }
}

config.auth = {
  enabled: !process.env.AUTH_DISABLED,
  audience: process.env.AUTH_AUDIENCE || '',
  issuer: process.env.AUTH_ISSUER || 'acme.auth0.com',

  testUserName: process.env.AUTH_TEST_USER_NAME || 'test.user@acme.com',
  testUserId: process.env.AUTH_TEST_USER_ID || 'f405d0b1-9577-4f41-b6d6-6e4d88e68db7',
  testAccountName: process.env.AUTH_TEST_ACCOUNT_NAME || 'Test Account',
  testAccountId: process.env.AUTH_TEST_ACCOUNT_ID || testAccountId

}

config.oauth = {
  ims_clientId: process.env.AUTH0_IMS_CLIENT_ID,
  ims_clientSecret: process.env.AUTH0_IMS_CLIENT_SECRET,
  audience: process.env.OAUTH_AUDIENCE || 'https://acme.com',
  enabled: process.env.IRIS_ENABLED
}

config.environment = {
  type: process.env.ENV_TYPE || 'local'
}
