const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user.model');

// Serialize and deserialize definitions

function serializeUserCb(user, done) {
  done(null, user.id)
}

function deserializeUserCb(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
}

const localStrategyOptions = {
  usernameField: 'email'
}

function localStrategyCb(email, password, done) {
  const findQuery = { email: email.toLowerCase() }
  const findCb = (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { msg: `Email ${email} not found.` });
    const comparePasswordCb = (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false, { msg: 'Invalid email or password.' });
    }
    user.comparePassword(password, comparePasswordCb);
  }
  User.findOne(findQuery, findCb);
}
const localStrategy = new LocalStrategy(localStrategyOptions, localStrategyCb)


// Set Password Methods and Strategy

passport.serializeUser(serializeUserCb);
passport.deserializeUser(deserializeUserCb);
passport.use(localStrategy)


// Authorisation Middlewares

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function setPassport(app) {
  app.use(passport.initialize());
}

function setUser(app) {
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
}

module.exports = {
  isAuthenticated,
  setPassport,
  setUser
}