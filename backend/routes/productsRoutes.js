const express = require('express');
const router = express.Router();
const { db1 } = require('../server'); // Import the database connection
const productSchema = require('../models/Product'); // Import the product schema

const ProductDB1 = db1.model('Product', productSchema);

router.get('/', async (req, res) => {
    try {
        const products = await ProductDB1.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
});

module.exports = router;
