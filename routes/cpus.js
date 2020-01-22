const express = require("express");
const router = express.Router();
const Cpu = require("../models/cpu");
const { sanitizeBody } = require("express-validator");

// GET All CPUs
router.get("/", async (req, res, next) => {
    try {
        const data = await Cpu.find({});
        res.render("cpus/cpu-list", { title: "CPU List", cpus: data });
    } catch (err) {
        next(err);
        res.redirect("/"); // Back to home page
    }
});

// GET New CPU Page
router.get("/new", (req, res) => {
    res.render("cpus/cpu-new", { title: "Add a CPU", cpu: new Cpu() });
});

// POST New CPU Item
router.post("/new", [

    sanitizeBody("name").escape(),
    sanitizeBody("supplier").escape(),
    sanitizeBody("cores").escape(),
    sanitizeBody("threads").escape(),
    sanitizeBody("clockspeed").escape()

], async (req, res, next) => {
    const cpu = new Cpu({
        name: req.body.name,
        supplier: req.body.supplier,
        cores: req.body.cores,
        threads: req.body.threads,
        clockspeed: req.body.clockspeed
    });

    try {
        const newCpu = await cpu.save();

        res.redirect("/cpus"); // starting from home page, then cpus
    } catch {
        res.render("cpus/cpu-new", {
            title: "Add a CPU",
            name,
            supplier,
            cores,
            threads,
            clockspeed,
            errorMessage: "Error creating cpu" 
        });
    }
});

// POST Delete CPU Item
router.post("/", async (req, res, next) => {
    try {
        await Cpu.findByIdAndRemove(req.body.cpuId);

        res.redirect("/cpus")
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// GET Update CPU Item Page
router.get("/:id/update", async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const itemData = await Cpu.findById(itemId);
        res.render("cpus/cpu-update", { title: "CPU Update", cpu: itemData });
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

// POST Update CPU Item
router.post("/:id/update", [

    sanitizeBody("_id").escape(),
    sanitizeBody("name").escape(),
    sanitizeBody("supplier").escape(),
    sanitizeBody("cores").escape(),
    sanitizeBody("threads").escape(),
    sanitizeBody("clockspeed").escape()

], async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const updatedItem = new Cpu({
            _id: itemId,
            name: req.body.name,
            supplier: req.body.supplier,
            cores: req.body.cores,
            threads: req.body.threads,
            clockspeed: req.body.clockspeed
        });

        await Cpu.findByIdAndUpdate(itemId, updatedItem); // Update Item

        res.redirect("/cpus"); // Redirect to CPU List with updated data
    } catch (err) {
        next(err);
        res.redirect("/");
    }
});

module.exports = router;