const knex = require("knex")
const database = require("../../../knexfile.js")

const connection = knex(database.development) 

module.exports = connection