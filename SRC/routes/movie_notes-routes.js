const {Router} = require("express")
const notesRouter = Router()

const NotesCrontroller = require("../controller/movie_notes-controller.js")
const notesController = new NotesCrontroller()

notesRouter.get("/", notesController.index)
notesRouter.post("/:user_id", notesController.create)
notesRouter.get("/:user_id", notesController.show)
notesRouter.delete("/:user_id", notesController.delete)

module.exports = notesRouter