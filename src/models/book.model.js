
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: String,
  title: String,
  author: String
});

BookSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

module.exports = mongoose.model('Thing', BookSchema);