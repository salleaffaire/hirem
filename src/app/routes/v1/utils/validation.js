'use strict'

const Joi = require('@hapi/joi')
const log = require('../../../logger')

const accountCreateSchema = Joi.object({
  name: Joi.string().required().max(64),
  active: Joi.boolean().strict()
}).required()

const createAccountUserSchema = Joi.object({
  name: Joi.string().required().max(64),
  fullName: Joi.string().required()
})

const updateAccountUserSchema = Joi.object({
  active: Joi.boolean().strict().required()
})

const createAccountRolePermissionSchema = Joi.object({
  resourceType: Joi.string().required().max(64),
  action: Joi.string().required().max(1).valid('r', 'w').insensitive(),
  scope: Joi.string().required().max(1).valid('@', '*', '+').insensitive(),
  level: Joi.number().required()
})

const uuidv4Schema = Joi.string().uuid({ version: 'uuidv4' })

const validate = function (schema, data) {
  const { error } = schema.validate(data)
  if (error) {
    const { details } = error
    const message = details.map(i => i.message).join(',')
    log.error('Input validation failed with error ', details)
    return message
  }
}

module.exports = {
  accountCreateSchema,
  createAccountUserSchema,
  updateAccountUserSchema,
  createAccountRolePermissionSchema,
  uuidv4Schema,

  validate
}
