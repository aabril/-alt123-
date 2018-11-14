require('dotenv').config()
const config = require('./config')
const app = require('./src/app')

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port} to see a response.`)
});

module.exports = app