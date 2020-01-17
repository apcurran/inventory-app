const mongoose = require("mongoose");

const RamSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    speed: { type: Number, required: true, max: 5000 },
    amount: { type: Number, required: true, max: 100 }
});

module.exports = mongoose.model("Ram", RamSchema);