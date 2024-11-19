const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Use CORS to allow requests from your frontend
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Create connections for each database
const dbHelsinki = mongoose.createConnection(process.env.MONGO_URI_DB1);
const dbLahti = mongoose.createConnection(process.env.MONGO_URI_DB2);
const dbTampere = mongoose.createConnection(process.env.MONGO_URI_DB3);

// Import schemas
const productSchema = require('./models/Product');
const orderSchema = require('./models/Order');
const reviewSchema = require('./models/Review');
const supplierSchema = require('./models/Supplier');

// Create models for Products
const ProductHelsinki = dbHelsinki.model('Product', productSchema);
const ProductLahti = dbLahti.model('Product', productSchema);
const ProductTampere = dbTampere.model('Product', productSchema);

// Create models for Orders
const OrderHelsinki = dbHelsinki.model('Order', orderSchema);
const OrderLahti = dbLahti.model('Order', orderSchema);
const OrderTampere = dbTampere.model('Order', orderSchema);

// Create models for Reviews
const ReviewHelsinki = dbHelsinki.model('Review', reviewSchema);
const ReviewLahti = dbLahti.model('Review', reviewSchema);
const ReviewTampere = dbTampere.model('Review', reviewSchema);

// Create model for Suppliers (only in Tampere)
const SupplierTampere = dbTampere.model('Supplier', supplierSchema);

// API endpoint to fetch products based on location
app.get('/api/products/:location', async (req, res) => {
    const { location } = req.params;
    let products;

    try {
        if (location === 'Helsinki') {
            products = await ProductHelsinki.find();
        } else if (location === 'Lahti') {
            products = await ProductLahti.find();
        } else if (location === 'Tampere') {
            products = await ProductTampere.find();
        } else {
            return res.status(400).json({ message: 'Invalid location specified' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// API endpoint to fetch orders based on location
app.get('/api/orders/:location', async (req, res) => {
    const { location } = req.params;
    let orders;

    try {
        if (location === 'Helsinki') {
            orders = await OrderHelsinki.find();
        } else if (location === 'Lahti') {
            orders = await OrderLahti.find();
        } else if (location === 'Tampere') {
            orders = await OrderTampere.find();
        } else {
            return res.status(400).json({ message: 'Invalid location specified' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// API endpoint to fetch reviews based on location
app.get('/api/reviews/:location', async (req, res) => {
    const { location } = req.params;
    let reviews;

    try {
        if (location === 'Helsinki') {
            reviews = await ReviewHelsinki.find();
        } else if (location === 'Lahti') {
            reviews = await ReviewLahti.find();
        } else if (location === 'Tampere') {
            reviews = await ReviewTampere.find();
        } else {
            return res.status(400).json({ message: 'Invalid location specified' });
        }

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/api/suppliers/:location', async (req, res) => {
    const { location } = req.params;
    let suppliers;

    try {
        if (location === 'Tampere') {
            // Populate the productsSupplied field to get full product details
            suppliers = await SupplierTampere.find().populate('productsSupplied');
        } else {
            suppliers = []; // No suppliers in Helsinki or Lahti
        }

        res.json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
