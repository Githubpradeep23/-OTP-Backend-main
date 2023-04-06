const { isEmpty, isNumber } = require("lodash");
const billing = require("../../models/cms/billing");

const submit = async (req, res) => {
    try {
        const { gymService, user, package, activeFrom, activeTo, totalFee, paidFee, feeDue, remarks } = req.body;
        if (isEmpty(gymService) || isEmpty(user) || isEmpty(package) || isEmpty(activeFrom) || isEmpty(activeTo) || !isNumber(totalFee) || !isNumber(paidFee) || !isNumber(feeDue)) {
            return res.status(422).json({
                message: "Empty Fields found . Either GymService, package, activeFrom, totalFee , paidFee , feeDue or User Id is missing.",
                success: false,
            });
        }
        let billingModel = { 
            gymService, 
            user, 
            package,
            activeFrom: new Date(activeFrom),
            activeTo: new Date(activeTo),
            totalFee: Number(totalFee),
            paidFee: Number(paidFee),
            feeDue: Number(feeDue),
            remarks : isEmpty(remarks) ? undefined : remarks
        };
        let billingResponse = await billing.create(billingModel);
        return res.status(200).json({
            billing: billingResponse,
            message: "Added New Billing Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const updateBilling = async (req, res) => {
    try {
        const { billingId, gymService, user, package, activeFrom, activeTo, totalFee, paidFee, feeDue, remarks } = req.body;
        if (isEmpty(billingId)) {
            return res.status(422).json({
                message: "Empty Fields found .",
                success: false,
            });
        }
        let updateBillingmodel = {}
        updateBillingmodel.gymService = isEmpty(gymService) ? undefined : gymService;
        updateBillingmodel.user = isEmpty(user) ? undefined : user;
        updateBillingmodel.package = isEmpty(package) ? undefined : package;
        updateBillingmodel.activeFrom = isEmpty(activeFrom) ? undefined : new Date(activeFrom);
        updateBillingmodel.activeTo = isEmpty(activeTo) ? undefined : new Date(activeFrom);
        updateBillingmodel.totalFee = isNaN(totalFee) ? undefined : Number(totalFee);
        updateBillingmodel.paidFee = isNaN(paidFee) ? undefined : Number(paidFee);
        updateBillingmodel.feeDue = isNaN(feeDue) ? undefined : Number(feeDue);
        updateBillingmodel.remarks = isEmpty(remarks) ? undefined : remarks;
        let updatedBilling = await billing.findOneAndUpdate(
            { _id: billingId },
            { $set : updateBillingmodel}
        );
        if (
            updatedBilling.length === 0 ||
            updatedBilling === undefined ||
            updatedBilling === null ||
            updatedBilling === ""
        ) {
            return res.status(200)
                .json([{ msg: "Billing not found!!!", res: "error", }]);
        } else {
            const billingData = await billing.findOne({ _id: billingId })
            return res.status(200)
                .json([{ msg: "Billing updated successflly", data: billingData, res: "success" }]);
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}


const deleteBilling = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Billing Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteBillingRes = await billing.deleteOne({ _id: id });
          if (
            deleteBillingRes["deletedCount"] === 0 ||
            deleteBillingRes === null ||
            deleteBillingRes === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Billing Not found ",
              success: true,
            });
          } else if (
            deleteBillingRes["deletedCount"] === 1 ||
            deleteBillingRes !== null ||
            deleteBillingRes !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Billing Deleted Successfully !!! ",
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
        let allBillings = await billing.find().populate('gymService').populate('user').exec();
        if (
            allBillings !== undefined &&
            allBillings.length !== 0 &&
            allBillings !== null
        ) {
          return res.status(200).send({
            billing: allBillings ,
            messge: "All Billings",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Billings does not exist",
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

const getAllBillingByUser = async (req, res) => {
    try {
        const userId = req.params['userId'];
        let allBillingsByUser = await billing.find({ user: userId }).populate('gymService').populate('user').exec();
        if (
            allBillingsByUser !== undefined &&
            allBillingsByUser.length !== 0 &&
            allBillingsByUser !== null
        ) {
          return res.status(200).send({
            userBilling: allBillingsByUser ,
            messge: "All Billings by user",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Billings does not exist",
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

const getActiveSubscriptionsOfUser = async (req, res) => {
    try {
        const userId = req.params['userId'];
        const date = new Date();
        let userActiveSubscriptions = await billing.find({ user: userId, activeFrom : {$lte: date}, activeTo : {$gte: date} }).populate('gymService').populate('user').exec();
        if (
            userActiveSubscriptions !== undefined &&
            userActiveSubscriptions.length !== 0 &&
            userActiveSubscriptions !== null
        ) {
          return res.status(200).send({
            activeSubscriptions: userActiveSubscriptions ,
            messge: "All activeSubscriptions by user",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Active Subscriptions does not exist",
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

module.exports = { submit, deleteBilling, getAll, getAllBillingByUser, updateBilling, getActiveSubscriptionsOfUser };