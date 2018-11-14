
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
  name: { 
    type: String
  },
  email: { 
    type: String
  },
  role: { 
    type: String,
    enum: ['student', 'academic', 'administrator']
  },
  password: {
    type: String
  },
});

function trasnformObject(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

User.set('toJSON', { transform: trasnformObject }); 
User.set('toObject', { transform: trasnformObject }); 

module.exports = mongoose.model('User', User);