const express = require("express");
const wellnessRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");
const User = require("../models/user");
const Wellness = require("../models/wellness");
// Add GYM Servcie
wellnessRouter.post("/addWellness", async (req, res) => {
  try {
    const { title, description, price, category, branch_id,delieverables } = req.body;
    const image = req?.files?.image?.tempFilePath;
    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      description !== undefined &&
      description !== "" &&
      description !== null &&
      price !== undefined &&
      price !== "" &&
      price !== null &&
      image !== undefined &&
      image !== null &&
      image !== "" &&
      branch_id !== undefined &&
      branch_id !== null &&
      branch_id !== "" &&
      category !== "" &&
      category !== null &&
      category !== undefined
    ) {
      // let checkGymService = await GYM_SERVICE.find({ title });
      let options = {
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/bng/image/upload",
        headers: {
          "cache-control": "no-cache",
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
        formData: {
          file: {
            value: fs.readFileSync(image),
            options: { filename: "r.png", contentType: null },
          },
          upload_preset: "uploadApi",
          cloud_name: "bng",
        },
      };
      let imageURL = await helper.get(options);
      // if (checkGymService.length === 0 || checkGymService === null) {
      let gymServiceData = await Wellness.create({
        title,
        description,
        price,
        image: imageURL,
        category,
        branch_id
      });
      let id = gymServiceData["_id"];
      return res.status(200).json({
        id,
        message: "Add Successfully GYM Service Content",
        success: true,
      });
      // } 
      // else {
      //   return res.status(200).json({
      //     message: "This GYM Service Already Exists!!!",
      //     success: false,
      //   });
      // }
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



module.exports = wellnessRouter;
