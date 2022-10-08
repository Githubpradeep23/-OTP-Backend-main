const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const Otp = require("../models/otp");
const Banner = require("../models/banner");
const Testimonial = require("../models/testimonial");
const Service = require("../models/services");
const TrackWeight = require("../models/trackWeight");


const Notification = require("../models/notification");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");
const helper = require("../utils/helper");
const bcrypt = require("bcrypt");
const FeedBack = require("../models/userFeedBack");

const signup = async (req, res) => {
    try {

        const { number } = req.body;

        if (!number) {
            return res.status(200)
                .json([{ msg: "Number is required", res: "error", }]);
        }

        const existingUser = await User.findOne({ number });

        if (existingUser) {
            return res.status(200)
                .json([{ msg: "User with same number already exists!", res: "error", }]);
        }

        let digits = "0123456789";
        var OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        // let response = await axios.get(
        //     `http://www.smsstanch.in/API/sms.php?firstName=beats&password=123456&from=BEATSF&to=${number}&msg=Hi, Your OTP ${OTP}  to login &type=1&dnd_check=0&template_id=1007164482764680412`
        // );
        await Otp.deleteOne({ number: number })

        const otp = new Otp({
            number: number,
            otp: OTP,

        })

        await otp.save()

        return res.status(200).json([{
            message: `Verify your account.Your OTP is ${OTP}`,
            res: "success",
        }]);


    } catch (err) {
        res.send(err)
    }
};
const signupVerify = async (req, res) => {

    try {
        const { otp, number, firstname } = req.body;

        if (!number) {
            return res.status(200)
                .json([{ msg: "Number is required", res: "error", }]);
        }

        if (!otp) {
            return res.status(200)
                .json([{ msg: "Otp is required", res: "error", }]);
        }
        if (!firstname) {
            return res.status(200)
                .json([{ msg: "First Name is required", res: "error", }]);
        }

        const existingUser = await User.findOne({ number });

        if (existingUser) {
            return res.status(200)
                .json([{ msg: "User with same number already exists!", res: "error", }]);
        }

        const otpData = await Otp.findOne({ number: number })
        console.log(otpData)

        if (otpData === null || otpData.otp != otp) {
            return res.status(200)
                .json([{ msg: "Incorrect Otp", res: "error", }]);
        } else {
            const user = new User({
                number: number,
                firstName: firstname,
            })
            const userData = await user.save()
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            await Otp.deleteOne({ number: number })

            return res.status(200)

                .json([{ msg: "Otp has been verified successfully", data: userData, res: "success" }]);
        }
        // user = await user.save();
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        // // await helper.sendEmail(res,user.email,"Check Otp Server","Dummy Message body");

        // res.status(200).json({ token, ...user._doc, success: true });
        // OTP = "";
    } catch (e) {
        res.status(500).json({ error: e.message, success: false });
    }
}

const signin = async (req, res) => {
    try {
        const { number } = req.body;

        if (!number) {
            return res.status(200)
                .json([{ msg: "Number is required", res: "error", }]);
        }
        signinUser = await User.findOne({ number });


        if (!signinUser) {
            return res.status(200)
                .json([{ msg: "This number does not Exists!!!", res: "error", }]);
        }
        let digits = "0123456789";
        var OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        // let response = await axios.get(
        //     `http://www.smsstanch.in/API/sms.php?firstName=beats&password=123456&from=BEATSF&to=${number}&msg=Hi, Your OTP ${OTP}  to login &type=1&dnd_check=0&template_id=1007164482764680412`
        // );
        await Otp.deleteOne({ number: number })

        const otp = new Otp({
            number: number,
            otp: OTP,
        })

        await otp.save()
        return res.status(200).json([{
            message: `Your login verfication. OTP is ${OTP}`,
            res: "success",
        }]);
    } catch (err) {
        res.send(err)
    }
}
const signinVerify = async (req, res) => {

    try {
        const { otp, number } = req.body;

        if (!number) {
            return res.status(200)
                .json([{ msg: "Number is required", res: "error", }]);
        }

        if (!otp) {
            return res.status(200)
                .json([{ msg: "Otp is required", res: "error", }]);
        }


        const userData = await User.findOne({ number });


        if (!userData) {
            return res.status(200)
                .json([{ msg: "This number does not Exists!!!", res: "error", }]);
        }
        const otpData = await Otp.findOne({ number: number })
        console.log(userData)

        if (otpData === null || otpData.otp != otp) {
            return res.status(200)
                .json([{ msg: "Incorrect Otp", res: "error", }]);
        } else {
            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY);
            // console.log(token);
            await Otp.deleteOne({ number: number })

            return res.status(200)

                .json([{ msg: "Otp has been verified successfully", data: userData, token: token, res: "success" }]);

        }

    }
    catch (err) {
        res.send(err)
    }

}


const categoryBanner = async (req, res) => {

    try {
        const { category } = req.body;

        if (!category) {
            return res.status(200)
                .json([{ msg: "Category is required", res: "error", }]);
        }

        const bannerData = await Banner.find({ category: category });
        console.log(bannerData);
        return res.status(200)
            .json([{ msg: "Category Banner Data", data: bannerData, res: "success" }]);

    }
    catch (err) {
        res.send(err)
    }

}

const allTestimonials = async (req, res) => {

    try {
        const testimonialsData = await Testimonial.find();
        console.log(testimonialsData);
        return res.status(200)
            .json([{ msg: "All testimonials Data", data: testimonialsData, res: "success" }]);

    }
    catch (err) {
        res.send(err)
    }

}

const allBanners = async (req, res) => {

    try {
        const bannersData = await Banner.find();
        console.log(bannersData);
        return res.status(200)
            .json([{ msg: "All Banners Data", data: bannersData, res: "success" }]);
    }
    catch (err) {
        res.send(err)
    }

}

const allServices = async (req, res) => {

    try {
        const servicesData = await Service.find();
        console.log(servicesData);
        return res.status(200)
            .json([{ msg: "All Services Data", data: servicesData, res: "success" }]);
    }
    catch (err) {
        res.send(err)
    }

}

const trackTrace = async (req, res) => {

    try {
        const { userID, weight, to, from, ht, PBF, SMM, Waist, PushUp, PullUps } =
            req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }
        if (!weight) {
            return res.status(200)
                .json([{ msg: "Weight is required", res: "error", }]);
        }

        if (!from) {
            return res.status(200)
                .json([{ msg: "From Date is required", res: "error", }]);
        }
        if (!to) {
            return res.status(200)
                .json([{ msg: "To Date is required", res: "error", }]);
        }
        console.log("userID, weight, date ", userID, weight, to, from);
        // try {

        const userData = await User.findOne({ _id: userID });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const trackTracedata = await TrackWeight.create({
            userID,
            weight,
            to,
            from,
            ht,
            PBF,
            SMM,
            Waist,
            PushUp,
            PullUps,
        });
        // console.log('track',trackTracedata);

        return res.status(200)
            .json([{ msg: "Track & Trace data added sucessfully!!", data: trackTracedata, res: "success" }]);


    }
    catch (err) {
        // res.send(err)
        console.log(err)
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}


module.exports = { signup, signupVerify, signin, signinVerify, categoryBanner, allTestimonials, allBanners, allServices, trackTrace };