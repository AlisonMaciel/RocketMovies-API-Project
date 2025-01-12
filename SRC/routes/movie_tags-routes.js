const {Router} = require("express")
const tagsRouter = Router()

const TagsController = require("../controller/movie_tags-controller.js")
const tagsController = new TagsController()

tagsRouter.get("/:user_id", tagsController.show)

module.exports = tagsRouter