const express = require('express');
const app = express();
const setRoutes = require('./routes')

const bodyparserService = require('./services/bodyparser.service')
const mongooseService = require('./services/mongoose.service')
const passportService = require('./services/passport.service')

bodyparserService(app)
mongooseService()
passportService.setupJwtStrategy()
passportService.initialize(app)
require('express-jsend'); // https://www.npmjs.com/package/express-jsend


setRoutes(app)


module.exports = app