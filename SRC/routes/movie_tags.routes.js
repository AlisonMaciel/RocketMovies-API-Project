const {Router} = require("express")
const tagsRouter = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")
const TagsController = require("../controller/movie_tags-controller.js")
const tagsController = new TagsController()

tagsRouter.get("/", ensureAuthenticated, tagsController.show)

module.exports = tagsRouter