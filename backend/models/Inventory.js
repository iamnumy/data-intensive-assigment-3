const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    warehouseLocation: { type: String, required: true },
});

module.exports = inventorySchema;
