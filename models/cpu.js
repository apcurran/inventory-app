const mongoose = require("mongoose");

const CpuSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    cores: { type: Number, required: true, max: 64 },
    threads: { type: Number, required: true, max: 128 },
    clockspeed: { type: Number, required: true, max: 100 }
});

// Virtual for CPU's URL
CpuSchema
    .virtual('updateUrl')
    .get(function () {
        return '/cpus/' + this._id + "/update";
    });

module.exports = mongoose.model("Cpu", CpuSchema);