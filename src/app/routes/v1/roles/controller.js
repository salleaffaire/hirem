'use strict'

// const { uuidv4Schema, createAccountUserSchema } = require('../utils/validation')

const logger = require('../../../logger').child({ component: 'role-controller' })
// const validator = require('../utils/validation').validate

const { accountInScope } = require('../../../auth')

module.exports = RoleModel => {
  /* Return all accounts user has permissions to access */
  const listRoles = async (req, res, next) => {
    try {
      const userList = await RoleModel.findAll(req.scopeList)

      res.json(userList)
    } catch (err) {
      logger.error('Error occurred while retrieving user list account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const listAccountRoles = async (req, res, next) => {
    logger.info('Received get request for roles ', req.params)
    const { accountId } = req.params

    // If there is a belongsTo filter, make sure that the user scope
    // permits reading the target account
    if (!accountInScope(accountId, req.scopeList)) {
      logger.error(`User unauthorized in account ${accountId}`)
      return res.status(403).json({ error: 'Unauthorized' })
    }

    try {
      const roles = await RoleModel.findByBelongsTo(accountId)
      console.log({ roles })
      return res.status(200).json(roles)
    } catch (err) {
      logger.error('Error occurred while getting roles ', err)
      return res.status(500).json({ error: 'Unknown error' })
    }
  }

  // // -------------------------------------------------------------------------------
  // // ROLE BIDING (Link a role to a user)
  // // -------------------------------------------------------------------------------
  // const addAccountUserRole = async (req, res, next) => {
  //   logger.info('Received post request for account user roles', req.params)
  //   const { accountId, userId, roleId } = req.params

  //   // If there is a belongsTo filter, make sure that the user scope
  //   // permits reading the target account
  //   if (!accountInScope(accountId, req.scopeList)) {
  //     logger.error(`User unauthorized in account ${accountId}`)
  //     return res.status(403).json({ error: 'Unauthorized' })
  //   }

  //   // Test that userId is in accountId
  //   const user = await UserModel.findByIdBelongsTo(userId, accountId)
  //   if (!user) {
  //     logger.error(`User ${userId} is not in account ${accountId}`)
  //     return res.status(412).json({ error: `User ${userId} is not in account ${accountId}` })
  //   }

  //   // Test that roleId is in accountId

  //   // Test that userId has the permission to bind roleId

  //   try {
  //     const roles = await UserModel.relate(userId, roleId, 'roles')
  //     return res.status(201).json(roles)
  //   } catch (err) {
  //     logger.error('Error occurred while assigning role to user ', err)
  //     return res.status(500).json({ error: 'Unknown error' })
  //   }
  // }
  // // -------------------------------------------------------------------------------

  // // -------------------------------------------------------------------------------
  // // ROLE UN-BIDING (Link a role to a user)
  // // -------------------------------------------------------------------------------
  // const deleteAccountUserRole = async (req, res, next) => {
  //   logger.info('Received delete request for account user roles', req.params)
  //   const { accountId, userId, roleId } = req.params

  //   // If there is a belongsTo filter, make sure that the user scope
  //   // permits reading the target account
  //   if (!accountInScope(accountId, req.scopeList)) {
  //     logger.error(`User unauthorized in account ${accountId}`)
  //     return res.status(403).json({ error: 'Unauthorized' })
  //   }

  //   // Test that userId is in accountId
  //   const user = await UserModel.findByIdBelongsTo(userId, accountId)
  //   if (!user) {
  //     logger.error(`User ${userId} is not in account ${accountId}`)
  //     return res.status(412).json({ error: `User ${userId} is not in account ${accountId}` })
  //   }

  //   // Test that roleId is in accountId

  //   // Test that userId has the permission to bind roleId

  //   try {
  //     const roles = await UserModel.unrelate(userId, roleId, 'roles', 'roleId')
  //     return res.status(201).json(roles)
  //   } catch (err) {
  //     logger.error('Error occurred while deleting role from user ', err)
  //     return res.status(500).json({ error: 'Unknown error' })
  //   }
  // }
  // // -------------------------------------------------------------------------------

  const getRole = async (req, res, next) => {
    logger.info('Received get request for user ', req.params)
    const { accountId, roleId } = req.params

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
      const role = await RoleModel.findByIdBelongsTo(roleId, accountId)
      if (role.active) {
        return res.status(200).json(role)
      } else {
        return res.status(404).json({ error: 'No active role found' })
      }
    } catch (err) {
      logger.error('Error occurred while getting role ', err)
      return res.status(500).json({ error: 'Unknown error' })
    }
  }

  // const createUser = async (req, res, next) => {
  //   logger.info('Received post request for user ', req.body)

  //   const { accountId } = req.params

  //   const resultQuery = validator(uuidv4Schema, accountId)

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
  //       const user = await UserModel.findByNameBelongsTo(name, accountId)
  //       if (user) {
  //         const message = `User with name ${name} already exists in account ${accountId}`
  //         logger.error(message)
  //         res.status(409).json({ error: message })
  //       } else {
  //         const createdUser = await UserModel.insert({
  //           name,
  //           fullName,
  //           active
  //         }, accountId)

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
    listRoles,
    getRole,
    listAccountRoles
    // listAccountUserRoles,
    // createUser
  }
}
