const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Reference to Product model
});

module.exports = supplierSchema;
