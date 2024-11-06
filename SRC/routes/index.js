const {Router} = require("express")
const routes = Router()

const userRouter = require("./user-routes.js")
const notesRouter = require("./movie_notes-routes.js")
const tagsRouter = require("./movie_tags-routes.js")

routes.use("/users", userRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes