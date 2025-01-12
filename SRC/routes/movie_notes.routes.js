const {Router} = require("express")
const notesRouter = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")
const NotesCrontroller = require("../controller/movie_notes-controller.js")
const notesController = new NotesCrontroller()

notesRouter.use(ensureAuthenticated)

notesRouter.get("/", notesController.index)
notesRouter.post("/", notesController.create)
notesRouter.get("/:id", notesController.show)
notesRouter.delete("/:user_id", notesController.delete)

module.exports = notesRouter