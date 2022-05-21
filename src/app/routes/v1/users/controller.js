'use strict'

const { uuidv4Schema, createAccountUserSchema } = require('../utils/validation')

const logger = require('../../../logger').child({ component: 'user-controller' })
const validator = require('../utils/validation').validate

module.exports = UserModel => {
  /* Return all accounts user has permissions to access */
  const listUsers = async (req, res, next) => {
    try {
      const userList = await UserModel.findAll(req.belongsToFilter)

      res.json(userList)
    } catch (err) {
      logger.error('Error occurred while retrieving user list account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const listAccountUsers = async (req, res, next) => {
    logger.info('Received get request for user ', req.params)
    const { accountId } = req.params

    // If there is a belongsTo filter, make sure that the user scope
    // permits reading the target account
    console.log(req.belongsToFilter)
    req.belongsToFilter.find((e) => e === accountId)
    if (req.belongsToFilter !== undefined) {
      // If the accountId is not in the belongsToFilter
      if (!req.belongsToFilter.find(e => e === accountId)) {
        logger.error(`User unauthorized in account ${accountId}`)
        return res.status(403).json({ error: 'Unauthorized' })
      }
    }

    try {
      const users = await UserModel.findByBelongsTo(accountId)
      console.log({ users })
      return res.status(200).json(users)
    } catch (err) {
      logger.error('Error occurred while getting account ', err)
      return res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getUser = async (req, res, next) => {
    logger.info('Received get request for user ', req.params)
    const { accountId, userId } = req.params

    // If there is a belongsTo filter, make sure that the user scope
    // permits modifying the target account
    if (req.belongsToFilter !== undefined) {
      // If the accountId is not in the belongsToFilter
      if (!req.belongsToFilter.find(e => e === accountId)) {
        logger.error(`User unauthorized in account ${accountId}`)
        return res.status(403).json({ error: 'Unauthorized' })
      }
    }

    try {
      const user = await UserModel.findByIdBelongsTo(userId, accountId)
      console.log({ user })
      if (user.active) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({ error: 'No active user found' })
      }
    } catch (err) {
      logger.error('Error occurred while getting user ', err)
      return res.status(500).json({ error: 'Unknown error' })
    }
  }

  const createUser = async (req, res, next) => {
    logger.info('Received post request for user ', req.body)

    let { accountId } = req.params

    // Get override belongsTo, validate and replace accountId if present
    const overrideBelongsTo = req.query.overrideBelongsTo
    const resultQuery = validator(uuidv4Schema, overrideBelongsTo)

    accountId = overrideBelongsTo || accountId

    // Extract data from body and validate
    const { name, fullName, active } = req.body
    const resultBody = validator(createAccountUserSchema, req.body)

    // If there is a belongsTo filter, make sure that the user scope
    // permits modifying the target account
    if (req.belongsToFilter !== undefined) {
      // If the accountId is not in the belongsToFilter
      if (!req.belongsToFilter.find(e => e === accountId)) {
        logger.error(`User unauthorized in account ${accountId}`)
        return res.status(403).json({ error: 'Unauthorized' })
      }
    }

    if (resultQuery) {
      res.status(400).json({ error: resultQuery })
    } else if (resultBody) {
      res.status(400).json({ error: resultBody })
    } else {
      try {
        const user = await UserModel.findByName(name)
        if (user) {
          const message = `User with name ${name} already exists in account ${accountId}`
          logger.error(message)
          res.status(409).json({ error: message })
        } else {
          console.log({ overrideBelongsTo })
          const createdUser = await UserModel.insert({
            name,
            fullName,
            active
          }, overrideBelongsTo)

          res.status(201).json(createdUser)
        }
      } catch (err) {
        logger.error('Error occurred while creating account ', err)
        res.status(500).json({ error: 'Unknown error' })
      }
    }
    next()
  }

  return {
    listUsers,
    getUser,
    listAccountUsers,
    createUser
  }
}
