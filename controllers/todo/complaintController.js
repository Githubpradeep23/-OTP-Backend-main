const { isEmpty } = require("lodash");
const ticketComplaints = require("../../models/todo/complaints");
const user = require('../../models/user');
const employee = require('../../models/employee');
const mongoose = require('mongoose');

const submit = async (req, res) => {
    try {
        const { clientNumber, complaintDetails, supportEmployee, gymService, status } = req.body;
        if (isEmpty(clientNumber) || isEmpty(complaintDetails) || isEmpty(supportEmployee) || isEmpty(gymService)) {
            return res.status(422).json({
                message: "Empty Fields found. Either clientNumber, complaintDetails, supportEmployee and gymService missing.",
                success: false,
            });
        }
        const employeeById = await employee.findOne({_id: mongoose.Types.ObjectId(supportEmployee)});
        if(isEmpty(employeeById)) {
            return res.status(400).json({
                message: "Employee not found with given id details.",
                success: false,
            });
        }
        let ticketComplainModel = {
            clientNumber,
            complaintDetails,
            supportEmployee,
            gymService
        };
        const userByPhoneNo = await user.findOne({number: clientNumber});
        if(isEmpty(userByPhoneNo)) {
            return res.status(400).json({
                message: "User not found with given contact details.",
                success: false,
            });
        }
        ticketComplainModel['userId'] = userByPhoneNo._id;
        ticketComplainModel['status'] = isEmpty(status) ? 'PENDING' : status;

        let ticketComplaintResponse = await ticketComplaints.create(ticketComplainModel);
        return res.status(200).json({
            complaintsTickets : ticketComplaintResponse,
            message: "Added New Complaint Ticket Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteTicketComplaint = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Complaint Ticket Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteTicketComplaint = await ticketComplaints.deleteOne({ _id: id });
          if (
            deleteTicketComplaint["deletedCount"] === 0 ||
            deleteTicketComplaint === null ||
            deleteTicketComplaint === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Complaint Ticket Not found ",
              success: true,
            });
          } else if (
            deleteTicketComplaint["deletedCount"] === 1 ||
            deleteTicketComplaint !== null ||
            deleteTicketComplaint !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Complaint Ticket Deleted Successfully !!! ",
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
        let complaintTickets = await ticketComplaints.find().populate('gymService').populate('userId').populate('supportEmployee').exec();
        if (
            complaintTickets !== undefined &&
            complaintTickets.length !== 0 &&
            complaintTickets !== null
        ) {
          return res.status(200).send({
            complaintTickets ,
            messge: "All complaintTickets",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "ComplaintTickets does not exist",
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
        if(id === null || id === undefined || isEmpty(id)) {
            return res.status(400).send({
                messge: "Please enter correct id",
                success: false,
              });
        }
        let status = 'PENDING';
        const ticketComplaintRes = await ticketComplaints.findOne(
            { _id: mongoose.Types.ObjectId(id) },
        );
        if(ticketComplaintRes.status === 'PENDING') {
            status = 'COMPLETED'
        }
        const updatedTicketStatus = await ticketComplaints.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: {status}}
        );
        if (
            updatedTicketStatus.length === 0 ||
            updatedTicketStatus === undefined ||
            updatedTicketStatus === null ||
            updatedTicketStatus === ""
        ) {
            return res.status(200)
                .json([{ msg: "User not found!!!", res: "error", }]);
        } else {
            const ticketComplaintData = await ticketComplaints.findOne({ _id: mongoose.Types.ObjectId(id) })
            return res.status(200)
                .json({ msg: "Ticket status updated successflly", data: ticketComplaintData, res: "success" });
        }
    } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submit, deleteTicketComplaint, getAll, updateStatus };