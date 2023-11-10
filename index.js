'use strict';

const { start } = require('./src/server');
const db = require('./src/models');

db.sequelizeDatabase.sync().then(() => {
    console.log("Successful Connection to DB!");
    start();
}).catch(e => console.error(e));