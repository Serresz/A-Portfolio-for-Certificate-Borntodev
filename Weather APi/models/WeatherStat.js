const mongoose = require('mongoose');

const weatherStatSchema = new mongoose.Schema({
    city: String,
    temperature: Number, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherStat', weatherStatSchema);