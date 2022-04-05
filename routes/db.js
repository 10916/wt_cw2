let {Sequelize} = require('sequelize')

let db = new Sequelize('database', 'admin', 'admin', {
    host: 'db.sqlite3',
    dialect: 'sqlite'
})

module.exports = db