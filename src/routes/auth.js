'use strict';

const express = require('express');
const { userModel } = require('../models');
const basicAuth = require('../middleware/auth/basicAuth');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        let newUser = await userModel.create(req.body);
        
        const userResponse = {
            username: newUser.username,
            role: newUser.role,
            token: newUser.token
        };

        res.status(201).send({
            message: "Welcome to Gotham Crime Tracker - Signup Successful",
            user: userResponse
        });
    } catch (e) {
        console.error(e);
        next('Signup error occurred');
    }
});

router.post('/signin', basicAuth, (req, res, next) => {
    if(req.user) {
        res.status(200).send({
            message: "Welcome back to Gotham Crime Tracker",
            user: {
                username: req.user.username,
                role: req.user.role
            },
            token: req.user.token 
        });
    } else {
        res.status(401).send("Unauthorized: Login Failed");
    }
});


module.exports = router;