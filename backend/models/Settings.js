const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    backgroundColor: { type: String, default: '#ffffff' },
    wireframe: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
