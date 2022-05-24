'use strict'

// const { uuidv4Schema, createAccountPermissionSchema } = require('../utils/validation')

const logger = require('../../../logger').child({ component: 'user-controller' })
// const validator = require('../utils/validation').validate

module.exports = PermissionModel => {
  /* Return all accounts user has permissions to access */
  const listPermissions = async (req, res, next) => {
    try {
      const permissionList = await PermissionModel.findAll(req.scopeList)

      res.json(permissionList)
    } catch (err) {
      logger.error('Error occurred while retrieving permission list account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const listAccountPermissions = async (req, res, next) => {
    logger.info('Received get request for user ', req.params)
    const { accountId } = req.params

    // If there is a belongsTo filter, make sure that the user scope
    // permits modifying the target account
    if (req.scopeList !== undefined) {
      // If the accountId is not in the scopeList
      if (!req.scopeList.find(e => e === accountId)) {
        logger.error(`User unauthorized in account ${accountId}`)
        return res.status(403).json({ error: 'Unauthorized' })
      }
    }

    try {
      const permissions = await PermissionModel.findByBelongsTo(accountId)
      console.log({ permissions })
      return res.status(200).json(permissions)
    } catch (err) {
      logger.error('Error occurred while getting permissions ', err)
      return res.status(500).json({ error: 'Unknown error' })
    }
  }

  // const getUser = async (req, res, next) => {
  //   logger.info('Received get request for user ', req.params)
  //   const { accountId, userId } = req.params

  //   // If there is a belongsTo filter, make sure that the user scope
  //   // permits modifying the target account
  //   if (req.scopeList !== undefined) {
  //     // If the accountId is not in the scopeList
  //     if (!req.scopeList.find(e => e === accountId)) {
  //       logger.error(`User unauthorized in account ${accountId}`)
  //       return res.status(403).json({ error: 'Unauthorized' })
  //     }
  //   }

  //   try {
  //     const user = await UserModel.findByIdBelongsTo(userId, accountId)
  //     console.log({ user })
  //     if (user.active) {
  //       return res.status(200).json(user)
  //     } else {
  //       return res.status(404).json({ error: 'No active user found' })
  //     }
  //   } catch (err) {
  //     logger.error('Error occurred while getting user ', err)
  //     return res.status(500).json({ error: 'Unknown error' })
  //   }
  // }

  // const createUser = async (req, res, next) => {
  //   logger.info('Received post request for user ', req.body)

  //   let { accountId } = req.params

  //   // Get override belongsTo, validate and replace accountId if present
  //   const overrideBelongsTo = req.query.overrideBelongsTo
  //   const resultQuery = validator(uuidv4Schema, overrideBelongsTo)

  //   accountId = overrideBelongsTo || accountId

  //   // Extract data from body and validate
  //   const { name, fullName, active } = req.body
  //   const resultBody = validator(createAccountUserSchema, req.body)

  //   // If there is a belongsTo filter, make sure that the user scope
  //   // permits modifying the target account
  //   if (req.scopeList !== undefined) {
  //     // If the accountId is not in the scopeList
  //     if (!req.scopeList.find(e => e === accountId)) {
  //       logger.error(`User unauthorized in account ${accountId}`)
  //       return res.status(403).json({ error: 'Unauthorized' })
  //     }
  //   }

  //   if (resultQuery) {
  //     res.status(400).json({ error: resultQuery })
  //   } else if (resultBody) {
  //     res.status(400).json({ error: resultBody })
  //   } else {
  //     try {
  //       const user = await UserModel.findByName(name)
  //       if (user) {
  //         const message = `User with name ${name} already exists in account ${accountId}`
  //         logger.error(message)
  //         res.status(409).json({ error: message })
  //       } else {
  //         console.log({ overrideBelongsTo })
  //         const createdUser = await UserModel.insert({
  //           name,
  //           fullName,
  //           active
  //         }, overrideBelongsTo)

  //         res.status(201).json(createdUser)
  //       }
  //     } catch (err) {
  //       logger.error('Error occurred while creating account ', err)
  //       res.status(500).json({ error: 'Unknown error' })
  //     }
  //   }
  //   next()
  // }

  return {
    listPermissions,
    listAccountPermissions
    // listAccountUsers,
    // createUser
  }
}
