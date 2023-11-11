'use strict';

module.exports = (err, req, res, next) => {

    const errorMessage = err.message || "Internal Server Error";

    // Send a 500 error response
    res.status(500).send({
        error: 500,
        route: req.path,
        query: req.query,
        body: req.body,
        message: errorMessage,
    });
};