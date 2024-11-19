const express = require('express');
const router = express.Router();
const { db1 } = require('../server');
const reviewSchema = require('../models/Review');

const ReviewDB1 = db1.model('Review', reviewSchema);

router.get('/', async (req, res) => {
    try {
        const reviews = await ReviewDB1.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
});

module.exports = router;
