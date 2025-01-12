const knex = require("../database/knex/index.js")

class NotesCrontroller {
    async create(request, response) {
        const {title, description, rating, tag} = request.body
        const user_id = request.user.id

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
        try {
            const { title, tags } = request.query;
            const user_id = request.user.id;
    
            let notes;
    
            if (tags) {
                const filterTags = tags.split(',')
    
                notes = await knex("movie_tags")
                    .select([
                        "movie_notes.id",
                        "movie_notes.title",
                        "movie_notes.descripiton",
                        "movie_notes.user_id",
                    ])
                    .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
                    .where("movie_tags.user_id", user_id) 
                    .whereLike("movie_notes.title", `%${title}%`)
                    .whereIn("movie_tags.name", filterTags)
                    .groupBy("movie_notes.id")
                    .orderBy("movie_notes.title");
            } else {
                notes = await knex("movie_notes")
                    .where({ user_id })
                    .whereLike("movie_notes.title", `%${title}%`)
                    .orderBy("movie_notes.title");
            }
    
            const userTags = await knex("movie_tags").where({ user_id });
            const notesAndTags = notes.map(note => {
                const filterTags = userTags.filter(tag => tag.note_id === note.id);
                return { ...note, tags: filterTags };
            });
    
            return response.json(notesAndTags);
        } catch (error) {
            console.error("Erro no servidor:", error.message, error.stack);
            return response.status(500).json({ status: "error", message: "erro no servidor" });
        }
    }

    async delete(request, response) {
        const user_id = request.user.id

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