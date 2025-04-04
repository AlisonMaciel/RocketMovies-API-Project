const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "SRC", "database", "database.db")
    },
    
    useNullAsDefault: true,
    
    poll: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

  migrations: {
    directory: path.resolve(__dirname, "SRC", "database", "knex", "migrations")
   }
  }
}

