const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user.model');

const config = require('../../config')

function serializeUserCb(user, done) {
  done(null, user.id)
}

function deserializeUserCb(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
}

passport.serializeUser(serializeUserCb);
passport.deserializeUser(deserializeUserCb);


function setupJwtStrategy(){
  const ExtractJwt = passportJWT.ExtractJwt;
  const Strategy = passportJWT.Strategy;
    
  const strategyParams = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
  }
  
  function strategyCb(req, payload, done) {
    const userId = payload.id
    const findOneQuery = { _id: userId }
    const findOneCb = (err, user) => {
      if (err) return done(err);
      if (!user) return done(new Error("User not found"), null);
      req.user = user;
      return done(null, { id: user.id });
    }
    User.findOne(findOneQuery, findOneCb)
  }
  
  const jwtStrategy = new Strategy(strategyParams, strategyCb)
  passport.use(jwtStrategy)
}

function initialize(app) {
  app.use(passport.initialize());
}

function isAuthenticated(req, res, next){
  const authenticateCustomHandler = (err, user, info) => {
      if(err || !user) return res.jerror('JwtUnauthorized', 'The Bearer Token given is incorrect.');
      return next(); 
  }
  passport.authenticate('jwt', config.jwt.session, authenticateCustomHandler)(req, res, next)
}

module.exports = {
  initialize,
  setupJwtStrategy,
  isAuthenticated
}