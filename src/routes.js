const indexController = require('./controllers/index.controller.js');
const bookController = require('./controllers/book.controller.js');
const userController = require('./controllers/user.controller.js');
const institutionController = require('./controllers/institution.controller.js');

// routes
function setRoutes(app){
  app.get('/', indexController);

  app.get('/api/book', bookController.list);
  app.get('/api/book/:id', bookController.item);
  app.post('/api/book', bookController.create);
  app.put('/api/book/:id', bookController.update);
  app.patch('/api/book/:id', bookController.update);
  app.delete('/api/book/:id', bookController.destroy);

}

module.exports = setRoutes