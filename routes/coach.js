const express = require("express");
const Coach = require("../models/coach");
const coachRouter = express.Router();
const User = require("../models/user");
const talkToCoach = require("../models/talkToCoach");

// Add Coach
coachRouter.post("/addCoach", async (req, res) => {
  try {
    const { name, contact_no, service_id } = req.body;
    if (
      name !== null &&
      name !== undefined &&
      name !== "" &&
      contact_no !== "" &&
      contact_no !== undefined &&
      contact_no !== null &&
      service_id !== "" &&
      service_id !== null &&
      service_id !== undefined
    ) {
      let coach = await Coach.create({
        name,
        contact_no,
        service_id,
      });
      return res.status(200).json({
        coach,
        message: "Add Coach Successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: coach.js ~ line 35 ~ coachRouter.post ~ error", error)
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

coachRouter.post("/talkToCoach", async (req, res) => {
  try {
    const { userID, coachID, request } = req.body;
    if (
      userID !== undefined &&
      userID !== "" &&
      userID !== null &&
      coachID !== "" &&
      coachID !== undefined &&
      coachID !== "" &&
      request !== "" &&
      request !== null &&
      request !== undefined
    ) {
      let user = await User.findById({ _id: userID });
      console.log(
        "🚀 ~ file: coach.js ~ line 73 ~ coachRouter.post ~ user",
        user
      );
      let coach = await Coach.findById({ _id: coachID });
      console.log(
        "🚀 ~ file: coach.js ~ line 75 ~ coachRouter.post ~ coach",
        coach
      );

      if (
        user === null ||
        coach === null ||
        user === undefined ||
        coach === null
      ) {
        return res.status(200).json({
          message: "Not Found",
          success: false,
        });
      } else {
        console.log("Enter else Block")
        let newRequest = await talkToCoach.create({
          userID,
          coachID,
          request,
        });
        return res.status(200).json({
          newRequest,
          message: "Reauest Add Successfully",
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
});

module.exports = coachRouter;
