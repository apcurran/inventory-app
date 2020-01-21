const mongoose = require("mongoose");

const GpuSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    clockspeed: { type: Number, required: true, max: 5000 },
    vram: { type: Number, required: true, max: 100 }
});

// Virtual for GPU's URL
GpuSchema
    .virtual('updateUrl')
    .get(function () {
        return '/gpus/' + this._id + "/update";
    });

module.exports = mongoose.model("Gpu", GpuSchema);