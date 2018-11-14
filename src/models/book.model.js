
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  author: {
    type: String
  }, 
  institution: { 
    type: Schema.Types.ObjectId, 
    ref: 'Institution'
  }
});


function trasnformObject(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

BookSchema.set('toJSON', { transform: trasnformObject }); 
BookSchema.set('toObject', { transform: trasnformObject }); 

module.exports = mongoose.model('Book', BookSchema);