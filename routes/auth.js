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
const mongoose = require('mongoose');
// let OTP, user;
// authRouter.post("/signup", async (req, res) => {
//   try {
//     const { firstName, number } = req.body;

//     console.log("request hit line 16 ");

//     if (
//       firstName !== "" &&
//       firstName !== undefined &&
//       firstName !== null &&
//       number !== "" &&
//       number !== undefined &&
//       number !== null
//     ) {
//       const existingUser = await User.findOne({ number });

//       if (existingUser) {
//         return res
//           .status(422)
//           .json({ msg: "User with same number already exists!" });
//       }

//       user = new User({
//         firstName,
//         number,
//       });

//       let digits = "0123456789";
//       OTP = "";
//       for (let i = 0; i < 4; i++) {
//         OTP += digits[Math.floor(Math.random() * 10)];
//       }
//       let response = await axios.get(
//         `http://www.smsstanch.in/API/sms.php?firstName=beats&password=123456&from=BEATSF&to=${number}&msg=Hi, Your OTP ${OTP}  to login &type=1&dnd_check=0&template_id=1007164482764680412`
//       );

//       return res.status(200).json({
//         message: `Verify your account.Your OTP is ${OTP}`,
//         success: true,
//       });

//       //   if (response.status === 200) {
//       //     console.log("Opt", OTP);
//       //     return res.status(200).json({
//       //       message: response?.data,
//       //       success: true,
//       //     });
//       //   } else {
//       //     return res.status(200).json({
//       //       message: "something went wrong",
//       //       succes: false,
//       //     });
//       //   }
//       // } else {
//       //   console.log("else hit")
//       //   return res.status(200).json({
//       //     message:"Empty Field found. All fields are required",
//       //     success:false
//       //   });
//     }
//   } catch (e) {
//     console.log("🚀 ~ file: auth.js ~ line 90 ~ authRouter.post ~ e", e);
//     res.status(500).json({ error: e.message, success: false });
//   }
// });

// authRouter.post("/signup/verify", async (req, res) => {
//   try {
//     const { otp } = req.body;
//     if (otp != OTP) {
//       return res.status(422).json({ msg: "Incorrect Otp.", success: false });
//     }
//     user = await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

//     // await helper.sendEmail(res,user.email,"Check Otp Server","Dummy Message body");

//     res.status(200).json({ token, ...user._doc, success: true });
//     OTP = "";
//   } catch (e) {
//     res.status(500).json({ error: e.message, success: false });
//   }
// });

// let signinUser;

// authRouter.post("/signin", async (req, res) => {
//   try {
//     const { number } = req.body;

//     if (number !== "" && number !== undefined && number !== null) {
//       signinUser = await User.findOne({ number });

//       if (!signinUser) {
//         return res.status(422).json({ msg: "This number does not Exists!!!", success: false });
//       }
//       let digits = "0123456789";
//       OTP = "";
//       for (let i = 0; i < 4; i++) {
//         OTP += digits[Math.floor(Math.random() * 10)];
//       }

//       let response = await axios.get(
//         `http://www.smsstanch.in/API/sms.php?firstName=beats&password=123456&from=BEATSF&to=${number}&msg=Hi, Your OTP ${OTP}  to login &type=1&dnd_check=0&template_id=1007164482764680412`
//       );

//       return res.status(200).json({
//         message: `${signinUser.firstName} verify your account.Your OTP is ${OTP}`,
//         success: true,
//       });

//       // if (response.status === 200) {
//       //   console.log("Opt", OTP);
//       //   return res.status(200).json({
//       //     message: response?.data,
//       //     success: true,
//       //   });
//       // } else {
//       //   return res.status(200).json({
//       //     message: "something went wrong",
//       //     succes: false,
//       //   });
//       // }
//     } else {
//       return res.status(422).json({
//         message: "Empty Field found",
//         success: false,
//       });
//     }
//   } catch (e) {
//     res.status(500).json({ error: e.message, succes: false });
//   }
// });

