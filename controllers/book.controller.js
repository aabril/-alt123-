/**
 * The book route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports.list = (req, res, next) => {
  res.end(`Express Code Challenge Started`);
}