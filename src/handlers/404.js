'use strict';

module.exports = (req, res, next) => {
    res.status(404).send({
        error: 404,
        route: req.path,
        method: req.method,
        message: "We can't find the page you're looking for."
    });
};
