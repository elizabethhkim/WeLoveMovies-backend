function notFound(req, res, nxt) {
    nxt({ status: 404, message: `Path not found: ${req.originalUrl}` });
  }
  
  module.exports = notFound;