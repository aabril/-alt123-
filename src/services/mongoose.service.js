const mongoose = require('mongoose');
const config = require('../../config')

function mongooseErrorHandling(err) {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.' + '✗');
  process.exit();
}

function initialiseMongoose(){
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(config.mongodburi);
  mongoose.connection.on('error', mongooseErrorHandling);
}

module.exports = initialiseMongoose