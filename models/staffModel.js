const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    pay: { type: Number, required: true },
    startDate: { type: Date, required: true },
    team: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
