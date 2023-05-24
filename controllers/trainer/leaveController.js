const { isEmpty } = require("lodash");
const leaveType = require("../../models/trainer/leaveType");
const leave = require("../../models/trainer/leave");
const mongoose = require('mongoose');

const totalDays = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays;
}

const submit = async (req, res) => {
    try {
        const { employeeId, employee_role, reason, approver1, approver2, gymService, status, fromDate, toDate, gym_branch } = req.body;
        if (isEmpty(employeeId) || isEmpty(gymService) || isEmpty(employee_role) || isEmpty(reason) || isEmpty(approver1) || isEmpty(approver2)) {
            return res.status(422).json({
                message: "Empty Fields found. Either employeeId, gymService, employee_role, reason approver1 or approver2 is missing.",
                success: false,
            });
        }
        const leaveTypeResult = await leaveType.findOne({ employee_role });
        if(isEmpty(leaveTypeResult)) {
            return res.status(400).json({
                message: "Leave Type is empty",
                success: false,
            });
        }
        let leaveModel = {
            employeeId,
            reason,
            approver1,
            approver2,
            gymService,
            status: isEmpty(status) ? 'PENDING' : status,
            leaveType: leaveTypeResult._id,
            fromDate : isEmpty(fromDate) ? Date.now() : new Date(fromDate),
            toDate : isEmpty(toDate) ? Date.now() : new Date(toDate),
            days: !isEmpty(fromDate) && !isEmpty(toDate) ? totalDays(new Date(new Date(toDate).setHours(23,59,59,59)), new Date(new Date(fromDate).setHours(0,0,0,0))) : 1,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        let leaveResponse = await leave.create(leaveModel);
        return res.status(200).json({
          leaveResponse: leaveResponse,
          message: "Added New Leave Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteLeave = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Leave Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteLeave = await leave.deleteOne({ _id: id });
          if (
            deleteLeave["deletedCount"] === 0 ||
            deleteLeave === null ||
            deleteLeave === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Leave Not found ",
              success: true,
            });
          } else if (
            deleteLeave["deletedCount"] === 1 ||
            deleteLeave !== null ||
            deleteLeave !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Leave Deleted Successfully !!! ",
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
        let leaves = await leave.find().populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('leaveType').populate('gym_branch').exec();
        if (
            leaves !== undefined &&
            leaves.length !== 0 &&
            leaves !== null
        ) {
          return res.status(200).send({
            leaves ,
            messge: "All Leaves",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Leaves does not exist",
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
        const updatedLeaveStatus = await leave.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: {status}}
        );
        if (
            updatedLeaveStatus.length === 0 ||
            updatedLeaveStatus === undefined ||
            updatedLeaveStatus === null ||
            updatedLeaveStatus === ""
        ) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        } else {
            const leaveData = await leave.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('leaveType').exec()
            return res.status(200)
                .json({ msg: "Leave status updated successflly", data: leaveData, res: "success" });
        }
    } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

const fetchAllLeavesByEmpId = async (req, res) => {
    try {
        const employeeId = req.params['employeeId']
        let approvedLeaves = await leave.find({ status : 'APPROVED', employeeId }).populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('leaveType').exec();
        let declinedLeaves = await leave.find({ status : 'DECLINED', employeeId }).populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('leaveType').exec();
        let approvedLeavesCount = approvedLeaves.length;
        let approvedDaysCount = 0;
        for(let approvedLeave of approvedLeaves) {
          approvedDaysCount += approvedLeave.days ?? 1;
        }
        let declinedLeavesCount = declinedLeaves.length;
        let approver1 = approvedLeaves.length > 0 && approvedLeaves[0]._doc.approver1.number;
        let approver2 = approvedLeaves.length > 0 && approvedLeaves[0]._doc.approver2.number;
        let response = {
            approvedLeavesCount,
            approvedDaysCount,
            declinedLeavesCount,
            approver1,
            approver2,
            approvedLeaves,
            declinedLeaves
        }
        return res.status(200).send({
            leaves : response ,
            messge: "All Approved and Declined Leaves",
            success: true,
        });
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
     }
}

const fetchUsedLeavesByTrainerId = async (req, res) => {
    try {
        const employeeId = req.params['employeeId']
        let approvedLeaves = await leave.find({ status : 'APPROVED', employeeId }).populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('leaveType').exec();
        let approvedLeavesCount = 0;
        for(let approvedLeave of approvedLeaves) {
          approvedLeavesCount += approvedLeave.days ?? 1;
        }
        const leaveTypeResult = await leaveType.findOne({ employee_role : 'Trainer' });
        let totalLeaves = leaveTypeResult.totalLeaves;
        const returnObj = {
            usedLeaves : approvedLeavesCount,
            leftLeaves : totalLeaves - approvedLeavesCount
        }
        return res.status(200).send({
            leavesCount : returnObj ,
            messge: "All Used and Left Leaves",
            success: true,
        });
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
     }
}

const fetchAllLeavesByFilter = async (req, res) => {
  try {
      const {employeeId, fromDate, toDate } = req.body;
      let pendingLeaves = await leave.find({ 
        status : 'PENDING', 
        employeeId, 
        createdAt: { $gte: new Date(fromDate), $lt: new Date(toDate) } 
      }).populate('employeeId').populate('approver1').populate('approver2').populate('gymService').populate('gym_branch').populate('leaveType').exec();

      return res.status(200).send({
          pendingLeaves ,
          messge: "All Peninding Leaves by Filter",
          success: true,
      });
    } catch (error) {
      return res.status(400).send({
        messge: "Somethig went wrong",
        success: false,
      });
   }
}

module.exports = { submit, deleteLeave, getAll, updateStatus, fetchAllLeavesByEmpId ,fetchUsedLeavesByTrainerId, fetchAllLeavesByFilter };