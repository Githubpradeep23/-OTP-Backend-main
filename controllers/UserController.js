const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const Otp = require("../models/otp");
const Banner = require("../models/banner");
const Testimonial = require("../models/testimonial");
const Service = require("../models/services");
const TrackWeight = require("../models/trackWeight");
const GYM_SERVICE = require("../models/gymServices");
const GYM_BRANCH = require("../models/gymBranch");
const demoBooking = require("../models/demoBooking");
const bookPackage = require("../models/bookPackage");
const FAQ = require("../models/faq");
const SETTING = require("../models/setting");
const QUERY = require("../models/query");
const PAYMENT = require("../models/payment");
const Consultation = require("../models/Consultaion")

const Coach = require("../models/coach");

const TalkToCoach = require("../models/talkToCoach");


const Notification = require("../models/notification");
const PushNotification = require("../models/pushNotification");


const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");
const helper = require("../utils/helper");
const bcrypt = require("bcrypt");
const FeedBack = require("../models/userFeedBack");
const mongoose = require('mongoose');
const Razorpay = require("razorpay");

const signup = async (req, res) => {
    try {

        const { number } = req.body;

        if (!number) {
            return res.status(200)
                .json([{ msg: "Number is required", res: "error", }]);
        }
        let digits = "0123456789";
        var OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        try {

            var msg = `Hi, Your OTP to login Beats Fitness App is ${OTP} This OTP can be used only once and is valid for 10 min only.Thank you.       TeamBeatsFitness`;

            let response = await axios.get(
                `http://www.smsstanch.in/API/sms.php?username=beats&password=123456&from=BEATSF&to=${number}&msg=${msg}&dnd_check=0&template_id=1007164482764680412`

            );
            await Otp.deleteOne({ number: number })

            const otp = new Otp({
                number: number,
                otp: OTP,
            })

            await otp.save()
        } catch (err) {
            return res.status(200)
                .json([{ msg: err.message, res: "error" }]);
        }

        const existingUser = await User.findOne({ number });

        if (existingUser) {
            return res.status(200)
                .json([{ msg: "User with same number already exists!", number: number, res: "success", }]);
        } else {
            return res.status(200)
                .json([{ msg: "New User!", number: number, res: "success", }]);

        }

    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }
}
const signupVerify = async (req, res) => {

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


        const existingUser = await User.findOne({ number });



        const otpData = await Otp.findOne({ number: number })
        // console.log(otpData)

        if (otpData === null || otpData.otp != otp) {
            return res.status(200)
                .json([{ msg: "Incorrect Otp", res: "error", }]);
        } else {
            // await Otp.deleteOne({ number: number })

            if (existingUser) {
                return res.status(200)
                    .json([{ msg: "User with same number already exists & otp has verified & now redirect to homepage!", data: existingUser, res: "success" }]);

            } else {

                const user = new User({
                    number: number,
                })
                const userData = await user.save()
                // // await Otp.deleteOne({ number: number })

                return res.status(200)
                    .json([{ msg: "New user & otp verified", data: userData, res: "success" }]);

            }

        }

    } catch (err) {
        return res.status(202)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const registerUser = async (req, res) => {

    try {
        const { userID, firstName } = req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!firstName) {
            return res.status(200)
                .json([{ msg: "firstName is required", res: "error", }]);
        }



        let updateUser = await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(userID) },
            {
                firstName,
            }
        );

        if (
            updateUser === undefined ||
            updateUser === null ||
            updateUser.length === 0 ||
            updateUser === ""
        ) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        } else {
            const userData = await User.findOne({ _id: mongoose.Types.ObjectId(userID) })
            return res.status(200)
                .json([{ msg: "User registred successfully", data: userData, res: "success" }]);
        }



    } catch (err) {
        return res.status(202)
            .json([{ msg: err.message, res: "error" }]);
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


        try {
            var msg = `Hi, Your OTP to login Beats Fitness App is ${OTP} This OTP can be used only once and is valid for 10 min only.Thank you.       TeamBeatsFitness`;

            let response = await axios.get(
                `http://www.smsstanch.in/API/sms.php?username=beats&password=123456&from=BEATSF&to=${number}&msg=${msg}&dnd_check=0&template_id=1007164482764680412`

            );

            await Otp.deleteOne({ number: number })

            const otp = new Otp({
                number: number,
                otp: OTP,
            })

            await otp.save()
            return res.status(200).json([{
                message: `Your login verfication. OTP is ${OTP}`,
                number: number,
                otp: OTP,
                res: "success",
            }]);

        } catch (err) {
            return res.status(200)
                .json([{ msg: err.message, res: "errors", }]);
        }


    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
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
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}
const allBanners = async (req, res) => {

    try {
        const bannersData = await Banner.find();
        // const bannerImage = [];

        // bannersData.map((item) =>
        //     bannerImage.push(item.bannerImage)
        // );

        return res.status(200)
            .json([{ msg: "All Banners Data", data: bannersData, res: "success" }]);
    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
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
        // const bannerImage = [];

        // bannerData.map((item) =>
        //     bannerImage.push(item.bannerImage)
        // );
        // console.log(bannerData);
        return res.status(200)
            .json([{ msg: "Category Banner Data", data: bannerData, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
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
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const categoryTestimonials = async (req, res) => {

    try {
        const { category } = req.body;

        if (!category) {
            return res.status(200)
                .json([{ msg: "Category is required", res: "error", }]);
        }

        const testimonialsData = await Testimonial.find({ category: category });
        return res.status(200)
            .json([{ msg: "Category Testimonial Data", data: testimonialsData, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
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
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}
const categoryServices = async (req, res) => {

    try {
        const { category } = req.body;

        if (!category) {
            return res.status(200)
                .json([{ msg: "Category is required", res: "error", }]);
        }

        const serviceData = await GYM_SERVICE.find({ category: category });
        return res.status(200)
            .json([{ msg: "Category Service Data", data: serviceData, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const addTrackTrace = async (req, res) => {

    try {
        const { userID, weight, to, from, ht, PBF, SMM, Waist, PushUp, PullUps } =
            req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }
        // if (!weight) {
        //     return res.status(200)
        //         .json([{ msg: "Weight is required", res: "error", }]);
        // }

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
        if (!weight || weight==null) {
            var weights=0;
        }else{
            var weights=weight;

        }

        if (!ht || ht==null) {
            var hts=0;
        }else{
            var hts=ht;

        }

        if (!PBF || PBF==null) {
            var PBFs=0;
        }else{
            var PBFs=PBF;

        }

        if (!SMM || SMM==null) {
            var SMMs=0;
        }else{
            var SMMs=SMM;

        }
        if (!Waist || Waist==null) {
            var Waists=0;
        }else{
            var Waists=Waist;

        }

        if (!PushUp || PushUp==null) {
            var PushUps=0;
        }else{
            var PushUps=PushUp;

        }

        if (!PullUps || PullUps==null) {
            var PullUpss=0;
        }else{
            var PullUpss=PullUps;

        }


        const trackTracedata = await TrackWeight.create({
            userID: mongoose.Types.ObjectId(userID),
            weight:weights,
            to,
            from,
            ht:hts,
            PBF:PBFs,
            SMM:SMMs,
            Waist:Waists,
            PushUp:PushUps,
            PullUps:PullUpss,
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

const userTrackTraceList = async (req, res) => {

    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }

        const trackTraceData = await TrackWeight.find({ userID: userID });
        // console.log(trackTraceData);
        return res.status(200)
            .json([{ msg: "User Track & Trace Data !!", data: trackTraceData, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const userTrackTraceListGraph = async (req, res) => {

    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }

        const trackTraceData = await TrackWeight.find({ userID: userID });
        console.log(trackTraceData);

        const weight = [];
        const SMM = [];
        const Waist = [];
        const PushUp = [];
        const PullUps = [];

        const PBF = [];
        const ht = [];



        trackTraceData.map((item) =>
            weight.push(item.weight) &&
            SMM.push(item.SMM) &&
            Waist.push(item.Waist) &&
            PushUp.push(item.PushUp) &&
            PullUps.push(item.PullUps) &&
            PBF.push(item.PBF) &&
            ht.push(item.ht)




        );
        // console.log(trackTraceData);
        return res.status(200)
            .json([{ msg: "User Track & Trace Data !!", weight: weight, SMM: SMM, PushUp: PushUp, PullUps: PullUps, Waist: Waist, PBF: PBF, ht: ht, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

// get user profile
const getUserProfile = async (req, res) => {

    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }


        const userData = await User.findOne({ _id: userID });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        return res.status(200)
            .json([{ msg: "User Proile Data", data: userData, res: "success" }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}
const updateUserProfile = async (req, res) => {
    try {
        const { userID, firstName, lastName, DOB, gender, number, email } = req.body;
        let image = req?.files?.profilePicture?.tempFilePath;

        console.log('image', image)

        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }

        // if (!firstName) {
        //     return res.status(200)
        //         .json([{ msg: "firstName is required", res: "error", }]);
        // }
        // if (!lastName) {
        //     return res.status(200)
        //         .json([{ msg: "lastName is required", res: "error", }]);
        // }
        // if (!DOB) {
        //     return res.status(200)
        //         .json([{ msg: "DOB is required", res: "error", }]);
        // }
        // if (!gender) {
        //     return res.status(200)
        //         .json([{ msg: "gender is required", res: "error", }]);
        // }
        // if (!number) {
        //     return res.status(200)
        //         .json([{ msg: "number is required", res: "error", }]);
        // }
        // if (!email) {
        //     return res.status(200)
        //         .json([{ msg: "email is required", res: "error", }]);
        // }


        if (image !== "" &&
            image !== undefined &&
            image !== null) {

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

            console.log('yes')

        } else {

            var dataimage = await User.findOne({ _id: userID })
            var imageURL = dataimage.profilePicture

            console.log('no')
        }


        console.log('imageurl', imageURL)





        let updateUser = await User.findOneAndUpdate(
            { _id: userID },
            {
                firstName,
                lastName,
                DOB,
                gender,
                number,
                email,
                profilePicture: imageURL,
            }
        );

        if (
            updateUser.length === 0 ||
            updateUser === undefined ||
            updateUser === null ||
            updateUser === ""
        ) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        } else {
            const userData = await User.findOne({ _id: userID })
            return res.status(200)
                .json([{ msg: "User Profile updated successflly", data: userData, res: "success" }]);
        }

    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }
}

//GetBranch Detials by Service Name
const branchDetailsBySerivceName = async (req, res) => {

    try {
        const { serviceTitle } = req.body;
        if (!serviceTitle) {
            return res.status(200)
                .json([{ msg: "Service Title is required", res: "error", }]);

        }
        // *****************Collection Relation QUERY Start************

        // const data = await demoBooking.aggregate([
        //     {
        //         $match: {
        //             "title": serviceTitle
        //         }
        //     },

        //     {
        //         $lookup: {
        //             from: 'users', localField: 'user_id',
        //             foreignField: '_id', as: 'userData'
        //         }
        //     },

        //     {
        //         $lookup: {
        //             from: 'gym_services', localField: 'service_id',
        //             foreignField: '_id', as: 'serviceData'
        //         }
        //     },
        // ]).exec((err, result) => {
        //     if (err) {
        //         console.log("error", err)
        //         return res.status(200)
        //             .json([{ msg: err.message, res: "error" }]);
        //     }
        //     if (result) {
        //         if (result === null || result === undefined || result === "" || result.length === 0) {

        //             return res.status(200)
        //                 .json([{ msg: "Service Not found", res: "error" }]);
        //         } else {

        //             return res.status(200)
        //                 .json([{ msg: "Service Details Data", data: result, res: "success" }]);
        //         }
        //     }
        // });

        // *****************Collection Relation QUERY End****************




        const singleServiceDetials = await GYM_SERVICE.find({ title: serviceTitle }).populate("branch_id")
        // var datats=[];
        // console.log()
        // singleServiceDetials.map((item)=>{
        //     // push (datats,item.title)
        //     var obj = {};
        //     obj['serviceId']=item._id
        //     obj["title"]=item.title
        //     obj["description"]=item.description
        //     obj["bannerImage"]=item.bannerImage
        //     obj["category"]=item.category
        //     obj["price"]=item.price
        //     obj["duration"]=item.duration!=undefined?item.duration:''


        //     // 6320350963e172a6eea28c15




        //     // datats.push(obj)
        //     item.branch_id.map((branch)=>{
        //         // push (datats,item.title)
        //         // datats.push(branch.managerName)
        //     // var obj = {};

        //     obj["MangerName"]=branch.managerName
        //     obj["manager_Phone_Number"]=branch.manager_Phone_Number
        //     obj["branchName"]=branch.branchName
        //     obj["branchCode"]=branch.branchCode
        //     obj["branchCity"]=branch.branchCity
        //     obj["branchPhoneNumber"]=branch.branchPhoneNumber
        //     obj["opening_branchTiming"]=branch.opening_branchTiming
        //     obj["closing_branchTiming"]=branch.closing_branchTiming
        //     obj["location"]=branch.location
        //     obj["image"]=branch.image





        //     // manager_Phone_Number

        //         // console.log(branch);

        //     })
        //     datats.push(obj)

        // })

        // console.log(datats);

        //         const traverse = singleServiceDetials => 
        //   (singleServiceDetials?[]:[[singleServiceDetials.item]]).concat(...singleServiceDetials.branch_id.map(child => 
        //      traverse(child).map(arr => 
        //          [singleServiceDetials.item].concat(arr)
        //       )
        //   ));

        //   console.log(traverse(singleServiceDetials))

        if (singleServiceDetials === null || singleServiceDetials === undefined || singleServiceDetials === "" || singleServiceDetials.length === 0) {
            return res.status(200)
                .json([{ msg: "Service Not found", res: "error", }]);
        } else {

            return res.status(200)
                .json([{ msg: "Service Details Data", data: singleServiceDetials, res: "success" }]);
        }

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}
// Add personal Info
const addPersonalInfo = async (req, res) => {
    try {

        const { heightInFit, heightInINCH, previous_injury, health_Detials, weight, userID, DOB, age } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "User ID is required", res: "error", }]);
        }
        if (!DOB) {
            return res.status(200)
                .json([{ msg: "DOB is required", res: "error", }]);
        }

        if (!age) {
            return res.status(200)
                .json([{ msg: "age is required", res: "error", }]);
        }

        if (!weight) {
            return res.status(200)
                .json([{ msg: "weight is required", res: "error", }]);
        }
        if (!heightInFit) {
            return res.status(200)
                .json([{ msg: "heightInFit is required", res: "error", }]);
        }
        if (!heightInINCH) {
            return res.status(200)
                .json([{ msg: "heightInINCH is required", res: "error", }]);
        }
        const userData = await User.findOne({ _id: userID });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            userID, updatedData, options
        )
        return res.status(200).json([{
            message: "Added Personal Info Successfully!!",
            success: true
        }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}
// All Gym Branches
const allGymBranches = async (req, res) => {

    try {
        const gymBranchesData = await GYM_BRANCH.find();
        console.log(gymBranchesData);
        return res.status(200)
            .json([{ msg: "All Gym Branch Data", data: gymBranchesData, res: "success" }]);
    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

//User Activity & Records
const UserActivityAndRecords = async (req, res) => {
    try {

        const { userID } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }


        const userData = await User.findOne({ _id: mongoose.Types.ObjectId(userID) });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const demoData = await demoBooking.find({ user_id: mongoose.Types.ObjectId(userID) }).populate("service_id");

        const packageData = await bookPackage.find({ user_id: mongoose.Types.ObjectId(userID) }).populate("service_id");

        const trackTraceData = await TrackWeight.find({ userID: mongoose.Types.ObjectId(userID) });

        return res.status(200).json([{
            message: "User All Activity & Records!!",
            demoData: demoData,
            packageData: packageData,
            trackTraceData: trackTraceData,
            success: true
        }]);

    }
    catch (err) {
        return res.status(200).json([{
            msg: err.message, res: "error"
        }]);
    }

}

// book Demo by User
const bookingDemoByUser = async (req, res) => {
    try {

        const { category, service_id, userID, Date, TimeSlot } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!category) {
            return res.status(200)
                .json([{ msg: "category is required", res: "error", }]);
        }
        if (!service_id) {
            return res.status(200)
                .json([{ msg: "service_id is required", res: "error", }]);
        }

        if (!Date) {
            return res.status(200)
                .json([{ msg: "Date is required", res: "error", }]);
        }

        if (!TimeSlot) {
            return res.status(200)
                .json([{ msg: "TimeSlot is required", res: "error", }]);
        }
        const userData = await User.findOne({ _id: mongoose.Types.ObjectId(userID) });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const demodata = await demoBooking.create({
            user_id: mongoose.Types.ObjectId(userID),
            service_id: mongoose.Types.ObjectId(service_id),
            category,
            Date,
            TimeSlot,

        });
        return res.status(200).json([{
            message: "You have booked demo Successfully!!",
            data: demodata,
            success: true
        }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

// book Package by User
const bookingPackageByUser = async (req, res) => {
    try {

        const { category, service_id, userID, Date, TimeSlot, duration, price } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!category) {
            return res.status(200)
                .json([{ msg: "category is required", res: "error", }]);
        }

        if (!price) {
            return res.status(200)
                .json([{ msg: "Price is required", res: "error", }]);
        }
        if (!service_id) {
            return res.status(200)
                .json([{ msg: "service_id is required", res: "error", }]);
        }

        if (!Date) {
            return res.status(200)
                .json([{ msg: "Date is required", res: "error", }]);
        }

        if (!TimeSlot) {
            return res.status(200)
                .json([{ msg: "TimeSlot is required", res: "error", }]);
        }
        if (!duration) {
            return res.status(200)
                .json([{ msg: "Duration is required", res: "error", }]);
        }
        const userData = await User.findOne({ _id: mongoose.Types.ObjectId(userID) });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const bookPackagedata = await bookPackage.create({
            user_id: mongoose.Types.ObjectId(userID),
            service_id: mongoose.Types.ObjectId(service_id),
            category,
            Date,
            TimeSlot,
            duration,
            price

        });
        return res.status(200).json([{
            message: "Now please do payment!!",
            data: bookPackagedata,
            success: true
        }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const paymentBuyUser = async (req, res) => {

    //     key id:rzp_test_B25v8VQUM86aO2

    // key secrate:CvIX87XzyJbtsZ7CaekLkPat
    try {


        const { packageId, orderDetails, userID, } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!packageId) {
            return res.status(200)
                .json([{ msg: "packageId is required", res: "error", }]);
        }

        if (!orderDetails) {
            return res.status(200)
                .json([{ msg: "orderDetails is required", res: "error", }]);
        }


        let bookPackagedata = await bookPackage.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(packageId), user_id: mongoose.Types.ObjectId(userID) },
            {
                package_status: true
            }
        );

        // console.log('boosk',bookPackagedata)

        if (
            bookPackagedata === undefined ||
            bookPackagedata === null ||
            bookPackagedata === "" ||
            bookPackagedata.length === 0

        ) {
            return res.status(200)
                .json([{ msg: "Booking Package not found!!!", res: "error", }]);

        } else {

            const paymentData = await PAYMENT.create({
                userID,
                packageId,
                orderDetails

            });
            return res.status(200).json([{
                message: "Pyament data has been stored successfully!!",
                data: paymentData,
                success: true
            }]);
        }


    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);

    }
}

const userOrderAndSubscription = async (req, res) => {

    try {


        const { userID, } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }
        // const demoData = await demoBooking.find({ userID: mongoose.Types.ObjectId(userID) }).populate("service_id");


        const data = await PAYMENT.aggregate([
            {
                $match: {
                    // "title": serviceTitle
                    "userID": mongoose.Types.ObjectId(userID) 
                }
            },

            {
                $lookup: {
                    from: 'users', localField: 'userID',
                    foreignField: '_id', as: 'userData'
                }
            },

            {
                $lookup: {
                    from: 'bookpackages', localField: 'packageId',
                    foreignField: '_id', as: 'packageData'
                }
            },
        ]).exec((err, result) => {
            if (err) {
                console.log("error", err)
                return res.status(200)
                    .json([{ msg: err.message, res: "error" }]);
            }
            if (result) {
                if (result === null || result === undefined || result === "" || result.length === 0) {

                    return res.status(200)
                        .json([{ msg: "Data Not found", res: "error" }]);
                } else {

                    return res.status(200)
                        .json([{ msg: "Order and subscription Data!!", data: result, res: "success" }]);
                }
            }
        });

        // const subscriptionData = await PAYMENT.findOne({ userID: mongoose.Types.ObjectId(userID) });
        // if (!subscriptionData) {
        //     return res.status(200)
        //         .json([{ msg: "No data found!!!", res: "error", }]);
        // }
        // return res.status(200).json([{
        //     message: "Order and subscription Data!!",
        //     data: subscriptionData,
        //     success: true
        // }]);

    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);

    }

}

const test = async (req, res) => {

    const { number } = req.body;

    if (!number) {
        return res.status(200)
            .json([{ msg: "Number is required", res: "error", }]);
    }
    try {
        let digits = "0123456789";
        var OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        var msg = `Hi, Your OTP to login Beats Fitness App is ${OTP} This OTP can be used only once and is valid for 10 min only.Thank you.       TeamBeatsFitness`;

        console.log('msg', msg.length)
        let response = await axios.get(
            `http://www.smsstanch.in/API/sms.php?username=beats&password=123456&from=BEATSF&to=${number}&msg=${msg}&dnd_check=0&template_id=1007164482764680412`

        );
        console.log(response)
        return res.status(200).json([{
            // message: `Your login verfication. OTP is ${OTP}`,
            number: number,
            otp: OTP,
            res: "success",
            msg: msg,
            lenght: msg.length
            // sms:response
        }]);
    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "errors", sms: 'testing' }]);
    }

}

const allFaqs = async (req, res) => {
    try {
        const faqsData = await FAQ.find();
        console.log(faqsData);
        return res.status(200)
            .json([{ msg: "All Faq Data", data: faqsData, res: "success" }]);

    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);

    }

}

const createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question) {
            return res.status(200)
                .json([{ msg: "question is required", res: "error", }]);
        }

        if (!answer) {
            return res.status(200)
                .json([{ msg: "answer is required", res: "error", }]);
        }

        const faqData = await FAQ.create({
            question,
            answer

        });
        return res.status(200).json([{
            message: "Faq has been created successfully!!",
            data: faqData,
            success: true
        }]);

    } catch (err) {
        return res.status(200).json([{ msg: err.message, res: "error" }]);

    }

}

const termCondtionAndPrivacyPolicy = async (req, res) => {
    try {
        const settingData = await SETTING.find();
        return res.status(200)
            .json([{ msg: "Term & Condition and Privacy Policy Data", data: settingData, res: "success" }]);

    } catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);

    }

}

const createTermCondtionAndPrivacyPolicy = async (req, res) => {
    try {
        const { termCondition, privacyPolicy } = req.body;
        if (!termCondition) {
            return res.status(200)
                .json([{ msg: "termCondition is required", res: "error", }]);
        }

        if (!privacyPolicy) {
            return res.status(200)
                .json([{ msg: "privacyPolicy is required", res: "error", }]);
        }

        const settingData = await SETTING.create({
            termCondition,
            privacyPolicy

        });
        return res.status(200).json([{
            message: "Term & Condition and Privacy Policy have been created successfully!!",
            data: settingData,
            success: true
        }]);

    } catch (err) {
        return res.status(200).json([{ msg: err.message, res: "error" }]);

    }

}

const createUserQuery = async (req, res) => {
    try {
        const { query, userID } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!query) {
            return res.status(200)
                .json([{ msg: "query is required", res: "error", }]);
        }

        const queryData = await QUERY.create({
            query,
            user_id: mongoose.Types.ObjectId(userID),
        });
        return res.status(200).json([{
            message: "Your query has been submited,we will give you answer shortly!!",
            data: queryData,
            success: true
        }]);

    } catch (err) {
        return res.status(200).json([{ msg: err.message, res: "error" }]);

    }

}

const allUserQueries = async (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error" }]);
        }

        const queryData = await QUERY.find({ user_id: mongoose.Types.ObjectId(userID) })

        return res.status(200).json([{
            message: "User All queris!!",
            data: queryData,
            success: true
        }]);

    } catch (err) {
        return res.status(200).json([{ msg: err.message, res: "error" }]);

    }

}


//GetBranch Detials by Service Name
const serviceSlottimeById = async (req, res) => {

    try {

        const { barcnchID } = req.body;
        if (!barcnchID) {
            return res.status(200)
                .json([{ msg: "barcnchID is required", res: "error" }]);
        }



        const singleServiceDetials = await GYM_SERVICE.find({ _id: mongoose.Types.ObjectId(barcnchID) }).populate("branch_id")




        if (singleServiceDetials === null || singleServiceDetials === undefined || singleServiceDetials === "" || singleServiceDetials.length === 0) {
            return res.status(200)
                .json([{ msg: "Time slot Not found", res: "error", }]);
        } else {
            const data = [];

            // if(singleServiceDetials[0].slotTime)
            if (singleServiceDetials[0].slotTime === undefined) {
                return res.status(200)
                    .json([{ msg: "Time slot Not found", res: "error", }]);

            }

            // }else{

            const arrayTime = singleServiceDetials[0].slotTime.split(',');

            arrayTime.map((item) => {
                var obj = {};

                obj["time"] = item
                data.push(obj);

            })

            // }

            return res.status(200)
                .json([{ msg: "Slot Time Data ", time: data, res: "success", }]);

            // console.log(singleServiceDetials[0].slotTime)





            // console.log(array[0])

        }

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const GymBranchesByServiceName = async (req, res) => {


    try {
        const { serviceTitle } = req.body;
        if (!serviceTitle) {
            return res.status(200)
                .json([{ msg: "Service Title is required", res: "error", }]);

        }



        const gymBranchService = await GYM_SERVICE.find({ title: serviceTitle }).populate("branch_id")
        if (gymBranchService === null || gymBranchService === undefined || gymBranchService === "" || gymBranchService.length === 0) {
            return res.status(200)
                .json([{ msg: "Gym Banche found", res: "error", }]);
        } else {

            return res.status(200)
                .json([{ msg: "Gym Banches bases on service", data: gymBranchService, res: "success" }]);
        }

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

// book Consultat by User
const bookingConsultantByUser = async (req, res) => {
    try {

        const { category, service_id, userID, Date, Time, firstFree } = req.body;
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error", }]);
        }

        if (!category) {
            return res.status(200)
                .json([{ msg: "category is required", res: "error", }]);
        }
        if (!service_id) {
            return res.status(200)
                .json([{ msg: "service_id is required", res: "error", }]);
        }

        if (!Date) {
            return res.status(200)
                .json([{ msg: "Date is required", res: "error", }]);
        }

        if (!Time) {
            return res.status(200)
                .json([{ msg: "Time is required", res: "error", }]);
        }

        if (!firstFree) {
            return res.status(200)
                .json([{ msg: "firstFree is required", res: "error", }]);
        }
        const userData = await User.findOne({ _id: mongoose.Types.ObjectId(userID) });
        if (!userData) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        }

        const demodata = await Consultation.create({
            user_id: mongoose.Types.ObjectId(userID),
            service_id: mongoose.Types.ObjectId(service_id),
            category,
            Date,
            Time,
            firstFree

        });
        return res.status(200).json([{
            message: "You have booked consultant Successfully!!",
            data: demodata,
            success: true
        }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const addCoach = async (req, res) => {

    const { name, contact_no, service_id } = req.body;
    if (!name) {
        return res.status(200)
            .json([{ msg: "name is required", res: "error", }]);
    }
    if (!contact_no) {
        return res.status(200)
            .json([{ msg: "contact_no is required", res: "error", }]);
    }
    if (!service_id) {
        return res.status(200)
            .json([{ msg: "service_id is required", res: "error", }]);
    }

    const coachdata = await Coach.create({
        name,
        contact_no,
        service_id: mongoose.Types.ObjectId(service_id)

    });
    return res.status(200).json([{
        message: "Coach Created  Successfully Successfully!!",
        data: coachdata,
        success: true
    }]);

}

const bookingCoach = async (req, res) => {

    try {
        const { coach_id, user_id, service_id } = req.body;
        if (!coach_id) {
            return res.status(200)
                .json([{ msg: "coach_id is required", res: "error", }]);
        }
        if (!user_id) {
            return res.status(200)
                .json([{ msg: "user_id is required", res: "error", }]);
        }
        if (!service_id) {
            return res.status(200)
                .json([{ msg: "service_id is required", res: "error", }]);
        }

        const coachdata = await TalkToCoach.create({
            coach_id: mongoose.Types.ObjectId(coach_id),
            user_id: mongoose.Types.ObjectId(user_id),
            service_id: mongoose.Types.ObjectId(service_id)

        });
        return res.status(200).json([{
            message: "You have booked coach Successfully!!",
            data: coachdata,
            success: true
        }]);
    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }



}


const updateGymBranches = async (req, res) => {

    try {

        const { barcnchID, title, description } = req.body;
        let image = req?.files?.image?.tempFilePath;

        console.log('image', image)

        if (!barcnchID) {
            return res.status(200)
                .json([{ msg: "barcnchID is required", res: "error" }]);
        }




        if (image !== "" &&
            image !== undefined &&
            image !== null) {

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

            console.log('yes')

        } else {

            var dataimage = await GYM_SERVICE.findOne({ _id: mongoose.Types.ObjectId(barcnchID) })
            var imageURL = dataimage.bannerImage

            console.log('no')
        }


        console.log('imageurl', imageURL)





        let updatebranch = await GYM_SERVICE.update(
            { _id: mongoose.Types.ObjectId(barcnchID) },
            {

                bannerImage: imageURL,
                title: title,
                description: description
            }
        );

        // comnsole

        if (
            updatebranch.length === 0 ||
            updatebranch === undefined ||
            updatebranch === null ||
            updatebranch === ""
        ) {
            return res.status(200)
                .json([{ msg: "Branch not found!!!", res: "error", }]);
        } else {
            const userData = await GYM_SERVICE.findOne({ _id: mongoose.Types.ObjectId(barcnchID) })
            return res.status(200)
                .json([{ msg: "Branch  updated successflly", data: userData, res: "success" }]);
        }
    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }

}

const updatePushNotification=async (req, res) => {

    try {

        const { userID, token } = req.body;
       
        if (!userID) {
            return res.status(200)
                .json([{ msg: "userID is required", res: "error" }]);
        }

        if (!token) {
            return res.status(200)
                .json([{ msg: "token is required", res: "error" }]);
        }

        await PushNotification.deleteOne({ userID: mongoose.Types.ObjectId(userID) })


        const pushNotificationData = await PushNotification.create({
            userID: mongoose.Types.ObjectId(userID),
            token: token,

        });
        
        return res.status(200).json([{
            message: "Token data updated Successfully!!",
            data: pushNotificationData,
            success: true
        }]);

    }
    catch (err) {
        return res.status(200)
            .json([{ msg: err.message, res: "error" }]);
    }


}



module.exports = { signup, signupVerify, signin, signinVerify, categoryBanner, allTestimonials, categoryTestimonials, allBanners, allServices, addTrackTrace, userTrackTraceList, getUserProfile, branchDetailsBySerivceName, categoryServices, addPersonalInfo, allGymBranches, bookingDemoByUser, bookingPackageByUser, paymentBuyUser, userTrackTraceListGraph, updateUserProfile, test, allFaqs, createFaq, termCondtionAndPrivacyPolicy, createTermCondtionAndPrivacyPolicy, createUserQuery, allUserQueries, UserActivityAndRecords, serviceSlottimeById, GymBranchesByServiceName, updateGymBranches, bookingConsultantByUser, addCoach, bookingCoach, registerUser,userOrderAndSubscription,updatePushNotification };