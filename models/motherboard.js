const mongoose = require("mongoose");

const MotherboardSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    platform: { type: String, required: true, max: 100 },
    chipset: { type: String, required: true, max: 100 }
});

// Virtual for Motherboard's URL
MotherboardSchema
    .virtual('updateUrl')
    .get(function () {
        return '/motherboards/' + this._id + "/update";
    });

module.exports = mongoose.model("Motherboard", MotherboardSchema);