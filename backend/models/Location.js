const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
});

module.exports = locationSchema; // Make sure you are exporting the schema, not the model
