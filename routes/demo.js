const express = require("express");
const demoRouter = express.Router();
const demoBooking = require("../models/demoBooking");
const Demo = require("../models/demo");
const User = require("../models/user");
const GYM_SERVICE = require("../models/gymServices");
const helper = require("../utils/helper");

// Admin Can Add Demo Booking
demoRouter.post("/UserBuyDemoBooking", async (req, res) => {
  try {
    const {
      user_id,
      demo_id,
      username,
      number,
      title,
      branch,
      category,
      demo_status,
    } = req.body;
    if (
      user_id !== "" &&
      user_id !== null &&
      user_id !== undefined &&
      demo_id !== "" &&
      demo_id !== null &&
      demo_id !== undefined &&
      username !== "" &&
      username !== null &&
      username !== undefined &&
      number !== "" &&
      number !== null &&
      number !== undefined &&
      branch !== "" &&
      branch !== null &&
      branch !== undefined &&
      title !== "" &&
      title !== null &&
      title !== undefined &&
      category !== "" &&
      category !== null &&
      category !== undefined &&
      demo_status !== "" &&
      demo_status !== null &&
      demo_status !== undefined
    ) {
      let newDemo = await demoBooking.create({
        user_id,
        demo_id,
        username,
        number,
        title,
        branch,
        category,
        demo_status,
      });
      return res.status(200).json({
        newDemo,
        message: "Demo Booking Successfully",
        success: true,
      });
    } else {
      return res.status(422).json({
        message: "Empty Field Found All Field are requried",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      messsage: error.message,
      success: false,
    });
  }
});

// Get All Demo
demoRouter.get("/getAllDemosBookings", async (req, res) => {
  try {
    let getAllDemos = await Demo.find();
    if (
      getAllDemos.lenght === 0 ||
      getAllDemos === undefined ||
      getAllDemos === null
    ) {
      return res.status(422).json({
        message: "Demo Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        getAllDemos,
        message: "Get All Demos Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});


module.exports = demoRouter;
