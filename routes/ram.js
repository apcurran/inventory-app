const express = require("express");
const router = express.Router();
const Ram = require("../models/ram");

// GET All Ram
router.get("/", async (req, res, next) => {
    try {
        const data = await Ram.find({});
        res.render("ram/ram-list", { title: "Ram List", ram: data });
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// GET New Ram Page
router.get("/new", (req, res, next) => {
    res.render("ram/ram-new", { title: "Add a Ram Product" });
});

// POST New Ram Item
router.post("/new", async (req, res, next) => {
    const ram = new Ram({
        name: req.body.name,
        supplier: req.body.supplier,
        speed: req.body.speed,
        amount: req.body.amount
    });

    try {
        const newRam = await ram.save();
        // res.redirect(`ram/${newRam.id}`);
        res.redirect("/ram"); // Starting from the home page, then ram
    } catch (err) {
        next(err);
    }
});

module.exports = router;