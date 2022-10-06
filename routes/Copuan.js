const express = require("express");
const Copuan = require("../models/copuan");
const Notification = require("../models/notification");
const copuanRouter = express.Router();
const CouponJS = require('couponjs');

// Add Copuan
copuanRouter.post("/addCopuan", async (req, res) => {
  try {
    const { copuanTitle, expirationTime, discount_percentage, user_id } = req.body;

    if (
      copuanTitle !== null &&
      copuanTitle !== undefined &&
      copuanTitle !== "" &&
      expirationTime !== null &&
      expirationTime !== undefined &&
      expirationTime !== "" &&
      user_id !== null &&
      user_id !== undefined &&
      user_id !== "" &&
      discount_percentage !== null &&
      discount_percentage !== undefined &&
      discount_percentage !== ""
    ) {
      const coupon = new CouponJS();
      const myCoupon = coupon.generate({
        length: 8
      });
      let currentTime = Date.now();
      let created = new Date(currentTime);
      let exp = new Date(currentTime + (expirationTime * 1000)
      );

      let addCopuanCode = await Copuan.create({
        user_id,
        copuanTitle,
        discount_percentage,
        copuanCode: myCoupon,
        createdAt: created,
        expireAt: exp,
      });

      let copuanCode_id = addCopuanCode["_id"];

      let notification = await Notification.create({
        user_id,
        copuanCode_id,
        message: "Copuan Aloted Successfully"
      });
      console.log("🚀 ~ file: Copuan.js ~ line 51 ~ copuanRouter.post ~ notification", notification)

      return res.status(200).json({
        addCopuanCode,
        message: "Add Copuan Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found.Service Id is required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// Delete Copuan
copuanRouter.delete("/deleteCopuan", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteCopuan = await Copuan.deleteOne({ _id: id });

      if (
        deleteCopuan["deletedCount"] === 0 ||
        deleteCopuan === null ||
        deleteCopuan === undefined
      ) {
        return res.status(200).json({
          id,
          message: "Banner Not found ",
          success: true,
        });
      } else if (
        deleteCopuan["deletedCount"] === 1 ||
        deleteCopuan !== null ||
        deleteCopuan !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Copuan Delete Successfully !!! ",
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


//GetAll Copuan 
copuanRouter.get("/getAllCopuan", async (req, res) => {
  try {
    let getAllCopuan = await Copuan.find();
    if (getAllCopuan.length === 0 || getAllCopuan === undefined || getAllCopuan === null) {
      return res.status(422).json({
        message: "Recently No Copuan Exists",
        success: false
      });
    }
    else {
      return res.status(200).json({
        getAllCopuan,
        message: "Get All Copuan Successfully",
        success: true
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
});



module.exports = copuanRouter;


