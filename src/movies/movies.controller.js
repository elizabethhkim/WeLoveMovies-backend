const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: "Movie cannot be found." })
}

function read(req, res) {
    const { movie: data } = res.locals
    res.json({data})
}

async function readShowingTheaters(req, res) {
    const { movie_id } = res.locals.movie
    res.json({data: await service.readShowingTheaters(movie_id)})
}

async function list(req, res) {
    const {is_showing} = req.query
    if (is_showing) {
        res.json({data: await service.listIsShowing()})
    } else {
        res.json({ data: await service.list() })
    }
}

async function readMovieReviews(req, res) {
    const {movie_id} = res.locals.movie
    res.json({ data: await service.readMovieReviews(movie_id) })
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list),
    listTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(readShowingTheaters)
    ],
    listReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(readMovieReviews)
    ]

}