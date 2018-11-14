/**
 * The default index route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = (req, res, next) => {
  res.jsend({msg: 'hola'});
}

function notFound(req, res, next) {
    return res.jerror('RouteNotFound', `The route ${req.path} can not be found`)
}

function rootPath(req, res, next) {
    return res.jsend({msg: 'hola'})
}

module.exports = {
  rootPath,
  notFound
}