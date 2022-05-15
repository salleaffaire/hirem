'use strict'
const UserModel = require('./user-model')
const log = require('../../../logger').child({ component: 'user-validator' })
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
    const user = await UserModel.findById(userId)
    if (!user) {
      log.warn('No user found with ID ', userId)
      return res.status(404).json({ error: `No data found for user id ${userId}` })
    }
    next()
  } catch (err) {
    log.error('Error while validating user id: ', err)
    res.sendStatus(500).json({ error: 'Unknown error' })
  }
}
