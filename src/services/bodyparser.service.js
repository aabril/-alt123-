const bodyParser = require('body-parser');

function setBodyParser(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

module.exports = setBodyParser