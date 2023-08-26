const express = require("express");
const paymentRouter = express.Router();
const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const Voucher = require("../models/voucher");
const axios = require("axios");
const mongoose = require('mongoose');

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
    ).populate({ 
      path: 'service_id',
      populate: [{
        path: 'branch_id',
        model: 'GYM_BRANCH'
      }] 
   }).populate({ 
    path: 'copuan_id',
    model: 'Copuan',
   }).populate({ 
    path: 'userID',
    model: 'User',
  }).exec();
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

paymentRouter.get("/getPaymentByUser/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    let payments = await Payment.find({ userId: mongoose.Types.ObjectId(userId)}).populate(
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
      payments !== undefined &&
      payments.length !== 0 &&
      payments !== null
    ) {
      return res.status(200).send({
        payments,
        messge: "All Payments of user",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Payments does not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

paymentRouter.get("/getRevenueByService", async (req, res) => {
    try {
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let allpayments = await Payment.find({
          createdAt: {
              $gte: firstDay, 
              $lte: lastDay
          }
      }).populate('service_id').exec();
      let getAllPaymentsMap = new Map();
      let totalCount = 0;
      for(let payment of allpayments) {
          if(!getAllPaymentsMap.has(payment.service_id[0]._id)) {
              getAllPaymentsMap.set(payment.service_id[0]._id, {
              serviceId: payment.service_id[0]._id,
              serviceName: payment.service_id[0].title,
              price: Number(payment.price)
            })
          } else {
            serviceCount = getAllPaymentsMap.get(payment.service_id[0]._id);
              getAllPaymentsMap.set(payment.service_id[0]._id, {
                serviceId: serviceCount.serviceId,
                serviceName: payment.service_id[0].title,
                price: Number(serviceCount.price) + Number(payment.price)
            })
          }
          totalCount = totalCount + Number(payment.price);
      }
      let services = [];
      for(let paymentValue of [...getAllPaymentsMap.values()]) {
          services.push({
              ...paymentValue,
              percentage : (paymentValue.price * 100) / totalCount
          })
      }
      return res.status(200).send({
      revenue: services ,
      messge: "All Revenues by service",
      success: true,
      });
  } catch (err) {
      return res.status(200)
          .json([{ msg: err.message, res: "error" }]);
  }
});

module.exports = paymentRouter;
