'use strict'

const { uuidv4Schema, accountCreateSchema } = require('../utils/validation')

const logger = require('../../../logger').child({ component: 'accounts-controller' })
// const  accountCreateSchema = require('../utils/validation').accountCreateSchema
const validator = require('../utils/validation').validate

module.exports = AccountModel => {
  // This function should return the ids of the parents for each level
  // For example,
  // Level 0: returns the id of the current account, which is the account id itself.
  //
  const childrenAccounts = async (id, level) => {
    console.log(`ID: ${id}`)
    let accountListLevel = [id]

    let currentLevel = 0
    if (level === 0) {
      return accountListLevel
    }

    const accountList = [{ id }]
    while (currentLevel < level) {
      console.log(`Finding children of level ${currentLevel} : ${id}`)

      const accountForLevel = []
      for (let i = 0; i < accountListLevel.length; i++) {
        const accounts = await AccountModel.findByBelongsTo(accountListLevel[i])
        console.log({ accounts })
        // Push in the current level list
        accountForLevel.push(...accounts)
        // Push in the big list
        accountList.push(...accounts)
      }
      accountListLevel = accountForLevel.map(e => { return e.id }).filter(e => e !== id)
      console.log({ accountListLevel })

      currentLevel = currentLevel + 1
    }

    console.log()

    return accountList.map(e => { return e.id })
  }

  /* Return all accounts user has permissions to access */
  const listAccounts = async (req, res, next) => {
    try {
      const accountList = await AccountModel.findAll(req.belongsToFilter)

      res.json(accountList)
    } catch (err) {
      logger.error('Error occurred while retrieving account list account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const getAccount = async (req, res, next) => {
    logger.info('Received get request for account ', req.params)
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
      const account = await AccountModel.findById(accountId)
      if (account.active) {
        return res.status(200).json(account)
      } else {
        return res.status(404).json({ error: 'No active account found' })
      }
    } catch (err) {
      logger.error('Error occurred while getting account ', err)
      res.status(500).json({ error: 'Unknown error' })
    }
  }

  const createAccount = async (req, res, next) => {
    logger.info('Received post request for account ', req.body)

    const overrideBelongsTo = req.query.overrideBelongsTo
    const resultQuery = validator(uuidv4Schema, overrideBelongsTo)
    const { name, active } = req.body
    const resultBody = validator(accountCreateSchema, req.body)

    if (resultQuery) {
      res.status(400).json({ error: resultQuery })
    } else if (resultBody) {
      res.status(400).json({ error: resultBody })
    } else {
      try {
        const account = await AccountModel.findByName(name)
        if (account) {
          const message = `Account with name ${name} already exists`
          logger.error(message)
          res.status(409).json({ error: message })
        } else {
          console.log({ overrideBelongsTo })
          if (overrideBelongsTo) {
            if (req.belongsToFilter.includes(overrideBelongsTo)) {
              const createdAccount = await AccountModel.insert({
                name,
                active
              }, overrideBelongsTo)
              res.status(201).json(createdAccount)
            } else {
              res.status(403).json({ error: `no permissions to override account ${overrideBelongsTo}` })
            }
          } else {
            const createdAccount = await AccountModel.insert({
              name,
              active
            }, overrideBelongsTo)
            res.status(201).json(createdAccount)
          }
        }
      } catch (err) {
        logger.error('Error occurred while creating account ', err)
        res.status(500).json({ error: 'Unknown error' })
      }
    }
    next()
  }

  return {
    listAccounts,
    getAccount,
    createAccount,
    childrenAccounts
  }
}
