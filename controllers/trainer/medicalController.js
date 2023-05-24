const { isEmpty } = require("lodash");
const medicalRecords = require("../../models/trainer/medicalRecords");
const mongoose = require('mongoose');

const submit = async (req, res) => {
    try {
        const { allergies, user, conditions, medications, previousInjury, gym_branch} = req.body;
        if (isEmpty(allergies) || isEmpty(user) || isEmpty(conditions) || isEmpty(medications) || isEmpty(previousInjury)) {
            return res.status(400).json({
                message: "Empty Fields found. Either allergies, user, conditions, medications or previousInjury is missing.",
                success: false,
            });
        }
        let medicalRecordModel = {
            allergies,
            user,
            conditions,
            medications,
            previousInjury,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        
        let medicalRecordsResponse = await medicalRecords.create(medicalRecordModel);
        return res.status(200).json({
          medicalReocrd: medicalRecordsResponse,
          message: "Added New MedicalRecord Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteMedicalRecords = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "MedicalRecord Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteMedicalRecord= await medicalRecords.deleteOne({ _id: id });
          if (
            deleteMedicalRecord["deletedCount"] === 0 ||
            deleteMedicalRecord === null ||
            deleteMedicalRecord === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Medical Record Not found ",
              success: true,
            });
          } else if (
            deleteMedicalRecord["deletedCount"] === 1 ||
            deleteMedicalRecord !== null ||
            deleteMedicalRecord !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Medical Record deleted Successfully !!! ",
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
        let allMedicalRecords = await medicalRecords.find().populate('user').populate('gym_branch');
        if (
            allMedicalRecords !== undefined &&
            allMedicalRecords.length !== 0 &&
            allMedicalRecords !== null
        ) {
          return res.status(200).send({
            medicalRecords: allMedicalRecords ,
            messge: "All MedicalRecords",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Medical Records does not exist",
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

const getAllMedicalRecordsOfUser = async (req, res) => {
    try {
        const user = req.params['user'];
        let medicalRecordsByUser = await medicalRecords.findOne({ user }).populate('user').populate('gym_branch');
        if (
            medicalRecordsByUser !== undefined &&
            medicalRecordsByUser.length !== 0 &&
            medicalRecordsByUser !== null
        ) {
          return res.status(200).send({
            medicalRecordsByUser ,
            messge: "All Medical Records of user",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "MedicalRecords does not exist",
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

const update = async (req, res) => {
    try {
        const { medicalRecordId, allergies, user, conditions, medications, previousInjury, gym_branch } = req.body;
        if (!medicalRecordId) {
            return res.status(400)
                .json([{ msg: "Medical Record ID is required", res: "error", }]);
        }
        const updateMedicalRecord = {}
        const medicalRecordExists = await medicalRecords.findOne({ _id: mongoose.Types.ObjectId(medicalRecordId) });
        if (isEmpty(medicalRecordExists)) {
            return res.status(400)
                .json([{ msg: "MedicalRecord not found.", res: "error", }]);
        }
        updateMedicalRecord.allergies = isEmpty(allergies) ? undefined : allergies;
        updateMedicalRecord.user = isEmpty(user) ? undefined : user;
        updateMedicalRecord.conditions = isEmpty(conditions) ? undefined :conditions;
        updateMedicalRecord.medications = isEmpty(medications) ? undefined : medications;
        updateMedicalRecord.previousInjury = isEmpty(previousInjury) ? undefined : previousInjury;
        updateMedicalRecord.gym_branch = isEmpty(gym_branch) ? undefined : gym_branch;
        let updatedMedicalRecord = await medicalRecords.findOneAndUpdate(
            { _id: medicalRecordId },
            { $set : updateMedicalRecord}
        );
        if (
            updatedMedicalRecord.length === 0 ||
            updatedMedicalRecord === undefined ||
            updatedMedicalRecord === null ||
            updatedMedicalRecord === ""
        ) {
            return res.status(200)
                .json([{ msg: "Medical Record not found!!!", res: "error", }]);
        } else {
            const medicalRecordData = await medicalRecords.findOne({ _id: medicalRecordId })
            return res.status(200)
                .json([{ msg: "Medical Record updated successflly", data: medicalRecordData, res: "success" }]);
        }
    } catch(err) {
      return res.status(500)
              .json([{ msg: err.message, res: "error" }]);
    }
}

module.exports = { submit, deleteMedicalRecords, getAll, getAllMedicalRecordsOfUser, update };