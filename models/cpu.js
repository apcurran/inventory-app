const mongoose = require("mongoose");

const CpuSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    cores: { type: Number, required: true, max: 64 },
    threads: { type: Number, required: true, max: 128 },
    clockspeed: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model("Cpu", CpuSchema);