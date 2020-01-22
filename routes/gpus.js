const express = require("express");
const router = express.Router();
const Gpu = require("../models/gpu.js");
const { sanitizeBody } = require("express-validator");

// GET All Gpus
router.get("/", async (req, res, next) => {
    try {
        const data = await Gpu.find({});
        res.render("gpus/gpu-list", { title: "GPU List", gpus: data });
    } catch (err) {
        next(err);
        res.redirect("/") // Redirect to home page
    }
});

// GET New Gpu Page
router.get("/new", (req, res, next) => {
    res.render("gpus/gpu-new", { title: "Add a GPU" });
})

// POST New Gpu Item
router.post("/new", [

    sanitizeBody("name").escape(),
    sanitizeBody("supplier").escape(),
    sanitizeBody("clockspeed").escape(),
    sanitizeBody("vram").escape()

], async (req, res, next) => {
    const gpu = new Gpu({
        name: req.body.name,
        supplier: req.body.supplier,
        clockspeed: req.body.clockspeed,
        vram: req.body.vram
    });

    try {
        const newGpu = await gpu.save();
        // res.redirect(`gpus/${newGpu.id}`);
        res.redirect("/gpus") // Starting from home page, then gpus
    } catch (err) {
        next(err);
        res.render("gpus/gpu-new", {
            title: "Add a GPU",
            name,
            supplier,
            clockspeed,
            vram,
            errorMessage: "Error creating gpu"
        });
    }
});

// GET Update GPU Item Page
router.get("/:id/update", async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const itemData = await Gpu.findById(itemId);
        res.render("gpus/gpu-update", { title: "GPU Update", gpu: itemData });
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// POST Update GPU Item
router.post("/:id/update", [

    sanitizeBody("_id").escape(),
    sanitizeBody("name").escape(),
    sanitizeBody("supplier").escape(),
    sanitizeBody("clockspeed").escape(),
    sanitizeBody("vram").escape()

], async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const updatedItem = new Gpu({
            _id: itemId,
            name: req.body.name,
            supplier: req.body.supplier,
            clockspeed: req.body.clockspeed,
            vram: req.body.vram
        });

        await Gpu.findByIdAndUpdate(itemId, updatedItem); // Update Item

        res.redirect("/gpus"); // Redirect to list with updated data
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

module.exports = router;