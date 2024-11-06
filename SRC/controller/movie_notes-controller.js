const knex = require("../database/knex/index.js")

class NotesCrontroller {
    async create(request, response) {
        const {title, description, rating, tag} = request.body
        const {user_id} = request.params

        const [note_id] = await knex("movie_notes")
        .insert({
            title,
            description,
            rating,
            user_id
        })

        const insertTags = tag.map(name => {
            return {
                name,
                note_id,
                user_id
            }
        })

        await knex("movie_tags").insert(insertTags)

        return response.status(200).json({message: "Nota criada com sucesso"})
    }

    async show(request, response) {
        const {user_id} = request.params

        const user = await knex("movie_notes")
        .select(
            "movie_notes.user_id",
            "movie_notes.title",
            "movie_notes.description",
            "movie_notes.rating",
            "movie_notes.id"
        )
        .where("movie_notes.user_id", user_id)
        .first()

        return response.json(user)
    }

    async index(request, response) {
        const {user_id, title, tag} = request.query

        if(tag) {
            const Tags = tag.split(",").map(tag => tag)

            const filterTags = await knex("movie_tags")
            .select([
                "movie_notes.title",
                "movie_notes.description",
                "movie_notes.rating",
                "movie_notes.user_id"
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name", Tags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
            .orderBy("movie_notes.title")

            return response.json(filterTags)
            
        } else {
            
            const filterTitle = await knex("movie_notes")
            .select(
                "movie_notes.title",
                "movie_notes.user_id",
                "movie_notes.description"
            )
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .first()
    
            return response.json(filterTitle)
        }

    }
    
    async delete(request, response) {
        const {user_id} = request.params
        const {id} = request.query

        const delete_notes = await knex("movie_notes")
        .where("movie_notes.user_id", user_id)
        .where("movie_notes.id", id)
        .delete()

        return response.status(200).json({
            message: "nota deletada com sucesso",
            delete_notes
        })
    }
}

module.exports = NotesCrontroller