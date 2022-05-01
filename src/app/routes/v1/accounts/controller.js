'use strict'

const logger = require('../../../logger').child({ component: 'accounts-controller' })
const accountCreateSchema = require('../utils/validation').accountCreateSchema
const validator = require('../utils/validation').validate

module.exports = AccountModel => {
  const childrenAccounts = async (id, level) => {
    let accountListLevel = [id]
    const accountList = []
    while (level >= 0) {
      // console.log(`level ${level} : ${id}`)

      const accountForLevel = []
      for (let i = 0; i < accountListLevel.length; i++) {
        const accounts = await AccountModel.findByBelongsTo(accountListLevel[i])
        // console.log({ accounts })
        // Push in the current level list
        accountForLevel.push(...accounts)
        // Push in the big list
        accountList.push(...accounts)
      }
      accountListLevel = accountForLevel.map(e => { return e.id }).filter(e => e !== id)

      level = level - 1
    }
    console.log({ accountList })
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

    const { name, active } = req.body
    const result = validator(accountCreateSchema, req.body)

    if (result) {
      res.status(400).json({ error: result })
    } else {
      try {
        const account = await AccountModel.findByName(name)
        if (account) {
          const message = `Account with name ${name} already exists`
          logger.error(message)
          res.status(409).json({ error: message })
        } else {
          const createdAccount = await AccountModel.insert({
            name,
            active
          })

          res.status(201).json(createdAccount)
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
