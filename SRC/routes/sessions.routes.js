const {Router} = require("express")
const sessionsRouter = Router()

const SessionsController = require("../controller/sessionsController.js")
const sessionsController = new SessionsController()

sessionsRouter.post("/", sessionsController.create) 

module.exports = sessionsRouter