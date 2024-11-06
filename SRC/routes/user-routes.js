const {Router} = require("express")
const userRouter = Router()

const UserController = require("../controller/users-controller.js")
const userController = new UserController()

userRouter.post("/", userController.create)
userRouter.put("/:user_id", userController.upadate)
userRouter.get("/:user_id", userController.show)
userRouter.delete("/:user_id", userController.delete)

module.exports = userRouter