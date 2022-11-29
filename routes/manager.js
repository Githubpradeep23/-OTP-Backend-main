const express = require("express");
const Manager = require("../models/manager");
const managerRouter = express.Router();

// Add manger 
managerRouter.post("/addManager", async (req, res) => {
    try {
        const { manager_contact_no, working_hours, service_id } = req.body;
        let manager = await Manager.create({
            manager_contact_no, working_hours, service_id
        });
        return res.status(200).json({
            manager,
            message: "Add manager successfully",
            success: true
        });
    } catch (error) {
        console.log("🚀 ~ file: manager.js ~ line 10 ~ managerRouter.post ~ error", error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

module.exports = managerRouter;