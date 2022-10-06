const express = require("express");
const Subscription = require("../models/gymServiceSubscription");
const subscriptionRouter = express.Router();
const User = require("../models/user");
const GYM_SERVICE = require("../models/gymServices");
const axios = require("axios");

//Add Subscription Coin
subscriptionRouter.post("/addSubscription", async (req, res) => {
  try {
    const { userID, serviceID } = req.body;
    console.log(" userID, serviceID ", userID, serviceID);
    if (
      userID !== null &&
      userID !== "" &&
      userID !== undefined &&
      serviceID !== null &&
      serviceID !== undefined &&
      serviceID !== undefined
    ) {
      let checkUser = await User.findById({ _id: userID });
      if (checkUser !== null && checkUser !== undefined) {
        let service = await GYM_SERVICE.findById({ _id: serviceID });
        if (service !== null && service !== undefined) {
          let price = service["price"];
          let coin = checkUser["coin"];
          if (coin >= price) {
            
            let totalCoins = coin - price;
            let updateUserCoins = await User.findOneAndUpdate(
              { _id: userID },
              { coin: totalCoins }
            );

            let addSubscription = await Subscription.create({
              userID,
              serviceID,
              subscription: true,
              subscriptionPrice: price,
            });

            return res.status(200).json({
              addSubscription,
              message: "Add Subscription Successfullly",
              success: true,
            });
          } else {
            let insufficientcoins = Math.abs(coin - price);

            let sendRequest = await axios.post(
              "https://candidateapp.herokuapp.com/api/v1/addRequestForAdmin",
              {
                serviceID,
                userID,
                inSufficientCoins: insufficientcoins,
                message: "Insufficient coin.",
              }
            );
            if (sendRequest.status === 200) {
              return res.status(200).json({
                message:
                  "Insufficient coin. You could not get subscription.Request Send For Admin",
                success: false,
              });
            } else {
              return res.status(200).json({
                message: "Insufficient coin.You could not get subscription.",
                success: false,
              });
            }
          }
        } else {
          return res.status(200).json({
            message: "Service Not found",
            success: false,
          });
        }
      } else {
        return res.status(200).json({
          message: "Unauthorized User",
          success: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "Empty Field found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong ",
      success: false,
    });
  }
});


module.exports = subscriptionRouter;
