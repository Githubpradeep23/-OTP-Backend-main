const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const Notification = require("../models/notification");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");
const helper = require("../utils/helper");
const bcrypt = require("bcrypt");
const FeedBack = require("../models/userFeedBack");
let OTP
const signup = async (req, res) => {
    try {
        
        const {  number } = req.body;

        if (!number) {
            return res.status(200)
            .json([{ msg: "Number is required",res: "error", }]);
        }

        const existingUser = await User.findOne({ number });

        if (existingUser) {
            return res.status(200)
            .json([{ msg: "User with same number already exists!",res: "error", }]);
        }

        let digits = "0123456789";
        OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        // let response = await axios.get(
        //     `http://www.smsstanch.in/API/sms.php?firstName=beats&password=123456&from=BEATSF&to=${number}&msg=Hi, Your OTP ${OTP}  to login &type=1&dnd_check=0&template_id=1007164482764680412`
        // );

        return res.status(200).json([{
            message: `Verify your account.Your OTP is ${OTP}`,
            res: "success",
        }]);

      
    } catch (err) {
        res.send(err)
    }
};
// const signupVerify = async (req, res) => {

//     try {
//       const { otp } = req.body;
//       if (otp != OTP) {
//         return res.status(422).json({ msg: "Incorrect Otp.", success: false });
//       }
//       user = await user.save();
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  
//       // await helper.sendEmail(res,user.email,"Check Otp Server","Dummy Message body");
  
//       res.status(200).json({ token, ...user._doc, success: true });
//       OTP = "";
//     } catch (e) {
//       res.status(500).json({ error: e.message, success: false });
//     }
// }


module.exports = { signup };