'use strict'

// Permission strings are of the form
// <resourceType>.<...>.resourceName:action.scope.level
//
// The fully qualified resource name is:
//  <resourceType>.<...>.resourceName
//
// Action is of:
// - r (read)
// - w (write)
// - c (create)
// - d (delete)
//
function parsePermissionString (permissionString) {
  const [resource, attributes] = permissionString.split(':')
  const [action, scope, level] = attributes.split('.')
  let intLevel

  // If action is wrong
  if (!['r', 'w', 'c', 'd'].includes(action)) {
    return undefined
  }
  // If scope is wrong
  if (!['@', '#', '#'].includes(scope)) {
    return undefined
  }
  // If level is not an integer
  try {
    intLevel = parseInt(level)
  } catch (e) {
    return undefined
  }

  return {
    resource,
    action,
    scope,
    intLevel
  }
}

module.exports = {
  parsePermissionString
}
