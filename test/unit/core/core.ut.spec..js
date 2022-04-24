/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const expect = chai.expect

const DB = require('../mock/db')

describe('Test the tests', function () {
  it(' should just pass.', async function () {

  })

  it(' should return all accounts.', async function () {
    const accounts = await DB.getAccounts()
    expect(accounts).to.deep.equal(DB.testAccounts)
  })

  it(' should return 1 account.', async function () {
    const account = await DB.getAccountById(DB.testAccountA0Id)
    expect(account).to.deep.equal(DB.testAccounts[0])
  })

  it(' should return not return an invalid account and return null.', async function () {
    const account = await DB.getAccountById('Invalid Accout Id')
    expect(account).to.equal(null)
  })

  it(' should create a new root account.', async function () {
    const accounts = await DB.getAccounts()
    const testAccountName = 'New Account'
    const account = await DB.createAccount(testAccountName)
    const newAccounts = await DB.getAccounts()

    expect(newAccounts.length).to.equal(accounts.length)
    expect(account.id).to.equal(account.parent)
    expect(account.name).to.equal(testAccountName)
  })

  it(' should return the children account ids.', async function () {
    const accountIds = await DB.getChildrenAccounts(DB.testAccountA0Id, 0)

    expect(accountIds).to.deep.equal([
      DB.testAccountA1Id,
      DB.testAccountA2Id
    ])
  })
})
