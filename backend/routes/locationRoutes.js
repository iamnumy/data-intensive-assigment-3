const express = require('express');
const router = express.Router();
const { db3 } = require('../server'); // Import the database connection for db3
const locationSchema = require('../models/Location'); // Import the location schema

// Create the model for db3
const LocationDB3 = db3.model('Location', locationSchema);

// Route to fetch all locations
router.get('/', async (req, res) => {
    try {
        const locations = await LocationDB3.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch locations', error });
    }
});

module.exports = router;
