const { isEmpty } = require("lodash");
const Request = require("../../models/serviceRequest");
const renewalReminder = require("../../models/todo/reminder");

const submit = async (req, res) => {
    try {
        const { activeTo, activeFrom, timeSlot, followUpCall, reminderSMS, remarks, gymService, userId, done, notDone, gym_branch } = req.body;
        if (
            activeTo !== "" &&
            activeTo !== undefined &&
            activeTo !== null &&
            timeSlot !== "" &&
            timeSlot !== undefined &&
            timeSlot !== null &&
            activeFrom !== "" &&
            activeFrom !== undefined &&
            activeFrom !== null &&
            gymService !== "" &&
            gymService !== undefined &&
            gymService !== null &&
            userId !== "" &&
            userId !== undefined &&
            userId !== null) {
                let reminderModel = {
                    activeTo,
                    timeSlot,
                    activeFrom,
                    gymService,
                    userId
                  };
                if(followUpCall !== undefined){
                    reminderModel['followUpCall'] = followUpCall;
                }
                if(reminderSMS !== undefined){
                    reminderModel['reminderSMS'] = reminderSMS;
                }
                if(done !== undefined){
                    reminderModel['done'] = done                                                                                   ;
                }
                if(notDone !== undefined){
                    reminderModel['notDone'] = notDone                                                                                   ;
                }
                if(remarks !== null && remarks !== '' && remarks !== undefined){
                    reminderModel['remarks'] = remarks                                                                                   ;
                }
                if(!isEmpty(gym_branch)) {
                    reminderModel['gym_branch'] = gym_branch
                }
                let reminderResponse = await renewalReminder.create(reminderModel);
                return res.status(200).json({
                  renewalReminder: reminderResponse,
                  message: "Added New Renewal Reminder Successfully",
                  success: true,
                });
            } else {
            return res.status(422).json({
                message: "Empty Fields found. Either activeTo, activeFrom, timeSlot, gymService or userId missing.",
                success: false,
            });
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteReminder = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Renewal Reminder Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteRenewalReminder = await renewalReminder.deleteOne({ _id: id });
          if (
            deleteRenewalReminder["deletedCount"] === 0 ||
            deleteRenewalReminder === null ||
            deleteRenewalReminder === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Renewal Reminmder Not found ",
              success: true,
            });
          } else if (
            deleteRenewalReminder["deletedCount"] === 1 ||
            deleteRenewalReminder !== null ||
            deleteRenewalReminder !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Renewal Reminder Deleted Successfully !!! ",
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
        let reminders = await renewalReminder.find().populate('gymService').populate('gym_branch').populate('userId').exec();
        if (
            reminders !== undefined &&
            reminders.length !== 0 &&
            reminders !== null
        ) {
          return res.status(200).send({
            renewalReminders: reminders ,
            messge: "All Reminders",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "RenewalReminder does not exist",
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

module.exports = { submit, deleteReminder, getAll };