'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./User');
const crime = require('./Crime');
const criminal = require('./Criminal');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const userModel = user(sequelizeDatabase, DataTypes);
const crimeModel = crime(sequelizeDatabase, DataTypes);
const criminalModel = criminal(sequelizeDatabase, DataTypes);

module.exports = {
    sequelizeDatabase,
    userModel,
    crimeModel,
    criminalModel
};