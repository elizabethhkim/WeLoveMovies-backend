const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

// returns all movies
function list() {
    return knex("movies").select("*")
}

// returns movie with :movieId
function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first()
}

// return all movies with is_showing
function listIsShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id","mt.movie_id")
        .distinct("m.*")
        .where({ "mt.is_showing": true })
}

// return theaters with movie_id and showing
function readShowingTheaters(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({ "mt.movie_id": movie_id })
        .andWhere({ "mt.is_showing": true })
}

// adds critic details array to reviews list below
const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

// return reviews of movie_id and adds critic details
function readMovieReviews(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ "r.movie_id": movie_id })
        .then((response) => response.map(addCritic))
}

module.exports = {
    list,
    listIsShowing,
    read,
    readShowingTheaters,
    readMovieReviews,
    
}