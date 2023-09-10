const { isEmpty } = require("lodash");
const Approver  = require("../models/approver");
const mongoose = require('mongoose');

const createApprover = async (req, res) => {
    try {
        const {
            employeeId,
            status
          } = req.body;
        let approverResponse = await Approver.create(
            {
                employeeId,
                status: isEmpty(status) ? 'ACTIVE' : status
            });
        return res.status(200).json({
            approverResponse: approverResponse,
            message: "Added New Approver Successfully",
            success: true,
        });
    } catch (err) {
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const getAllApprovers = async (req, res) => {
    try {
        const approversData = await Approver.find({status: 'ACTIVE'}).populate('employeeId');
        return res.status(200)
        .json({ msg: "Approvers response !!", approversData, res: "success", });
    } catch(err) {
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const deleteApprover = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Approver Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteApproverRes = await Approver.deleteOne({ _id: id });
          if (
            deleteApproverRes["deletedCount"] === 0 ||
            deleteApproverRes === null ||
            deleteApproverRes === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Approver Not found ",
              success: true,
            });
          } else if (
            deleteApproverRes["deletedCount"] === 1 ||
            deleteApproverRes !== null ||
            deleteApproverRes !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Approver Deleted Successfully !!! ",
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

const updateApproverStatus = async (req, res) => {
    try {
        const { approverId, status } = req.body;
        if (isEmpty(approverId)) {
            return res.status(422).json({
                message: "Empty Fields found Approver Id is missing.",
                success: false,
            });
        }
        let approverResponse = await Approver.findOneAndUpdate(
            { _id: approverId },
            { $set : { status } }
        );
        if (
            approverResponse === undefined ||
            approverResponse === null ||
            approverResponse === ""
        ) {
            return res.status(200)
                .json([{ msg: "Approver not found!!!", res: "error", }]);
        } else {
            const approverData = await Approver.findOne({ _id: approverId })
            return res.status(200)
                .json([{ msg: "Approver updated successflly", data: approverData, res: "success" }]);
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

module.exports = {
    createApprover,
    getAllApprovers,
    deleteApprover,
    updateApproverStatus
};