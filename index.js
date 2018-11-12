const express = require('express');
const app = express();
const setRoutes = require('./src/routes')

const PORT = process.env.PORT || 3000;

require('express-jsend'); // https://www.npmjs.com/package/express-jsend
setRoutes(app)

app.listen(PORT, () => console.log(`Open http://localhost:3000 to see a response.`));

module.exports = app