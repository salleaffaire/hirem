'use strict'

const getAccountId = require('./context-helper').getAccountId
const getUserName = require('./context-helper').getUserName

// Helper function to create CRUD-like "interface"
// for ObjectionJS-based Model
module.exports = (Model) => ({
  model: Model,
  insert: (insertData, overrideBelongsTo) => Model.query().debug().insertAndFetch(
    { belongsTo: overrideBelongsTo || getAccountId(), createdBy: getUserName(), ...insertData }),
  findById: (id) => Model.query().debug().findOne({ id, status: null }),
  findByBelongsTo: (belongsTo) => Model.query().debug().where({ belongsTo, status: null }),
  findByIdBelongsTo: (id, belongsTo) => Model.query().debug().findOne({ id, belongsTo }),
  findByName: (name) => Model.query().debug().findOne({ name, status: null }),
  updateById: (id, updateData) => Model.query().debug().patchAndFetchById(id, { updatedBy: getUserName(), ...updateData }),
  deleteById: (id) => Model.query().debug().patchAndFetchById(id, { updatedBy: getUserName(), status: 'DELETED' }),
  findAll: () => Model.query().debug().where({ status: null })
})
