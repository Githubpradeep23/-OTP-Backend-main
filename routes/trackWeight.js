const express = require("express");
const TrackWeight = require("../models/trackWeight");
const trackWeightRouter = express.Router();
const User = require("../models/user");

// Add
trackWeightRouter.post("/addWeight", async (req, res) => {
  try {
    const { userID, weight, to, from, ht, PBF, SMM, Waist, PushUp, PullUps } =
      req.body;
    if (
      userID !== "" &&
      userID !== null &&
      userID !== undefined &&
      weight !== "" &&
      weight !== undefined &&
      weight !== null &&
      to !== "" &&
      to !== null &&
      to !== undefined &&
      from !== "" &&
      from !== null &&
      from !== undefined
    ) {
      console.log("userID, weight, date ", userID, weight);

      let user = await User.findById({ _id: userID });
      console.log(
        "🚀 ~ file: trackWeight.js ~ line 24 ~ trackWeightRouter.post ~ user",
        user
      );

      if (user !== null && user !== undefined) {
        let doc = await TrackWeight.create({
          userID,
          weight,
          to,
          from,
          ht,
          PBF,
          SMM,
          Waist,
          PushUp,
          PullUps,
        });

        return res.status(200).json({
          doc,
          message: "Add Weight Successfully",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "Unauthorized User",
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
      message: "Something Went Wrong !!",
      success: false,
    });
  }
});

//Update
trackWeightRouter.put("/updateWeight", async (req, res) => {
  const { id, userID, weight, to, from, ht, PBF, SMM, Waist, PushUp, PullUps } =
    req.body;
  try {
    if (
      id !== undefined &&
      id !== "" &&
      id !== null &&
      weight !== "" &&
      weight !== null &&
      weight !== undefined &&
      userID !== undefined &&
      userID !== "" &&
      userID !== null &&
      to !== "" &&
      to !== null &&
      to !== undefined &&
      from !== "" &&
      from !== null &&
      from !== undefined
    ) {
      let user = await User.findById({ _id: userID });
      if (user !== null && user !== undefined) {
        let updateWeight = await TrackWeight.findOneAndUpdate(
          { _id: id },
          {
            userID,
            weight,
            to,
            from,
            ht,
            PBF,
            SMM,
            Waist,
            PushUp,
            PullUps,
          }
        );

        if (
          updateWeight.length === 0 ||
          updateWeight === undefined ||
          updateWeight === null ||
          updateWeight === ""
        ) {
          return res.status(200).json({
            id,
            message: "Track & Trace Weight Not Found !!!",
            success: false,
          });
        } else {
          return res.status(200).json({
            id,
            message: "Update Successfully Track & Trace Weight",
            success: true,
          });
        }
      } else {
        return res.status(200).json({
          message: "Unauthorized User",
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
});

//Delete
trackWeightRouter.delete("/deleteWeight", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteTrackWeightRecord = await TrackWeight.deleteOne({ _id: id });
      if (
        deleteTrackWeightRecord["deletedCount"] === 0 ||
        deleteTrackWeightRecord === null ||
        deleteTrackWeightRecord === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Track Weight Not found ",
          success: true,
        });
      } else if (
        deleteTrackWeightRecord["deletedCount"] === 1 ||
        deleteTrackWeightRecord !== null ||
        deleteTrackWeightRecord !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Track Weight Delete Successfully !!! ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
});

//GetAll
trackWeightRouter.get("/getAllWeight", async (req, res) => {
  try {
    let getAllRecords = await TrackWeight.find();
    if (
      getAllRecords !== undefined &&
      getAllRecords !== "" &&
      getAllRecords !== null &&
      getAllRecords.length !== 0
    ) {
      return res.status(200).json({
        getAllRecords,
        message: "Get All Record Successfully !!!",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Record Not Found !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
});

module.exports = trackWeightRouter;
