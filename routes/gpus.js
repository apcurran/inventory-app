const express = require("express");
const router = express.Router();
const Gpu = require("../models/gpu.js");

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
router.post("/new", async (req, res, next) => {
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

module.exports = router;