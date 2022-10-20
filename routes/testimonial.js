const express = require("express");
const Testimonial = require("../models/testimonial");
const testimaonialRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");

testimaonialRouter.post("/testimonial", async (req, res) => {

  try {
    const { title, description, category, rating, customerName, youtube_link } = req.body;
    const image = req?.files?.image?.tempFilePath;

    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      description !== "" &&
      description !== null &&
      description !== undefined &&
      image !== undefined &&
      image !== null &&
      image !== "" &&
      category !== undefined &&
      category !== null &&
      category !== "" &&
      rating !== undefined &&
      rating !== null &&
      rating !== "" &&
      customerName !== undefined &&
      customerName !== null &&
      customerName !== ""
    ) {

      let checkTestimonial = await Testimonial.find({ title });

      if (checkTestimonial.length > 0) {
        return res.status(202).json({
          message: "Testimonial Already Exists!!!",
          success: false,
        });

      } else {
        var options = {
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

        var imageURL = await helper.get(options);


        let link = youtube_link ? youtube_link : null


        let testimonialData = await Testimonial.create({
          title,
          description,
          testimonialImage: imageURL,
          category,
          rating,
          customerName,
          youtube_link: link
        });
        return res.status(201).json({
          message: "Add Successfully Testimonial Content",
          success: true,
        });

      }

    } else {
      return res.status(203).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      success: false,
    });
  }
});

testimaonialRouter.put("/updateTestimonial", async (req, res) => {
  try {
    const { title, description, id, category, rating, customerName, youtube_link } = req.body;
    const image = req?.files?.image?.tempFilePath;

    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      description !== "" &&
      description !== null &&
      description !== undefined &&
      category !== undefined &&
      category !== null &&
      category !== "" &&
      rating !== undefined &&
      rating !== null &&
      rating !== "" &&
      customerName !== undefined &&
      customerName !== null &&
      customerName !== ""
    ) {

      if (image !== undefined && image !== null && image !== "") {

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
        var imageURL = await helper.get(options);

      } else {

      let checkTestimonial = await Testimonial.findOne({ _id: id });

        var imageURL = checkTestimonial.testimonialImage;

      }


      let link = youtube_link ? youtube_link : null
      let updateTestimonial = await Testimonial.findOneAndUpdate(
        { _id: id },
        {
          title,
          description,
          testimonialImage: imageURL,
          category,
          rating,
          customerName,
          youtube_link: link
        }
      );

      if (
        updateTestimonial.length === 0 ||
        updateTestimonial === undefined ||
        updateTestimonial === null ||
        updateTestimonial === ""
      ) {
        return res.status(202).json({
          id,
          message: "Testimonial Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Testimonial Content",
          success: true,
        });
      }
    } else {
      return res.status(203).json({
        message: "Empty Field found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(203).json({
      message: "Something went wrong!!!",
      success: false,
    });
  }
});

testimaonialRouter.delete("/deleteTestimonial", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteTestimonial = await Testimonial.deleteOne({ _id: id });
      if (
        deleteTestimonial["deletedCount"] === 0 ||
        deleteTestimonial === null ||
        deleteTestimonial === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Testimonial Not found ",
          success: true,
        });
      } else if (
        deleteTestimonial["deletedCount"] === 1 ||
        deleteTestimonial !== null ||
        deleteTestimonial !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Testimonial Delete Successfully !!! ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong!!!",
      success: false,
    });
  }
});

// Get All Service
testimaonialRouter.get("/getAllTestimonial", async (req, res) => {
  try {
    let getAllTestimonial = await Testimonial.find();
    if (
      getAllTestimonial !== undefined &&
      getAllTestimonial.length !== 0 &&
      getAllTestimonial !== null
    ) {
      return res.status(200).json({
        getAllTestimonial,
        messge: "All Testimonial",
        success: true,
      });
    } else {
      return res.status(200).json({
        messge: "Testimonial Not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

module.exports = testimaonialRouter;
