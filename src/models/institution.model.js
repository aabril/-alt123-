
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// School or University 

const InstitutionSchema = new Schema({
  name: String,
  url: String,
  domain: String
});

function trasnformObject(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

InstitutionSchema.set('toJSON', { transform: trasnformObject }); 
InstitutionSchema.set('toObject', { transform: trasnformObject }); 

module.exports = mongoose.model('Institution', InstitutionSchema);