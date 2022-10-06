const express = require("express");
const GYM = require("../models/gym");
const gymRouter = express.Router();

// Add GYM
gymRouter.post("/addGYM", async (req, res) => {
  const { name, address, city, phoneNumber } = req.body;
  try {
    if (
      name !== undefined &&
      name !== "" &&
      name !== null &&
      address !== "" &&
      address !== null &&
      address !== undefined &&
      city !== undefined &&
      city !== "" &&
      city !== null &&
      phoneNumber !== undefined &&
      phoneNumber !== "" &&
      phoneNumber !== null
    ) {
      let checkGym = await GYM.find({ gymName: name });
      if (checkGym.length === 0 || checkGym === null) {
        let gymDoc = await GYM.create({
          gymName: name,
          gymAddress: address,
          gymCity: city,
          gymPhoneNumber: phoneNumber,
        });
        return res.status(200).json({
          gymDoc,
          message: "Add Gym Successfully !!!",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "Gym Alread Exists!!!",
          success: false,
        });
      }
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

// Eid GYM
gymRouter.put("/updateGYM", async (req, res) => {
  const { name, address, city, phoneNumber, id } = req.body;
  try {
    if (
      name !== undefined &&
      name !== "" &&
      name !== null &&
      address !== "" &&
      address !== null &&
      address !== undefined &&
      city !== undefined &&
      city !== "" &&
      city !== null &&
      phoneNumber !== undefined &&
      phoneNumber !== "" &&
      phoneNumber !== null &&
      id !== undefined &&
      id !== "" &&
      id !== null
    ) {
      let updateGym = await GYM.findOneAndUpdate(
        { _id: id },
        {
          gymName: name,
          gymAddress: address,
          gymCity: city,
          gymPhoneNumber: phoneNumber,
        }
      );

      if (
        updateGym.length === 0 ||
        updateGym === undefined ||
        updateGym === null ||
        updateGym === ""
      ) {
        return res.status(200).json({
          id,
          message: "Gym Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Gym Content",
          success: true,
        });
      }
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

// Delete Gym
gymRouter.delete("/deleteGYM", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteGym = await GYM.deleteOne({ _id: id });
      if (
        deleteGym["deletedCount"] === 0 ||
        deleteGym === null ||
        deleteGym === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Gym Not found ",
          success: true,
        });
      } else if (
        deleteGym["deletedCount"] === 1 ||
        deleteGym !== null ||
        deleteGym !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Gym Delete Successfully !!! ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

// Get All Gym
gymRouter.get("/getAllGYM",async(req,res)=>{
  try {
    let getAllGym = await GYM.find();
    if(getAllGym !== undefined && getAllGym.length !== 0 && getAllGym !== null){
      return res.status(200).send({
        getAllGym,
        messge: "All Gym",
        success: true,
      });
    }
    else{
      return res.status(200).send({
        messge: "Gym Not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

module.exports = gymRouter;
