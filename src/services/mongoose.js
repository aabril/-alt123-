const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "'mongodb://localhost:27017/bibliotech"

function mongooseErrorHandling(err) {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.' + '✗');
  process.exit();
}

/**
 * Connect to MongoDB.
 */
function initialiseMongoose(){
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(MONGODB_URI);
  mongoose.connection.on('error', mongooseErrorHandling);
}

module.exports = initialiseMongoose