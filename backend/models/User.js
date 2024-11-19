const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
});

module.exports = userSchema; // Make sure you are exporting the schema, not the model
