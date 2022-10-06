const express = require("express");
const Service = require("../models/services");
const servicesRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");

// Add Services
servicesRouter.post("/addService", async (req, res) => {
  try {
    const { title } = req.body;
    const image = req?.files?.image?.tempFilePath;

    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      image !== undefined &&
      image !== null &&
      image !== ""
    ) {
      let checkService = await Service.find({ title });
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
      if (checkService.length === 0 || checkService === null) {
        let serviceData = await Service.create({
          title,
          serviceImage: imageURL,
        });
        let id = serviceData["_id"];
        return res.status(200).json({
          id,
          message: "Add Successfully Service Content",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "This Service Already Exists!!!",
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
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// Update Services
servicesRouter.put("/updateService", async (req, res) => {
  try {
    const image = req?.files?.image?.tempFilePath;
    const { id, title } = req.body;
    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      id !== undefined &&
      id !== "" &&
      id !== null &&
      image !== undefined &&
      image !== null &&
      image !== ""
    ) {
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
      let updateService = await Service.findOneAndUpdate(
        { _id: id },
        { title, serviceImage: imageURL }
      );

      if (
        updateService.length === 0 ||
        updateService === undefined ||
        updateService === null ||
        updateService === ""
      ) {
        return res.status(200).json({
          id,
          message: "Service Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Service Content",
          success: true,
        });
      }
    } else if (
      title !== "" &&
      title !== null &&
      id !== undefined &&
      id !== "" &&
      id !== null
    ) {
      let updateService = await Service.findOneAndUpdate(
        { _id: id },
        { title }
      );
      if (
        updateService.length === 0 ||
        updateService === undefined ||
        updateService === null ||
        updateService === ""
      ) {
        return res.status(200).json({
          id,
          message: "Service Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Service Content",
          success: true,
        });
      }
    } else if (
      image !== "" &&
      image !== null &&
      image !== undefined &&
      id !== undefined &&
      id !== "" &&
      id !== null
    ) {
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
      let updateService = await Service.findOneAndUpdate(
        { _id: id },
        { serviceImage: imageURL }
      );
      if (
        updateService.length === 0 ||
        updateService === undefined ||
        updateService === null ||
        updateService === ""
      ) {
        return res.status(200).json({
          id,
          message: "Service Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Service Image",
          success: true,
        });
      }
    } else {
      return res.status(200).json({
        message: "Empty Field found",
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

// Delete Services
servicesRouter.delete("/deleteService", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteService = await Service.deleteOne({ _id: id });
      if (
        deleteService["deletedCount"] === 0 ||
        deleteService === null ||
        deleteService === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Service Not found ",
          success: true,
        });
      } else if (
        deleteService["deletedCount"] === 1 ||
        deleteService !== null ||
        deleteService !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Service Delete Successfully !!! ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// Get All Service
servicesRouter.get("/getAllService", async (req, res) => {
  try {
    let getAllService = await Service.find();
    if (getAllService !== undefined && getAllService.length !== 0 && getAllService !== null) {
      return res.status(200).send({
        getAllService,
        messge: "All Service",
        success: true,
      });
    }
    else {
      return res.status(200).send({
        messge: "Service Not Exist",
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

module.exports = servicesRouter;
