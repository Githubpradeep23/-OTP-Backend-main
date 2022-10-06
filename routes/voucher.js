const express = require("express");
const Copuan = require("../models/copuan");
const Voucher = require("../models/voucher");
const voucherRouter = express.Router();

// GenerateVoucher
voucherRouter.post("/generateVoucher", async (req, res) => {
  try {
    let {
      user_id,
      service_id,
      amount,
      payment_mode,
      copuan_code
    } = req.body;
    if (
      user_id !== "" &&
      user_id !== undefined &&
      user_id !== null &&
      service_id !== "" &&
      service_id !== undefined &&
      service_id !== null &&
      payment_mode !== null &&
      payment_mode !== undefined &&
      payment_mode !== "" &&
      amount !== "" &&
      amount !== null &&
      amount !== ""
    ) {
      let checkVoucher = await Voucher.find({ service_id });
      if (checkVoucher.length === 0 || checkVoucher === null) {
        if (payment_mode === "rupee") {
          if (copuan_code !== null && copuan_code !== "" && copuan_code !== undefined) {
            let copuanDocument = await Copuan.findOne({ copuanCode: copuan_code });
            if (copuanDocument === null || copuanDocument === "" || copuanDocument === undefined) {
              return res.status(422).json({
                message: "Invaild Copuan Code.",
                success: false
              });
            }
            else {
              let discount_per = copuanDocument["discount_percentage"];
              let Discount = amount - (amount * discount_per / 100);
              let ActualDiscount = amount - Discount
              let voucher = await Voucher.create({
                user_id,
                service_id,
                discount_percentage: discount_per,
                discount_coins: ActualDiscount,
                amount,
                payment_mode,
              });
              return res.status(200).json({
                voucher,
                message: "Vocher Successfully Generated",
                success: true
              });
            }
          }
          if (copuan_code === null || copuan_code === "" || copuan_code === undefined) {
            let voucher = await Voucher.create({
              user_id,
              service_id,
              discount_percentage: 0,
              discount_coins: 0,
              amount,
              payment_mode,
            });
            return res.status(200).json({
              voucher,
              message: "Vocher Successfully Generated",
              success: true
            });
          }
        }
        if (payment_mode === "coins") {
          let voucher = await Voucher.create({
            user_id,
            service_id,
            discount_percentage: 0,
            discount_coins: 0,
            amount,
            payment_mode,
          });
          return res.status(200).json({
            voucher,
            message: "Vocher Successfully Generated",
            success: true
          });
        }
      }
      else {
        return res.status(422).json({
          message: "Voucher Already Generated",
          success: false,
        });
      }
    }
    else {
      return res.status(422).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: voucher.js ~ line 58 ~ voucherRouter.post ~ error", error)
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

module.exports = voucherRouter;
