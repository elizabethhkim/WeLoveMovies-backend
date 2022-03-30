const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const foundReview = await service.read(req.params.reviewId)
    if (foundReview) {
        res.locals.review = foundReview
        return next()
    } else {
        next({
            status: 404,
            message: "Review cannot be found."
        })
    }
}

async function destroy(req, res) {
    await service.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    await service.update(updatedReview)
    const data = await service.updateWithCritic(res.locals.review.review_id)
    res.json({data})
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}