const mainController = require('./controllers/main.controller.js');
const bookController = require('./controllers/book.controller.js');
const userController = require('./controllers/user.controller.js');
const institutionController = require('./controllers/institution.controller.js');

const passport = require('passport')
const config = require('../config')


const passportService = require('./services/passport')

function setBookRoutes(app){
  app.get('/books', passportService.isAuthenticated, bookController.list);
  app.get('/books/:isbn', bookController.item);
  app.post('/books', bookController.create);
}

function setUserRoutes(app){
  app.post('/users/create', userController.create);
  app.post('/users/signin', userController.signin)
}

function setRoutes(app){
  app.get('/', mainController.rootPath);
  setBookRoutes(app)
  setUserRoutes(app)
  app.use(mainController.notFound);
}

module.exports = setRoutes