const mongoose = require("mongoose");

const MotherboardSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    platform: { type: String, required: true, max: 100 },
    chipset: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model("Motherboard", MotherboardSchema);