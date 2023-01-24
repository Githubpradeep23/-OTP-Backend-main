const express = require("express");
const Copuan = require("../models/copuan");
const Notification = require("../models/notification");
const copuanRouter = express.Router();
const CouponJS = require('couponjs');

// Add Copuan
copuanRouter.post("/addCopuan", async (req, res) => {
  try {
    const { copuanTitle, expireAt, discount_percentage, copuanCode, discount_amount } = req.body;


    if (
      (copuanTitle !== null &&
      copuanTitle !== undefined &&
      copuanTitle !== "" &&
      expireAt !== null &&
      expireAt !== undefined &&
      expireAt !== "" &&


      copuanCode !== null &&
      copuanCode !== undefined &&
      copuanCode !== "") &&

      ((discount_percentage !== null &&
      discount_percentage !== undefined &&
      discount_percentage !== "") || 
      (discount_amount !== null &&
        discount_amount !== undefined &&
        discount_amount !== ""))
    ) {
      let currentTime = Date.now();
      let created = new Date(currentTime);
      

      let addCopuanCode = await Copuan.create({
        copuanTitle,
        discount_percentage : discount_percentage ?? undefined,
        discount_amount : discount_amount ?? undefined,
        copuanCode: copuanCode,
        createdAt: created,
        expireAt: expireAt,
      });

      return res.status(200).json({
        addCopuanCode,
        message: "Add Copuan Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "All feild is reuired !!!",
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
          message: "Coupan Not found ",
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


copuanRouter.put("/updateCopuan", async (req, res) => {
  console.log(req.body)
  try {
    const { copuanTitle, expireAt, discount_percentage, id, copuanCode, discount_amount } = req.body;

    console.log({copuanTitle, expireAt, discount_percentage, id, copuanCode, discount_amount});
    if (
      (id !== null &&
      id !== undefined &&
      id !== "" &&
      copuanTitle !== null &&
      copuanTitle !== undefined &&
      copuanTitle !== "" &&
      expireAt !== null &&
      expireAt !== undefined &&
      expireAt !== "" &&
      copuanCode !== null &&
      copuanCode !== undefined &&
      copuanCode !== "") &&
      ((discount_percentage !== null &&
        discount_percentage !== undefined &&
        discount_percentage !== "") || 
        (discount_amount !== null &&
          discount_amount !== undefined &&
          discount_amount !== ""))
    ) {
      let currentTime = Date.now();

      let updatedAt = new Date(currentTime);

      let updateCoupan = await Copuan.updateOne(
        { _id: id },
        {
          copuanTitle,
          discount_percentage: discount_percentage ?? undefined,
          discount_amount: discount_amount ?? undefined,
          copuanCode,
          updatedAt: updatedAt,
          expireAt
        }
      );

      if (
        updateCoupan.length === 0 ||
        updateCoupan === undefined ||
        updateCoupan === null ||
        updateCoupan === ""
      ) {
        return res.status(200)
          .json([{ msg: "Branch not found!!!", res: "error", }]);
      } else {
        const userData = await Copuan.findOne({ _id: id })
        return res.status(200)
          .json([{ msg: "Coupan  updated successflly", data: userData, res: "success" }]);
      }

    } else {
      return res.status(200).json({
        message: "All feild is required !!!",
        success: false,
      });

    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
});

// Apply Coupon
copuanRouter.post("/applyCoupon", async (req, res) => {
  try {
    const { id, amount } = req.body;
    if (
      id !== undefined &&
      id !== "" &&
      id !== null &&
      amount !== undefined &&
      amount !== null &&
      amount !== ""
    ) {
      console.log("id, amount", id, amount);
      let checkCoupon = await Copuan.findById({ _id: id });
      if (checkCoupon !== null && checkCoupon !== undefined) {
        let discount_percentage = checkCoupon["discount_percentage"];
        let discount_amount = checkCoupon["discount_amount"];
        if(discount_percentage !== null && discount_percentage !== undefined && discount_percentage !== '') {
          let discountedAmount = (amount * discount_percentage / 100);
          let remainingAmount = amount - discountedAmount;
          return res.status(200).json({
            message: "Coupon applied successfully",
            success: true,
            data: {
                originalAmount: amount,
                remainingAmount,
                discount: discountedAmount
            }
          });
        } else {
          let discountedAmount = discount_amount;
          let remainingAmount = amount - discountedAmount;
          return res.status(200).json({
            message: "Coupon applied successfully",
            success: true,
            data: {
                originalAmount: amount,
                remainingAmount,
                discount: discountedAmount
            }
          });
        }
      } else {
        return res.status(200).json({
          id,
          message: "Coupon Not Found !!!",
          success: false,
        });
      }
    }else {
        return res.status(400).json({
          message: "Empty Field found",
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

// Remove Coupon
copuanRouter.post("/removeCoupon", async (req, res) => {
  try {
    const { id, amount, discount } = req.body;
    if (
      id !== undefined &&
      id !== "" &&
      id !== null &&
      amount !== undefined &&
      amount !== null &&
      amount !== ""
    ) {
      console.log("id, amount", id, amount);
        let originalAmount = amount + discount;
        return res.status(200).json({
          message: "Coupon applied successfully",
          success: true,
          data: {
              originalAmount,
          }
        });
    }else {
        return res.status(400).json({
          message: "Empty Field found",
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

module.exports = copuanRouter;