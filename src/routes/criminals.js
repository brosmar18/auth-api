'use strict';

const express = require('express');
const db = require('../models');
const bearerAuth = require('../middleware/auth/bearerAuth');
const acl = require('../middleware/auth/acl');

const router = express.Router();

// POST route to create a new criminal
router.post('/criminals', bearerAuth, acl('create'), async (req, res, next) => {
    try {
        let newCriminal = await db.criminalModel.create(req.body);
        res.status(201).send({ message: "New criminal added", criminal: newCriminal });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to add the criminal." });
    }
});

// GET route to read criminal records
router.get('/criminals', bearerAuth, acl('read'), async (req, res, next) => {
    try {
        let criminals = await db.criminalModel.findAll();
        res.status(200).send({ message: "Criminal records retrieved", criminals });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to retrieve criminals." });
    }
});

// PUT route to update a criminal record
router.put('/criminals/:id', bearerAuth, acl('update'), async (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedCriminal = await db.criminalModel.update(req.body, { where: { id }});
        res.status(200).send({ message: "Criminal record updated", criminal: updatedCriminal });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to update the criminal record." });
    }
});

// DELETE route to delete a criminal record
router.delete('/criminals/:id', bearerAuth, acl('delete'), async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.criminalModel.destroy({ where: { id }});
        res.status(200).send({ message: "Criminal record deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Failed to delete the criminal record." });
    }
});

module.exports = router;
