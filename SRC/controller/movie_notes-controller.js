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
        const {id} = request.params

        const note = await knex("movie_notes").where({id}).first()
        const tags = await knex("movie_tags").where({note_id: id}).orderBy("name")

        return response.json({
            note,
            tags
        })
    }

    async index(request, response) {
        const {user_id, title, tag} = request.query

        let notes;

        if(tag) {
            const filterTags = JSON.parse(tag)
            notes = await knex("movie_tags")
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.description",
                "movie_notes.rating",
                "movie_notes.created_at",
                "movie_notes.user_id",
                knex.raw("GROUP_CONCAT(movie_tags.name) as tags")
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("movie_tags.name", filterTags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
            .orderBy("movie_notes.title")
            .groupBy("movie_notes.id")

        } else {
            notes = await knex("movie_notes")
            .where("movie_notes.user_id", user_id)
            .orderBy("movie_notes.title")
            .groupBy("movie_notes.id")
        }
        
        notes = notes.map(note => {
            note.tags = note.tags ? note.tags.split(",") : []
            return note 
        })
        return response.json({notes})
    }
    
    async delete(request, response) {
        const {user_id} = request.params  

        const delete_notes = await knex("movie_notes")
        .where("movie_notes.user_id", user_id)
        .delete()

        return response.status(200).json({
            message: "nota deletada com sucesso",
            delete_notes
        })
    }
}

module.exports = NotesCrontroller