const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('express-jsend'); // https://www.npmjs.com/package/express-jsend


const indexController = require('./controllers/index.controller.js');

// routes
function setRoutes(app){
  app.get('/', indexController);
}

setRoutes(app)

app.listen(PORT, () => console.log(`Open http://localhost:3000 to see a response.`));

module.exports = app