const { isEmpty } = require("lodash");
const discountDb = require("../../models/hr/discount");
const mongoose = require('mongoose');

const submit = async (req, res) => {
    try {
        const { discount, description, billAmount, gymService, userId, status } = req.body;
        if ( isNaN(discount) ||  isNaN(billAmount) || isEmpty(gymService) || isEmpty(userId)) {
            return res.status(400).json({
                message: "Empty Fields found. Either discount, billAmount, gymService or userId is missing.",
                success: false,
            });
        }
        let discountModel = {
            discount: Number(discount),
            description: isEmpty(description) ? undefined : description, 
            billAmount : Number(billAmount),
            gymService,
            userId,
            status: isEmpty(status) ? 'PENDING' : status
        };
        
        let discountResponse = await discountDb.create(discountModel);
        return res.status(200).json({
          discount: discountResponse,
          message: "Added new Discount Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Discount Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteDiscount = await discountDb.deleteOne({ _id: id });
          if (
            deleteDiscount["deletedCount"] === 0 ||
            deleteDiscount === null ||
            deleteDiscount === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Discount Not found ",
              success: true,
            });
          } else if (
            deleteDiscount["deletedCount"] === 1 ||
            deleteDiscount !== null ||
            deleteDiscount !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Discount Deleted Successfully !!! ",
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
        let discounts = await discountDb.find().populate('gymService').populate('userId').exec();
        if (
            discounts !== undefined &&
            discounts.length !== 0 &&
            discounts !== null
        ) {
          return res.status(200).send({
            discounts ,
            messge: "All discounts",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Discounts does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Something went wrong",
          success: false,
        });
      }
}

const getAllByUserId = async (req, res) => {
    try {
        const userId = req.params['userId'];
        let discounts = await discountDb.find({userId}).populate('gymService').populate('userId').exec();
        if (
            discounts !== undefined &&
            discounts.length !== 0 &&
            discounts !== null
        ) {
          return res.status(200).send({
            discounts ,
            messge: "All discounts by userId",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Discounts does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Something went wrong",
          success: false,
        });
      }
}

const updateStatus = async (req, res) => {
    try {
        const id = req.params['id'];
        const { status } = req.body;
        if(id === null || id === undefined || isEmpty(id) || isEmpty(status)) {
            return res.status(400).send({
                messge: "Please enter correct id and status",
                success: false,
              });
        }
        const updatedDiscountStatus = await discountDb.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: {status}}
        );
        if (
            updatedDiscountStatus.length === 0 ||
            updatedDiscountStatus === undefined ||
            updatedDiscountStatus === null ||
            updatedDiscountStatus === ""
        ) {
            return res.status(200)
                .json([{ msg: "Discount not found!!!", res: "error", }]);
        } else {
            const discountData = await discountDb.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('gymService').populate('userId').exec()
            return res.status(200)
                .json({ msg: "Discount status updated successflly", data: discountData, res: "success" });
        }
    } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submit, deleteDiscount, getAll, getAllByUserId, updateStatus };