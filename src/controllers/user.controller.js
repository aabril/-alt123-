const User = require('../models/user.model')

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
    return res.jsend(newUserSaved)
  } catch(err) {
    return handleError(res, err)
  }
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
  destroy
}