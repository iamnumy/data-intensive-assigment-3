const express = require('express');
const router = express.Router();
const { db1, db2 } = require('../server'); // Import the database connections
const userSchema = require('../models/User'); // Import the user schema

// Create models for both databases
const UserDB1 = db1.model('User', userSchema);
const UserDB2 = db2.model('User', userSchema);

// Route to fetch users based on location
router.get('/:location', async (req, res) => {
    try {
        const { location } = req.params;
        let users;

        // Fetch users from db1 or db2 based on the location
        if (location === 'Tampere' || location === 'Helsinki') {
            users = await UserDB1.find({ location });
        } else if (location === 'Lahti') {
            users = await UserDB2.find({ location });
        }

        // Check if users were found
        if (!users || users.length === 0) {
            return res.json({ message: 'No data available.' });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

module.exports = router;