// authRouter.post("/signin/verify", async (req, res) => {
//   try {
//     const { otp } = req.body;
//     if (otp != OTP) {
//       return res.status(422).json({ msg: "Incorrect Otp.", success: false });
//     }
//     const token = jwt.sign({ id: signinUser._id }, process.env.JWT_SECRET_KEY);

//     // await helper.sendEmail(res,signinUser.email,"Check Otp Server","Dummy Message body");

//     res.status(200).json({ token, ...signinUser._doc, success: true });
//     OTP = "";
//   } catch (e) {
//     res.status(500).json({ error: e.message, success: false });
//   }
// });

authRouter.put("/editUser", async (req, res) => {
  try {
    const { firstName, lastName, number, email, user_Address, postal_code, coin, id, DOB, gender, userType } =
      req.body;
    let image = req?.files?.profilePicture?.tempFilePath;
    if (
      firstName !== "" &&
      firstName !== undefined &&
      firstName !== null &&
      lastName !== "" &&
      lastName !== undefined &&
      lastName !== null &&
      number !== "" &&
      number !== undefined &&
      number !== null &&
      coin !== "" &&
      coin !== undefined &&
      coin !== null &&
      DOB !== "" &&
      DOB !== undefined &&
      DOB !== null &&
      gender !== "" &&
      gender !== undefined &&
      gender !== null &&
      postal_code !== "" &&
      postal_code !== undefined &&
      postal_code !== null &&
      email !== "" &&
      email !== undefined &&
      email !== null &&
      user_Address !== "" &&
      user_Address !== undefined &&
      user_Address !== null &&
      id !== "" &&
      id !== null &&
      id !== undefined
    ) {
      let user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
      let imageURL = '';
      if( image !== undefined && image !== null && image !== "") {
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
  
        imageURL = await helper.get(options);
        console.log("🚀 ~ file: auth.js ~ line 211 ~ authRouter.put ~ imageURL", imageURL)
      }
      else {
        imageURL = user._doc.profilePicture;
      }
      let profile = {
        firstName, lastName, number, email, user_Address, postal_code, coin, DOB, gender,
        profilePicture: imageURL,
      };
      if(userType) {
        profile.userType = userType;
      }
      let updateUser = await User.findOneAndUpdate(
        { _id: id },
        profile
      );
      console.log(
        "🚀 ~ file: auth.js ~ line 181 ~ authRouter.put ~ updateUser",
        updateUser
      );
      if (
        updateUser.length === 0 ||
        updateUser === undefined ||
        updateUser === null ||
        updateUser === ""
      ) {
        return res.status(422).json({
          message: "User Not found",
          success: false,
        });
      } else {
        let id = updateUser["_id"]
        return res.status(200).json({
          id,
          message: "User Updated Successfully !!!",
          success: true,
        });
      }
    } else {
      return res.status(422).json({
        message: "Empty field found",
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

authRouter.post("/userFeedBack", async (req, res) => {
  try {
    const { userID, firstName, feedBack } = req.body;
    if (
      userID != "" &&
      userID != undefined &&
      userID != null &&
      firstName !== "" &&
      firstName !== undefined &&
      firstName !== null &&
      feedBack !== "" &&
      feedBack !== undefined &&
      feedBack !== null
    ) {
      let addNewFeedBack = await FeedBack.create({
        userID,
        firstName,
        feedBack,
      });
      return res.status(200).json({
        addNewFeedBack,
        message: "Add FeedBack Successfully",
        success: true,
      });
    } else {
      return res.status(422).json({
        message: "Empty Field Found",
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

authRouter.get("/getAllUsersFeedBack", async (req, res) => {
  try {
    let getAllUsersFeedBack = await FeedBack.find();
    console.log(
      "🚀 ~ file: auth.js ~ line 258 ~ authRouter.get ~ getAllUsersFeedBack",
      getAllUsersFeedBack
    );
    if (
      getAllUsersFeedBack !== undefined &&
      getAllUsersFeedBack.length !== 0 &&
      getAllUsersFeedBack !== null
    ) {
      return res.status(200).send({
        getAllUsersFeedBack,
        messge: "All FeedBack",
        success: true,
      });
    } else {
      return res.status(404).send({
        messge: "FeedBack Not Exist",
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

// GetCoinByUserID
authRouter.post("/getCoinByUserID", async (req, res) => {
  try {
    const { user_id } = req.body;
    let getCoins = await User.findById({ _id: user_id });
    if (getCoins === null || getCoins === "" || getCoins === undefined) {
      return res.status(422).json({
        message: "User Not Found",
        success: false
      });
    }
    else {
      let coin = getCoins["coin"]
      return res.status(422).json({
        coin,
        message: "Get User Coins Successfully",
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
})

//editProfileByUser
authRouter.post("/eidtProfileByUser", async (req, res) => {
  try {
    const { id, firstName, lastName, DOB, gender, number, email } = req.body;
    let image = req?.files?.profilePicture?.tempFilePath;
    if (
      id !== "" &&
      id !== undefined &&
      id !== null &&
      firstName !== "" &&
      firstName !== undefined &&
      firstName !== null &&
      lastName !== "" &&
      lastName !== undefined &&
      lastName !== null &&
      DOB !== "" &&
      DOB !== undefined &&
      DOB !== null &&
      gender !== "" &&
      gender !== undefined &&
      gender !== null &&
      number !== "" &&
      number !== undefined &&
      number !== null &&
      email !== undefined &&
      email !== null &&
      email !== "" &&
      image !== undefined &&
      image != "" &&
      image !== null
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
      let updateUser = await User.findOneAndUpdate(
        { _id: id },
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
        return res.status(422).json({
          message: "User Not Found",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Profile Successfully",
          success: true,
        });
      }
    } else {
      return res.status(422).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      succes: false,
    });
  }
});

//Add personal Info 
authRouter.post("/addPersonal", async (req, res) => {
  try {
    const { heightInFit, heightInINCH, previous_injury, health_Detials, weight } = req.body;
    if (
      heightInFit !== "" &&
      heightInFit !== null &&
      heightInFit !== undefined &&
      heightInINCH !== "" &&
      heightInINCH !== null &&
      heightInINCH !== undefined &&
      previous_injury !== "" &&
      previous_injury !== null &&
      previous_injury !== undefined &&
      health_Detials !== "" &&
      health_Detials !== null &&
      health_Detials !== undefined &&
      weight !== "" &&
      weight !== null &&
      weight !== undefined &&
      user_id !== "" &&
      user_id !== null &&
      user_id !== undefined
    ) {
      let personalInfo = await User.create(
        {
          heightInFit,
          heightInINCH,
          health_Detials,
          weight
        }
      )
      return res.status(200).json({
        message: "Add Personal Info",
        success: true
      });
    }
    else {
      return res.status(422).json({
        message: "All fields Required",
        success: false
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
      succes: false
    })
  }
});

//getAll Copuan by user id 
authRouter.post("/getNotificationByUser", async (req, res) => {
  try {
    const { user_id } = req.body;
    if (
      user_id !== "" &&
      user_id !== null &&
      user_id !== undefined
    ) {

      let notifications = await Notification.find({ user_id }).populate(
        {
          path: 'user_id',
          model: 'User',
        }
      ).populate(
        {
          path: 'copuanCode_id',
          model: 'Copuan',
        }
      ).exec();

      return res.status(200).json({
        notifications,
        message: "Get All Notification Successfully",
        success: true,
      })
    }
    else {
      return res.status(422).json({
        message: "User_id is required",
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
});


module.exports = authRouter;
