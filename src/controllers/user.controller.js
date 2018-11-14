const jwt = require("jwt-simple");  

const User = require('../models/user.model')
const config = require('../../config')

/*
 * user resource handler
 */
function list(req, res) {
  return res.jsend({})
}

function item(req, res) {
  return res.jsend({})
}

async function create(req, res) {
  if(!req.body.email) return res.jerror('EmailParameterMissing', 'The email field is required.');
  if(!req.body.password) return res.jerror('PasswordParameterMissing', 'The password field is required.');

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  })

  try {
    const newUserSaved = await newUser.save()
    const payload = { id: newUserSaved.id };
    const token = jwt.encode(payload, config.jwt.secret);
    return res.jsend({token})
  } catch(err) {
    return handleError(res, err)
  }
}

function signin(req, res) {
  if(!req.body.email) return res.jerror('EmailParameterMissing', 'The email field is required.');
  if(!req.body.password) return res.jerror('PasswordParameterMissing', 'The password field is required.');

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}, (err, user) => {
    if(err) return res.jerror('MongooseError', 'Could not connect to mongodb');
    if(!user) return res.jerror('UserNotFound', 'Could not find user in mongodb');

    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.jerror('ComparePasswordError', 'Error comparing passwords');
      if(!isMatch) return res.jerror('UserPasswordDoesNotMatch', 'Password is incorrect');
      const payload = { id: user.id };
      const token = jwt.encode(payload, config.jwt.secret);
      return res.jsend({token})
    })
  })
}

function update(req, res) {
  return res.jsend({})
}

function destroy(req, res) {
  return res.jsend({})
}

function handleError(res, err) {
  return res.jerror(err)
}

module.exports = {
  list,
  item,
  create,
  update,
  destroy,
  signin
}