'use strict';

const express = require('express');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const crimesRouter = require('./routes/crime');
const criminalsRouter = require('./routes/criminals');

require('dotenv').config();
const PORT = process.env.PORT;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(usersRouter);
app.use(crimesRouter);
app.use(criminalsRouter);

app.get('/', (req, res, next) => {
    res.status(200).send("Hello World!");
});

// Route to test errorHandler
app.get('/test-error', (req, res, next) => {
    const err = new Error("Test Error for 500");
    next(err);
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

module.exports = { start, app };
