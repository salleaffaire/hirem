'use strict'
const RoleModel = require('./role-model')
const log = require('../../../logger').child({ component: 'role-validator' })
const Joi = require('@hapi/joi')

/* TODO:
  This is simple validator for :accountId parameter of API requests
  Later we might need to enhance/replace it with permission checking
  and make it application-global
  */
module.exports = async (req, res, next, roleId) => {
  const { error } = Joi.string().uuid().validate(roleId)

  if (error) {
    return res.status(422).json({ error: `Invalid UUID: ${roleId}` })
  }

  try {
    const role = await RoleModel.findById(roleId)
    if (!role) {
      log.warn('No role found with ID ', roleId)
      return res.status(404).json({ error: `No data found for role id ${roleId}` })
    }
    next()
  } catch (err) {
    log.error('Error while validating role id: ', err)
    res.sendStatus(500).json({ error: 'Unknown error' })
  }
}
