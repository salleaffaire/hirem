'use strict'

// const { uuidv4Schema, createAccountUserSchema } = require('../utils/validation')

const logger = require('../../../logger').child({ component: 'user-controller' })
// const accountCreateSchema = require('../utils/validation').accountCreateSchema
// const validator = require('../utils/validation').validate

module.exports = UserModel => {
  /* Return all accounts user has permissions to access */
  const listUsers = async (req, res, next) => {
    try {
      const accountList = await UserModel.findAll(req.belongsToFilter)

      res.json(accountList)
    } catch (err) {
      logger.error('Error occurred while retrieving account list account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  // const getAccount = async (req, res, next) => {
  //   logger.info('Received get request for account ', req.params)
  //   const { accountId } = req.params

  //   try {
  //     const account = await AccountModel.findById(accountId)
  //     if (account.active) {
  //       return res.status(200).json(account)
  //     } else {
  //       return res.status(404).json({ error: 'No active account found' })
  //     }
  //   } catch (err) {
  //     logger.error('Error occurred while getting account ', err)
  //     res.status(500).json({ error: 'Unknown error' })
  //   }
  // }

  // const createAccount = async (req, res, next) => {
  //   logger.info('Received post request for account ', req.body)

  //   const overrideBelongsTo = req.query.overrideBelongsTo
  //   const resultQuery = validator(uuidv4Schema, overrideBelongsTo)
  //   const { name, active } = req.body
  //   const resultBody = validator(accountCreateSchema, req.body)

  //   if (resultQuery) {
  //     res.status(400).json({ error: resultQuery })
  //   } else if (resultBody) {
  //     res.status(400).json({ error: resultBody })
  //   } else {
  //     try {
  //       const account = await AccountModel.findByName(name)
  //       if (account) {
  //         const message = `Account with name ${name} already exists`
  //         logger.error(message)
  //         res.status(409).json({ error: message })
  //       } else {
  //         console.log({ overrideBelongsTo })
  //         const createdAccount = await AccountModel.insert({
  //           name,
  //           active
  //         }, overrideBelongsTo)

  //         res.status(201).json(createdAccount)
  //       }
  //     } catch (err) {
  //       logger.error('Error occurred while creating account ', err)
  //       res.status(500).json({ error: 'Unknown error' })
  //     }
  //   }
  //   next()
  // }

  return {
    listUsers
    // getAccount,
    // createAccount,
    // childrenAccounts
  }
}
