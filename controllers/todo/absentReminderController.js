const { isEmpty } = require("lodash");
const absentReminder = require("../../models/todo/absentReminder");

const submit = async (req, res) => {
    try {
        const { date, timeSlot, followUpCall, reminderSMS, remarks, gymService, userId, done, notDone, gym_branch } = req.body;
        if ( isEmpty(timeSlot) || isEmpty(gymService) || isEmpty(userId)) {
            return res.status(422).json({
                message: "Empty Fields found. Either timeSlot, gymService or userId is missing.",
                success: false,
            });
        }
        let absentReminderModel = {
            timeSlot,
            date : isEmpty(date) ? new Date() : new Date(date),
            gymService,
            userId,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch 
          };
        if(followUpCall !== undefined){
            absentReminderModel['followUpCall'] = followUpCall;
        }
        if(reminderSMS !== undefined){
            absentReminderModel['reminderSMS'] = reminderSMS;
        }
        if(done !== undefined){
            absentReminderModel['done'] = done                                                                                   ;
        }
        if(notDone !== undefined){
            absentReminderModel['notDone'] = notDone                                                                                   ;
        }
        if(remarks !== null && remarks !== '' && remarks !== undefined){
            absentReminderModel['remarks'] = remarks                                                                                   ;
        }
        let absentReminderResponse = await absentReminder.create(absentReminderModel);
        return res.status(200).json({
          absentReminder: absentReminderResponse,
          message: "Added New Absent Reminder Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteAbsentReminder = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Absent Reminder Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteAbsentReminder = await absentReminder.deleteOne({ _id: id });
          if (
            deleteAbsentReminder["deletedCount"] === 0 ||
            deleteAbsentReminder === null ||
            deleteAbsentReminder === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Absent Reminmder Not found ",
              success: true,
            });
          } else if (
            deleteAbsentReminder["deletedCount"] === 1 ||
            deleteAbsentReminder !== null ||
            deleteAbsentReminder !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Absent Reminder Deleted Successfully !!! ",
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
        let absentReminders = await absentReminder.find().populate('gymService').populate('gym_branch').populate('userId').exec();
        let getAllAbsentReminders = [];
        for(let absentReminder of absentReminders) {
          getAllAbsentReminders.push({
            ...absentReminder._doc,
            branchName: absentReminder.gym_branch ? absentReminder.gym_branch.branchName : undefined,
            branchLocation: absentReminder.gym_branch ? absentReminder.gym_branch.location : undefined,
          })
        }
        if (
          getAllAbsentReminders !== undefined &&
          getAllAbsentReminders.length !== 0 &&
          getAllAbsentReminders !== null
        ) {
          return res.status(200).send({
            absentReminders: getAllAbsentReminders ,
            messge: "All Absent Reminders",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Absent Reminders does not exist",
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

module.exports = { submit, deleteAbsentReminder, getAll };