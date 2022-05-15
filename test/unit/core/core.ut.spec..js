/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const expect = chai.expect

const core = require('../../../src/core/core')

describe('Test the tests', function () {
  it(' should just pass.', async function () {

  })

  it(' should properly parse resource strings', async function () {
    const tests = [
      {
        name: 'with resource type',
        input: 'resourceType.resourceName:r.@.0',
        expected: {
          action: 'r',
          intLevel: 0,
          resource: 'resourceType.resourceName',
          scope: '@'
        }
      }
    ]

    for (const e of tests) {
      const result = core.parsePermissionString(e.input)
      expect(result).to.deep.equal(e.expected)
    }
  })
})
