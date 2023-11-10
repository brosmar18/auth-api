'use strict';

const express = require('express');
const db = require('../models');
const bearerAuth = require('../middleware/auth/bearerAuth');

const router = express.Router();

router.get('/users', bearerAuth, async (req, res, next) => {
    try {
        let users = await db.userModel.findAll({
            // Exclude password from the results
            attributes: { exclude: ['password']},
        });

        let payload = {
            message: "Gotham Crime Tracker - Vigilante Registry",
            vigilantes: users.map(user => {
                return {
                    codename: user.username,
                    role: user.role,
                    capabilities: user.capabilities
                };
            }),
        };
    

        res.status(200).send(payload);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to retrieve the vigilantes of Gotham." });
    }
});

module.exports = router;