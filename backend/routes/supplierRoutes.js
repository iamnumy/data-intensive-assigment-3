const express = require('express');
const router = express.Router();
const { dbTampere } = require('../server'); // Import the Tampere database connection
const supplierSchema = require('../models/Supplier'); // Import the supplier schema

// Create the model for suppliers in Tampere
const SupplierTampere = dbTampere.model('Supplier', supplierSchema);

// Route to fetch suppliers based on location
router.get('/:location', async (req, res) => {
    const { location } = req.params;
    let suppliers;

    try {
        // Only fetch suppliers if the location is Tampere
        if (location === 'Tampere') {
            suppliers = await SupplierTampere.find();
        } else {
            suppliers = []; // No suppliers for other locations
        }

        res.json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Failed to fetch suppliers', error });
    }
});

module.exports = router;
