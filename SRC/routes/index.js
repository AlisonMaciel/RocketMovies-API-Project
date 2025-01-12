const {Router} = require("express")
const routes = Router()

<<<<<<< HEAD
const userRouter = require("./user.routes.js")
const notesRouter = require("./movie_notes.routes.js")
const tagsRouter = require("./movie_tags.routes.js")
const sessionsRouter = require("./sessions.routes.js")
=======
const userRouter = require("./user-routes.js")
const notesRouter = require("./movie_notes-routes.js")
const tagsRouter = require("./movie_tags-routes.js")
>>>>>>> 9259820b5542c29def31dbf21abd83603dc57208

routes.use("/users", userRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)
<<<<<<< HEAD
routes.use("/sessions", sessionsRouter)
=======
>>>>>>> 9259820b5542c29def31dbf21abd83603dc57208

module.exports = routes