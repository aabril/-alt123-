const config = {
  mongodburi: process.env.MONGODB_URI || "mongodb://localhost:27017/bibliotech",
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'this_is_NOT_a_super_secret_string',
    session: process.env.JWT_SESSION || 'this_is_NOT_a_super_secret_string_neither',
  }
}

module.exports = config