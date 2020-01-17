const express = require("express");
const router = express.Router();
const Cpu = require("../models/cpu"); 

// GET All CPUs
router.get("/", async (req, res, next) => {
    try {
        const data = await Cpu.find({});
        res.render("cpus/list", { cpus: data });
    } catch (err) {
        next(err);
        res.redirect("/"); // Back to home page
    }
});

// New CPU Route
router.get("/new", (req, res) => {
    res.render("cpus/new", { cpu: new Cpu() });
});

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
        res.redirect("/cpus"); // starting from home page / cpus
    } catch {
        res.render("cpus/new", {
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