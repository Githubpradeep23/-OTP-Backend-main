const express = require("express");
const Banner = require("../models/banner");
const bannerRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");

// Add Banner
bannerRouter.post("/addBanner", async (req, res) => {
  try {
    const image = req?.files?.image?.tempFilePath;
    console.log(
      "🚀 ~ file: banner.js ~ line 10 ~ bannerRouter.post ~ image",
      image
    );
    const { title, category, description } = req.body;
    if (
      image !== null &&
      image !== undefined &&
      image !== "" &&
      title !== "" &&
      title !== undefined &&
      title !== null &&
      description !== "" &&
      description !== undefined &&
      description !== null &&
      category !== null &&
      category !== "" &&
      category !== undefined
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
      let BannerData = await Banner.create({
        bannerImage: imageURL,
        title,
        description,
        category,
      });
      let id = BannerData["_id"];
      return res.status(200).json({
        id,
        message: "Add Banner Image Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found.All Fields are required",
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

// Update Banner
bannerRouter.put("/updateBanner", async (req, res) => {
  try {
    const image = req?.files?.image?.tempFilePath;
    const { id, title, category, description } = req.body;
    if (
      image !== null &&
      image !== undefined &&
      image !== "" &&
      id !== null &&
      id !== undefined &&
      id !== "" &&
      title !== "" &&
      title !== undefined &&
      title !== null &&
      description !== "" &&
      description !== undefined &&
      description !== null &&
      category !== null &&
      category !== "" &&
      category !== undefined
    ) {
      console.log("Hit banner");
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

      let updateBanner = await Banner.findOneAndUpdate(
        { _id: id },
        { bannerImage: imageURL, title, description, category }
      );

      if (
        updateBanner.length === 0 ||
        updateBanner === undefined ||
        updateBanner === null ||
        updateBanner === ""
      ) {
        return res.status(200).json({
          id,
          message: "Banner Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Banner Content",
          success: true,
        });
      }
    } else {
      return res.status(200).json({
        message: "Empty Field found. Id And Image field are required !!!",
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

// Delete Banner
bannerRouter.delete("/deleteBanner", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteBanner = await Banner.deleteOne({ _id: id });

      if (
        deleteBanner["deletedCount"] === 0 ||
        deleteBanner === null ||
        deleteBanner === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Banner Not found ",
          success: true,
        });
      } else if (
        deleteBanner["deletedCount"] === 1 ||
        deleteBanner !== null ||
        deleteBanner !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Banner Delete Successfully !!! ",
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

bannerRouter.get("/getAllBanner", async (req, res) => {
  try {
    let getAllBanner = await Banner.find();
    if (
      getAllBanner !== undefined &&
      getAllBanner.length !== 0 &&
      getAllBanner !== null
    ) {
      return res.status(200).send({
        getAllBanner,
        messge: "All Banners",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Banner Not Exist",
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
bannerRouter.get("/getAllBannerImages", async (req, res) => {
  try {
    let getAllBanner = await Banner.find();
    if (
      getAllBanner !== undefined &&
      getAllBanner.length !== 0 &&
      getAllBanner !== null
    ) {
      let images = await getAllBanner.map((values) => {
        return values.bannerImage;
      });
      return res.status(200).send({
        images,
        messge: "Get Successfully All Banners Images",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Banner Not Exist",
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

bannerRouter.post("/getBannerByID", async (req, res) => {
  try {
    const { id } = req.body;

    const bannerDoc = await Banner.findOne({ _id: id });

    if (bannerDoc) {
      return res.status(200).send({
        bannerDoc,
        messge: "Get Banners Successfully",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Banner Not Exist",
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

bannerRouter.post("/getBannerByCategory", async (req, res) => {
  try {
    const { category } = req.body;
    let bannerByCategory = await Banner.find({ category });
    if (
      bannerByCategory.length === 0 ||
      bannerByCategory === undefined ||
      bannerByCategory === ""
    ) {
      return res.status(404).json({
        message: "Banner Not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        bannerByCategory,
        message: "Get Banner Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: true,
    });
  }
});

module.exports = bannerRouter;
