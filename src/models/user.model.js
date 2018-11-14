
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
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

function hookPreSave(next) {
  const user = this;
  if (!user.isModified('password')) { 
    return next(); 
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
}

function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

function trasnformObject(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

UserSchema.pre('save', hookPreSave);
UserSchema.methods.comparePassword = comparePassword;

UserSchema.set('toJSON', { transform: trasnformObject }); 
UserSchema.set('toObject', { transform: trasnformObject }); 

module.exports = mongoose.model('User', UserSchema);