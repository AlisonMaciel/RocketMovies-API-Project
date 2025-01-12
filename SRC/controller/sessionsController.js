const knex = require("../database/knex")
const AppError = require("../Utils/appError.js")
const {compare} = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const authConfigs = require("../configs/auth.js")

class SessionsController {
    async create(request, response) {
        const {email, password} = request.body

        const user = await knex("user").where({email}).first()

        if(!user) {
            throw new AppError("Email/senha inválidos")
        }

        const checkPassword = await compare(password, user.password)

        if(!checkPassword) {
            throw new AppError("Email/senha inválidos")
        }

        const {expiresIn, secret} = authConfigs.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        }) 

        return response.json({user, token})
    }
}

module.exports = SessionsController  