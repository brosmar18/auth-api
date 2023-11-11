'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./User');
const crime = require('./Crime');
const criminal = require('./Criminal');

const Collection = require('./collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

// Import model definitions.
const userModel = user(sequelizeDatabase, DataTypes);
const crimeModel = crime(sequelizeDatabase, DataTypes);
const criminalModel = criminal(sequelizeDatabase, DataTypes);


// Initialize an object to gather the models and sequelize instance.
const db = {
    userModel,
    crimeModel,
    criminalModel,
    sequelizeDatabase,
};

// Associate models if association method is defined. 

if (db.userModel.associate) {
    db.userModel.associate(db);
};

if (db.crimeModel.associate) {
    db.crimeModel.associate(db);
};

if (db.criminalModel.associate) {
    db.criminalModel.associate(db);
}

// Wrap each model in a Collection instance for CRUD operations.
db.userCollection = new Collection(db.userModel);
db.crimeCollection = new Collection(db.crimeModel);
db.criminalCollection = new Collection(db.criminalModel);

console.log('User Model:', db.userModel);
console.log('Crime Model:', db.crimeModel);
console.log('Criminal Model:', db.criminalModel);



module.exports = db;