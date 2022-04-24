'use strist'

const { v4: uuidv4 } = require('uuid')

const testAccountA0Id = '4e054460-3e0b-45fb-a1f8-88eaa56365fa'
const testAccountA1Id = '44ad1af5-10d1-4d7b-a9d1-e95b4aef1c40'
const testAccountA2Id = 'abf6cb33-485b-46b8-843d-c578a55e1cb1'
const testAccountA3Id = '7025cd7b-9e7d-4f6b-ab14-515a2e0e9a83'

const testAccounts = [
  {
    id: testAccountA0Id,
    name: 'A0',
    parent: testAccountA0Id
  },
  {
    id: testAccountA1Id,
    name: 'AC1',
    parent: testAccountA0Id
  },
  {
    id: testAccountA2Id,
    name: 'AC2',
    parent: testAccountA0Id
  },
  {
    id: testAccountA3Id,
    name: 'AC3',
    parent: testAccountA2Id
  }
]

const testAccountParentChilds = [
  {
    id: 0,
    parent: testAccountA0Id,
    child: testAccountA1Id
  },
  {
    id: 1,
    parent: testAccountA0Id,
    child: testAccountA2Id
  },
  {
    id: 2,
    parent: testAccountA2Id,
    child: testAccountA3Id
  }
]

async function getAccounts () {
  return testAccounts
}

async function getAccountById (id) {
  const result = testAccounts.filter((e) => { return e.id === id })
  return result.length ? result[0] : null
}

async function getAccountParentChilds () {
  return testAccountParentChilds
}

async function getChildrenAccounts (id, level = 0) {
  const childrenAccountIds = (await getAccountParentChilds()).filter((e) => {
    return e.parent === id
  })
  return childrenAccountIds.map(e => e.child)
}

async function createAccount (name, parent) {
  const newId = uuidv4()
  const newAccount = {
    id: newId,
    name,
    parent: parent || newId
  }
  testAccounts.push(newAccount)
  return newAccount
}

module.exports = {
  getAccounts,
  getAccountById,
  createAccount,
  getAccountParentChilds,
  getChildrenAccounts,
  testAccounts,
  testAccountParentChilds,
  testAccountA0Id,
  testAccountA1Id,
  testAccountA2Id,
  testAccountA3Id
}
