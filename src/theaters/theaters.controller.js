const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// return all theaters
async function list(req, res) {
  res.json({ data: await service.list() })
}

module.exports = {
  list: asyncErrorBoundary(list),
}