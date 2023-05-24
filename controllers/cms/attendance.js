const { isEmpty } = require("lodash");
const attendanceModel = require("../../models/cms/attendance");

const submit = async (req, res) => {
    try {
        const { user, monthDate, noOfDaysPresent, noOfDaysAbsent, gym_branch } = req.body;
        if (isEmpty(user) || isEmpty(monthDate)) {
            return res.status(422).json({
                message: "Empty Fields found user Id or monthDate is missing.",
                success: false,
            });
        }
        let existingAttendanceResponse = await attendanceModel.findOne({ user });
        if(isEmpty(existingAttendanceResponse)) {
          let attendanceReq = {
              user,
              monthDate,
              noOfDaysPresent : isNaN(noOfDaysPresent) ? 0 : Number(noOfDaysPresent),
              noOfDaysAbsent : isNaN(noOfDaysAbsent) ? 0 : Number(noOfDaysAbsent),
              gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
          };
          let attendanceResponse = await attendanceModel.create(attendanceReq);
          return res.status(200).json({
              attendance: attendanceResponse,
              message: "Added New Attendance Successfully",
              success: true,
          });
        }
        let updateAttendance = {
          noOfDaysPresent : isNaN(present) || present === 0 ? undefined : existingAttendanceResponse.noOfDaysPresent || 0 + Number(present),
          noOfDaysAbsent : isNaN(absent) || absent === 0 ? undefined : existingAttendanceResponse.noOfDaysAbsent || 0 +  Number(absent),
          gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        let attendanceResponse = await attendanceModel.findOneAndUpdate(
          { _id: attendanceId },
          { $set : updateAttendance }
        );
        if (
            attendanceResponse.length === 0 ||
            attendanceResponse === undefined ||
            attendanceResponse === null ||
            attendanceResponse === ""
        ) {
            return res.status(200)
                .json([{ msg: "Attendance not found!!!", res: "error", }]);
        } else {
            const attendanceData = await attendanceModel.findOne({ _id: attendanceId })
            return res.status(200)
                .json([{ msg: "Attendance updated successflly", data: attendanceData, res: "success" }]);
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const updatePresentOrAbsent = async (req, res) => {
    try {
        const { attendanceId, present, absent } = req.body;
        if (isEmpty(attendanceId)) {
            return res.status(422).json({
                message: "Empty Fields found Attendance Id is missing.",
                success: false,
            });
        }
        let existingAttendanceResponse = await attendanceModel.findOne({ _id : attendanceId });
        let updateAttendance = {
          noOfDaysPresent : isNaN(present) || present === 0 ? undefined : existingAttendanceResponse.noOfDaysPresent || 0 + Number(present),
          noOfDaysAbsent : isNaN(absent) || absent === 0 ? undefined : existingAttendanceResponse.noOfDaysAbsent || 0 +  Number(absent),
        };
        if(isEmpty(existingAttendanceResponse)) {
          const todaysDate = new Date();
          const fullYear = todaysDate.getFullYear();
          const month = '0' + todaysDate.getMonth() + 1;
          updateAttendance['monthDate'] = month + '-' + fullYear;
        }
        let attendanceResponse = await attendanceModel.findOneAndUpdate(
            { _id: attendanceId },
            { $set : updateAttendance }
        );
        if (
            attendanceResponse.length === 0 ||
            attendanceResponse === undefined ||
            attendanceResponse === null ||
            attendanceResponse === ""
        ) {
            return res.status(200)
                .json([{ msg: "Attendance not found!!!", res: "error", }]);
        } else {
            const attendanceData = await attendanceModel.findOne({ _id: attendanceId })
            return res.status(200)
                .json([{ msg: "Attendance updated successflly", data: attendanceData, res: "success" }]);
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Attendance Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteAttendanceRes = await attendanceModel.deleteOne({ _id: id });
          if (
            deleteAttendanceRes["deletedCount"] === 0 ||
            deleteAttendanceRes === null ||
            deleteAttendanceRes === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Attendance Not found ",
              success: true,
            });
          } else if (
            deleteAttendanceRes["deletedCount"] === 1 ||
            deleteAttendanceRes !== null ||
            deleteAttendanceRes !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Attendance Deleted Successfully !!! ",
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
        let allAttendances = await attendanceModel.find().populate('user').populate('gym_branch').exec();
        if (
            allAttendances !== undefined &&
            allAttendances.length !== 0 &&
            allAttendances !== null
        ) {
          return res.status(200).send({
            attendances: allAttendances ,
            messge: "All Attendances",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Attendance does not exist",
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

module.exports = { submit, deleteAttendance, getAll, updatePresentOrAbsent };