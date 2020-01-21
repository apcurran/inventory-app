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

router.post("/", async (req, res, next) => {
    try {
        await Ram.findByIdAndRemove(req.body.ramId);
        
        const data = await Ram.find({});
        res.render("ram/ram-list", { title: "Ram List", ram: data });
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// GET Update RAM Item Page
router.get("/:id/update", async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const itemData = await Ram.findById(itemId);
        res.render("ram/ram-update", { title: "RAM Update", ram: itemData });
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// POST Update RAM Item
router.post("/:id/update", async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const updatedItem = new Ram({
            _id: itemId,
            name: req.body.name,
            supplier: req.body.supplier,
            speed: req.body.speed,
            amount: req.body.amount
        });

        await Ram.findByIdAndUpdate(itemId, updatedItem); // Update Item

        res.redirect("/ram"); // Redirect to list with updated data
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

module.exports = router;