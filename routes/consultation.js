const express = require("express");
const consultationRouter = express.Router();
const Consultaion = require("../models/Consultaion");

// Admin Can Add Consultaion Booking
consultationRouter.post("/UserBuyConsultaion", async (req, res) => {
  try {
    const { serviceId, userID } = req.body;
    if (serviceId && userID) {
      let newService = await Consultaion.create(req.body);
      return res.status(200).json({
        newService,
        message: "Consultaion Booking Successfully",
        success: true,
      });
    } else {
      return res.status(422).json({
        message: "Empty Field Found All Field are requried for consultation",
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

// Get All Consultaion
consultationRouter.get("/getAllConsultationBookings", async (req, res) => {
  try {
    let getAllConsultations = await Consultaion.find();
    if (
      getAllConsultations.lenght === 0 ||
      getAllConsultations === undefined ||
      getAllConsultations === null
    ) {
      return res.status(422).json({
        message: "Consultaion Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        getAllConsultations,
        message: "Get All Consultaion Successfully",
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

module.exports = consultationRouter;
