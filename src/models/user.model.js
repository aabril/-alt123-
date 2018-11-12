
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

User.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

module.exports = mongoose.model('Thing', User);