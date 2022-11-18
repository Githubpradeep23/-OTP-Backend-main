const express = require("express");
const Complain = require("../models/complains");
const complainRouter = express.Router();

//Add Complain
complainRouter.post("/addComplain", async (req, res) => {
  try {
    const { id, message } = req.body;
    if (
      id !== "" &&
      id !== undefined &&
      id !== null &&
      message !== "" &&
      message !== undefined &&
      message !== null
    ) {
      let newComplain = await Complain.create({
        id,
        complainMessage: message,
      });
      return res.status(200).json({
        newComplain,
        message: "Complain Added Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

//Get All Complainsss
complainRouter.get("/getAllComplains", async (req, res) => {
  try {
    let getAllComplain = await Complain.find().populate("user_id");
    if (
      getAllComplain !== undefined &&
      getAllComplain.length !== 0 &&
      getAllComplain !== null
    ) {
      return res.status(200).send({
        getAllComplain,
        messge: "Get All Complain Successfully",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Complains Not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});


module.exports = complainRouter
