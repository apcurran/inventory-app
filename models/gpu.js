const mongoose = require("mongoose");

const GpuSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    clockspeed: { type: Number, required: true, max: 5000 },
    vram: { type: Number, required: true, max: 100 }
});

module.exports = mongoose.model("Gpu", GpuSchema);