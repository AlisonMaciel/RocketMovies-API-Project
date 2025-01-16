const {Router} = require("express")
const multer = require("multer")
const uploadsConfig = require("../configs/uploads.js")

const userRouter = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")
const UserController = require("../controller/users-controller.js")
const AvatarController = require("../controller/avatarController.js")
const avatarController = new AvatarController()
const userController = new UserController()

const uploads = multer(uploadsConfig.MULTER)

userRouter.post("/", userController.create)
userRouter.put("/", ensureAuthenticated, userController.upadate)
userRouter.get("/", ensureAuthenticated, userController.show)
userRouter.patch("/avatar", ensureAuthenticated, uploads.single("avatar"), avatarController.update) 
userRouter.delete("/:id", userController.delete)
 
module.exports = userRouter