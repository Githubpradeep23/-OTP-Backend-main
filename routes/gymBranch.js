const express = require("express");
const GYM_BRANCH = require("../models/gymBranch");
const gymBrnachRouter = express.Router();

//Add Brach
gymBrnachRouter.post("/addGymBranch", async (req, res) => {
  const {
    name,
    managerName,
    manager_Phone_Number,
    city,
    phoneNumber,
    branchCode,
    opening_branchTiming,
    closing_branchTiming,
    location,
  } = req.body;
  try {
    if (
      name !== undefined &&
      name !== "" &&
      name !== null &&
      managerName !== "" &&
      managerName !== null &&
      managerName !== undefined &&
      manager_Phone_Number !== "" &&
      manager_Phone_Number !== null &&
      manager_Phone_Number !== undefined &&
      city !== undefined &&
      city !== "" &&
      city !== null &&
      location !== null &&
      location !== null &&
      location !== null &&
      phoneNumber !== undefined &&
      phoneNumber !== "" &&
      phoneNumber !== null &&
      branchCode !== undefined &&
      branchCode !== "" &&
      branchCode !== null &&
      opening_branchTiming !== undefined &&
      opening_branchTiming !== "" &&
      opening_branchTiming !== null &&
      closing_branchTiming !== undefined &&
      closing_branchTiming !== "" &&
      closing_branchTiming !== null
    ) {
      let checkGymBranch = await GYM_BRANCH.find({ branchName: name });
      if (checkGymBranch.length === 0 || checkGymBranch === null) {
        let gymBranchData = await GYM_BRANCH.create({
          branchName: name,
          branchCode: branchCode,
          branchCity: city,
          branchPhoneNumber: phoneNumber,
          opening_branchTiming,
          closing_branchTiming,
          location,
          manager_Phone_Number,
          managerName,
        });
        let id = gymBranchData["_id"];
        return res.status(200).json({
          id,
          message: "Add Successfully Gym Branch ",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "This Gym Branch Alread Exists!!!",
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

// Edit Branch
gymBrnachRouter.put("/updateGymBranch", async (req, res) => {
  try {
    const {
      name,
      managerName,
      manager_Phone_Number,
      city,
      phoneNumber,
      branchCode,
      id,
      opening_branchTiming,
      closing_branchTiming,
      location,
    } = req.body;
    if (
      name !== undefined &&
      name !== "" &&
      name !== null &&
      location !== undefined &&
      location !== "" &&
      location !== null &&
      managerName !== null &&
      managerName !== "" &&
      managerName !== undefined &&
      manager_Phone_Number !== "" &&
      manager_Phone_Number !== undefined &&
      manager_Phone_Number !== null &&
      city !== undefined &&
      city !== "" &&
      city !== null &&
      phoneNumber !== undefined &&
      phoneNumber !== "" &&
      phoneNumber !== null &&
      branchCode !== undefined &&
      branchCode !== "" &&
      branchCode !== null &&
      id !== undefined &&
      id !== "" &&
      id !== null &&
      opening_branchTiming !== "" &&
      opening_branchTiming !== null &&
      closing_branchTiming !== undefined &&
      closing_branchTiming !== "" &&
      closing_branchTiming !== null
    ) {
      let updateGymBranch = await GYM_BRANCH.findOneAndUpdate(
        { _id: id },
        {
          branchName: name,
          branchCode: branchCode,
          manager_Phone_Number,
          managerName,
          branchCity: city,
          branchPhoneNumber: phoneNumber,
          opening_branchTiming,
          closing_branchTiming,
          location,
        }
      );

      if (
        updateGymBranch.length === 0 ||
        updateGymBranch === undefined ||
        updateGymBranch === null ||
        updateGymBranch === ""
      ) {
        return res.status(404).json({
          message: "This Gym Branch Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Gym Branch",
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

// Delete Branch
gymBrnachRouter.delete("/deleteGymBranch", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteGymBranch = await GYM_BRANCH.deleteOne({ _id: id });
      if (
        deleteGymBranch["deletedCount"] === 0 ||
        deleteGymBranch === null ||
        deleteGymBranch === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Service Not found ",
          success: true,
        });
      } else if (
        deleteGymBranch["deletedCount"] === 1 ||
        deleteGymBranch !== null ||
        deleteGymBranch !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "This Gym Branch Delete Successfully !!! ",
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
gymBrnachRouter.get("/getAllGymBranch", async (req, res) => {
  try {
    let getAllGymBranch = await GYM_BRANCH.find();
    if (
      getAllGymBranch !== undefined &&
      getAllGymBranch.length !== 0 &&
      getAllGymBranch !== null
    ) {
      return res.status(200).send({
        getAllGymBranch,
        messge: "All Gym Branch",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Gym Branch Not Exist",
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

module.exports = gymBrnachRouter;
