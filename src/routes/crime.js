'use strict';

const express = require('express');
const db = require('../models');
const bearerAuth = require('../middleware/auth/bearerAuth');
const acl = require('../middleware/auth/acl');

const router = express.Router();

// POST route to create a new crime
router.post('/crimes', bearerAuth, acl('create'), async (req, res, next) => {
    try {
        let newCrime = await db.crimeModel.create(req.body);
        res.status(201).send({ message: "New crime reported", crime: newCrime});
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to report the crime."});
    }
});

// GET route to read crime records
router.get('/crimes', bearerAuth, acl('read'), async (req, res, next) => {
    try {
        let crimes = await db.crimeModel.findAll();
        res.status(200).send({ message: "Crime records retrieved", crimes });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to retrieve crimes." });
    }
});

// PUT route to update a crime record
router.put('/crimes/:id', bearerAuth, acl('update'), async (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedCrime = await db.crimeModel.update(req.body, { where: { id }});
        res.status(200).send({ message: "Crime record updated", crime: updatedCrime });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to update the crime record." });
    }
});

// DELETE route to delete a crime record
router.delete('/crimes/:id', bearerAuth, acl('delete'), async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.crimeModel.destroy({ where: { id }});
        res.status(200).send({ message: "Crime record deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to delete the crime record." });
    }
});

module.exports = router;
