const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    status: { type: String, required: true },
    location: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
});

const Bin = mongoose.model('Bin', binSchema);
module.exports = Bin;
