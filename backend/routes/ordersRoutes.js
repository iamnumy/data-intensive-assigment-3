const express = require('express');
const router = express.Router();
const { db1 } = require('../server');
const orderSchema = require('../models/Order');

const OrderDB1 = db1.model('Order', orderSchema);

router.get('/', async (req, res) => {
    try {
        const orders = await OrderDB1.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
});

module.exports = router;
