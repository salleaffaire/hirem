'use strict'

module.exports = {
  passThroughPermissions: [
    {
      resource: 'hirem.accounts',
      action: 'r',
      scope: '#',
      level: 0
    },
    {
      resource: 'hirem.accounts',
      action: 'w',
      scope: '#',
      level: 0
    },
    {
      resource: 'hirem.users',
      action: 'r',
      scope: '*',
      level: 1
    },
    {
      resource: 'hirem.users',
      action: 'w',
      scope: '*',
      level: 1
    }
  ]
}
