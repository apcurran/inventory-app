const mongoose = require("mongoose");

const RamSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    supplier: { type: String, required: true, max: 100 },
    speed: { type: Number, required: true, max: 5000 },
    amount: { type: Number, required: true, max: 100 }
});

// Virtual for Ram's URL
RamSchema
    .virtual('updateUrl')
    .get(function () {
        return '/ram/' + this._id + "/update";
    });

module.exports = mongoose.model("Ram", RamSchema);