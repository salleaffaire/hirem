'use strict'
const PermissionModel = require('./permission-model')
const log = require('../../../logger').child({ component: 'permission-validator' })
const Joi = require('@hapi/joi')

/* TODO:
  This is simple validator for :accountId parameter of API requests
  Later we might need to enhance/replace it with permission checking
  and make it application-global
  */
module.exports = async (req, res, next, userId) => {
  const { error } = Joi.string().uuid().validate(userId)

  if (error) {
    return res.status(422).json({ error: `Invalid UUID: ${userId}` })
  }

  try {
    const permission = await PermissionModel.findById(userId)
    if (!permission) {
      log.warn('No permission found with ID ', userId)
      return res.status(404).json({ error: `No data found for permission id ${userId}` })
    }
    next()
  } catch (err) {
    log.error('Error while validating permission id: ', err)
    res.sendStatus(500).json({ error: 'Unknown error' })
  }
}
