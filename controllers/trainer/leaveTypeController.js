const { isEmpty } = require("lodash");
const leaveType = require("../../models/trainer/leaveType");

const submit = async (req, res) => {
    try {
        const { employee_role, totalLeaves, carryForwardLeaves } = req.body;
        if ( isEmpty(employee_role) || isNaN(totalLeaves)) {
            return res.status(422).json({
                message: "Empty Fields found. Either employee_role or totalLeaves is missing.",
                success: false,
            });
        }
        let leaveTypeModel = {
            employee_role,
            totalLeaves: Number(totalLeaves),
            carryForwardLeaves: isEmpty(carryForwardLeaves) ? 0 : Number(carryForwardLeaves),
        };
        
        let leaveTypeResponse = await leaveType.create(leaveTypeModel);
        return res.status(200).json({
          leaveTypeResponse: leaveTypeResponse,
          message: "Added New Leave Type Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteLeaveType = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Leave Type Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteLeaveType = await leaveType.deleteOne({ _id: id });
          if (
            deleteLeaveType["deletedCount"] === 0 ||
            deleteLeaveType === null ||
            deleteLeaveType === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Leave Type Not found ",
              success: true,
            });
          } else if (
            deleteLeaveType["deletedCount"] === 1 ||
            deleteLeaveType !== null ||
            deleteLeaveType !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Leave Type Deleted Successfully !!! ",
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
        let leaveTypes = await leaveType.find();
        if (
            leaveTypes !== undefined &&
            leaveTypes.length !== 0 &&
            leaveTypes !== null
        ) {
          return res.status(200).send({
            leaveTypes ,
            messge: "All Leave Types",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Leave Types does not exist",
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

module.exports = { submit, deleteLeaveType, getAll };