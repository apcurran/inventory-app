const express = require("express");
const router = express.Router();
const Cpu = require("../models/cpu"); 

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

// POST New Cpu Item
router.post("/new", async (req, res, next) => {
    const cpu = new Cpu({
        name: req.body.name,
        supplier: req.body.supplier,
        cores: req.body.cores,
        threads: req.body.threads,
        clockspeed: req.body.clockspeed
    });

    try {
        const newCpu = await cpu.save();
        // res.redirect(`cpus/${newCpu.id}`);
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

module.exports = router;