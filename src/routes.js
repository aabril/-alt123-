const indexController = require('./controllers/index.controller.js');
const bookController = require('./controllers/book.controller.js');
const userController = require('./controllers/user.controller.js');
const institutionController = require('./controllers/institution.controller.js');

// routes
function setRoutes(app){
  app.get('/', indexController);
  
  app.get('/api/books', bookController.list);
  app.get('/api/books/:isbn', bookController.item);
  app.post('/api/books', bookController.create);
  app.put('/api/books/:id', bookController.update);
  app.patch('/api/books/:id', bookController.update);
  app.delete('/api/books/:id', bookController.destroy);
}

module.exports = setRoutes