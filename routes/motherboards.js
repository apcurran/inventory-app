const express = require("express");
const router = express.Router();
const Motherboard = require("../models/motherboard");

// GET All Motherboards
router.get("/", async (req, res, next) => {
    try {
        const data = await Motherboard.find({});
        res.render("motherboards/motherboard-list", { title: "Motherboard List", motherboards: data });
    } catch (err) {
        next(err);
        res.redirect("/"); // Redirect to home page
    }
});

// GET New Motherboard page
router.get("/new", (req, res, next) => {
    res.render("motherboards/motherboard-new", { title: "Add a Motherboard" });
});

// POST New Motherboard Item
router.post("/new", async (req, res, next) => {
    const motherboard = new Motherboard({
        name: req.body.name,
        supplier: req.body.supplier,
        platform: req.body.platform,
        chipset: req.body.chipset
    });

    try {
        const newMotherboard = await motherboard.save();
        // res.redirect(`motherboards/${newMotherboard.id}`);
        res.redirect("/motherboards"); // Starting from the home page, then motherboards
    } catch (err) {
        next(err);
    }
});

module.exports = router;