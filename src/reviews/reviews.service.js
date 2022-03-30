const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function read(review_id) {
    return knex("reviews").select("*").where({review_id}).first()
}

function destroy(review_id) {
    return knex("reviews").where({review_id}).del()
}

function update(updatedReview) {
    return knex("reviews").select("*").where({review_id: updatedReview.review_id}).update(updatedReview, "*")
}

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function updateWithCritic (review_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({"r.review_id": review_id})
        .first()
        .then(addCritic)
}
module.exports = {
    read, 
    delete: destroy,
    update,
    updateWithCritic
}