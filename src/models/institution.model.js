
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// School or University 

const Institution = new Schema({
  name: String,
  url: String,
  domain: String
});

Institution.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

module.exports = mongoose.model('Thing', Institution);