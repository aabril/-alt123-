const express = require('express');
const app = express();
const setRoutes = require('./routes')

const mongooseService = require('./services/mongoose')

require('express-jsend'); // https://www.npmjs.com/package/express-jsend
setRoutes(app)

mongooseService()


module.exports = app