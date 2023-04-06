const { isEmpty, isNumber } = require("lodash");
const subscription = require("../../models/cms/subscription");
const billingModel = require("../../models/cms/billing");

const submitCancellation = async (req, res) => {
    try {
        const { billing, user, extendUpto, cancelSubscription, feeRefund, reasonForCancellation, approver1, approver2 } = req.body;
        if (isEmpty(billing) || isEmpty(user)) {
            return res.status(400).json({
                message: "Empty Fields found . Either billing or User Id is missing.",
                success: false,
            });
        }
        let subscriptionModel = { 
            billing, 
            user, 
            extendUpto: isEmpty(extendUpto) ? undefined : new Date(extendUpto),
            cancelSubscription: isEmpty(cancelSubscription) ? false : Boolean(cancelSubscription),
            feeRefund: isNaN(feeRefund) ? undefined : Number(feeRefund),
            reasonForCancellation: isEmpty(reasonForCancellation) ? undefined :  reasonForCancellation,
            approver1: isEmpty(approver1) ? undefined : approver1,
            approver2 : isEmpty(approver2) ? undefined : approver2
        };
        if(cancelSubscription) {
            await billingModel.findOneAndUpdate(
                { _id: billing },
                { $set : { activeTo: isEmpty(extendUpto) ? new Date() : new Date(extendUpto) } }
            );
        }
        let subscriptionResponse = await subscription.create(subscriptionModel);
        return res.status(200).json({
            subscription: subscriptionResponse,
            message: "Added New Cancel Subscription Request Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Subscription Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteSubscriptionRes = await subscription.deleteOne({ _id: id });
          if (
            deleteSubscriptionRes["deletedCount"] === 0 ||
            deleteSubscriptionRes === null ||
            deleteSubscriptionRes === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Subscription Not found ",
              success: true,
            });
          } else if (
            deleteSubscriptionRes["deletedCount"] === 1 ||
            deleteSubscriptionRes !== null ||
            deleteSubscriptionRes !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Subscription Deleted Successfully !!! ",
              success: true,
            });
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Something went wrong",
          success: false,
        });
      }
}

const getAll = async (req, res) => {
    try {
        let allSubscription = await subscription.find().populate('billing').populate('user').exec();
        if (
            allSubscription !== undefined &&
            allSubscription.length !== 0 &&
            allSubscription !== null
        ) {
          return res.status(200).send({
            subscription: allSubscription ,
            messge: "All Subscription",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Subscriptions does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

const getAllSubscriptionsByUser = async (req, res) => {
    try {
        const userId = req.params['userId'];
        let allSubscriptionsByUser = await subscription.find({ user: userId }).populate('billing').populate('user').exec();
        if (
            allSubscriptionsByUser !== undefined &&
            allSubscriptionsByUser.length !== 0 &&
            allSubscriptionsByUser !== null
        ) {
          return res.status(200).send({
            subscriptions: allSubscriptionsByUser ,
            messge: "All Subscription by user",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Subscription does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submitCancellation, deleteSubscription, getAll, getAllSubscriptionsByUser };