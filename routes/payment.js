const express = require("express");
const paymentRouter = express.Router();
const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const Voucher = require("../models/voucher");
const axios = require("axios");

// Payment Route
paymentRouter.post("/paymentByPrice", async (req, res) => {
  try {
    const { voucher_id } = req.body;
    if (voucher_id !== undefined && voucher_id !== "" && voucher_id !== null) {
      let checkVoucher = await Voucher.findById({ _id: voucher_id });
      if (checkVoucher !== null && checkVoucher !== undefined) {
        let amount = checkVoucher["amount"];
        let discount_coins = checkVoucher["discount_coins"];
        let user_id = checkVoucher["user_id"];
        try {
          let instance = new Razorpay({
            key_id: "rzp_test_2wF62PhRdmmwKV",
            key_secret: "GrGuOlQtc4fhEHLMZI5upf2A",
          });

          let order = await instance.orders.create({
            // amount: amount * 100,
            amount: amount,
            currency: "INR",
            receipt: "receipt#1",
          });

          console.log(
            "🚀 ~ file: payment.js ~ line 26 ~ paymentRouter.post ~ order",
            order
          );

          let response = await axios.post("https://candidateapp.herokuapp.com/api/v1/addCoin", {
            id: user_id,
            coin: discount_coins
          });
          console.log("🚀 ~ file: payment.js ~ line 39 ~ paymentRouter.post ~ response", response.data)

          let paymentDoc = await Payment.create({
            voucher_id,
            orderDetials: order,
          });

          console.log(
            "🚀 ~ file: payment.js ~ line 22 ~ paymentRouter.post ~ order",
            order
          );
          return res.status(200).json({
            paymentDoc,
            amount,
            message: "Payment Succ Successfully",
            success: true,
          });
        } catch (error) {
          return res.status(500).json({
            message: error.message,
            success: false,
          });
        }
      } else {
        return res.status(422).json({
          message: "Payment Faild.Voucher Not found. Invalid Voucher id",
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
    console.log(
      "🚀 ~ file: payment.js ~ line 31 ~ paymentRouter.post ~ error",
      error
    );
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// Payment By Coins 

// Get All Payments Records
paymentRouter.get("/getAllPaymentsRecords", async (req, res) => {
  try {
    let voucherRecord = await Voucher.find()
    let getAllPaymentsRecords = await Payment.find().populate(
      {
        path: 'voucher_id',
        populate: [{
          path: 'user_id',
          model: 'User',
        }, {
          path: 'service_id',
          model: 'GYM_SERVICE',
        }]
      },
    ).exec();
    if (
      getAllPaymentsRecords.lenght === 0 ||
      getAllPaymentsRecords === undefined ||
      getAllPaymentsRecords === null
    ) {
      return res.status(422).json({
        message: "Payments Records Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        getAllPaymentsRecords,
        message: "Get All Payments Records Successfully",
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

module.exports = paymentRouter;
