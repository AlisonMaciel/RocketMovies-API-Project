const knex = require("../database/knex")
const DiskStorage = require("../providers/diskStorege.js")
const AppError = require("../Utils/appError.js")

class AvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const avatarFileName = request.file.filename
        const diskStorage = new DiskStorage()

        const user = await knex("user")
        .where({id: user_id})
        .first()

        if(!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar.")
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }
        
        const fileName = await diskStorage.saveFile(avatarFileName)
        user.avatar = fileName

        await knex("user").where({id: user_id}).update({avatar: fileName})

        return response.json({avatar: fileName})
    } 
} 

module.exports = AvatarController