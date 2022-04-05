let {DataTypes} = require('sequelize')
let db = require('./db')

let Notes = db.define('Notes', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,

    },
    note: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'notes'
})

module.exports = Notes