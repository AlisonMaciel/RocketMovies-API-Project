const knex = require("../database/knex/index.js")

class TagsController {
 async show(request, response) {
    const {user_id} = request.params

    const filterTags = await knex("movie_tags")
    .select(
        "movie_tags.id",
        "movie_tags.name",
        "movie_tags.note_id",
        "movie_tags.user_id"
        )
        .where("movie_tags.user_id", user_id)

        return response.status(200).json(filterTags)
 }
}

module.exports = TagsController