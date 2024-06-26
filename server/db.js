const {Sequelize, STRING}= require('sequelize');

module.exports = new Sequelize(
    'ipromise',
    'postgres',
    '123',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)
