const knex = require("../database/knex/index");
const AppError = require("../Utils/appError.js")
const {hash, compare} = require("bcryptjs")

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const gmail = await knex("user").where({email}).first()

        if(gmail) {
            throw new AppError("email já em uso")
        }

        const passwordHash = await hash(password, 8)

        await knex("user").insert({
            name,
            email, 
            password: passwordHash
        })
 
        return response.status(201).json("usuário criado com sucesso")
    }

    async upadate(request, response) {
        const {name, password, email, password_old} = request.body
        const user_id = request.user.id

        const user = await knex("user")
        .select("user.id", "user.password", "user.name")
        .where("user.id", user_id)
        .first()

        if(!user) {
            throw new AppError("usuario não encontrado na base de dados")
        }

        const existingEmail =  await knex("user")
        .select("user.email")
        .where("user.email", email)
        .andWhereNot("user.id", user_id) 
        .first()

        if(existingEmail) {
            throw new AppError("Esse email já esta em uso por outro usuario")
        }

        if(password && !password_old) {
            throw new AppError("Por favor digite a senha antiga para continuar")
        }

        const comparePassword = await compare(password_old, user.password)

        if(!comparePassword) {
            throw new AppError("As senhas nao se coincidem")
        } 

        const upadateName = name || user.name
        const upadateEmail = email || user.email
        const upadatePassword = password ? await hash(password, 8) : user.password

        await knex("user")
        .where({id: user_id}) 
        .update({
            name: upadateName,
            email: upadateEmail,
            password: upadatePassword,
            updated_at: knex.fn.now()
        })
        
        return response.status(200).json({message: "usuário atualizado com sucesso"})
    }

    async show(request, response) {
        const user_id = request.user.id
        
        const showUserInformation = await knex("user")
        .select(
            "user.id",
            "user.name" ,
            "user.email",
            "user.password",
            "user.created_at",
            "user.updated_at"
        )
        .where("user.id", user_id)
        .first()

        if(!showUserInformation) {
            throw new AppError("usuario nao encontrado na base de dados")
        }

        return response.json(showUserInformation)
    }

    async delete(request, response) {
        const {id} = request.params

        const deleteUser = await knex("user")
        .where({id})
        .first()
        .delete()

        if(!deleteUser) {
            throw new AppError("usuario nao encontrado na base de dados")
        }

        return response.status(200).json({message: "usuario deletado com sucesso!"})
    }
}

module.exports = UserController;
 