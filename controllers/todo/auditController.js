const { isEmpty } = require("lodash");
const audits = require("../../models/todo/audit");

const submit = async (req, res) => {
    try {
        const { staffInOut, whatsAppStatus, whatsAppBroadcast, hygieneCheck, addWhatsAppContact, airPercentageCheck, turnedOnLights,
            cashHandover, absentSmsCalls, followUpCalls, turnetOffLights, gymService } = req.body;
        if (isEmpty(gymService)) {
            return res.status(422).json({
                message: "Empty Fields found GymService is missing.",
                success: false,
            });
        }
        let auditModel = {
            staffInOut, whatsAppStatus, whatsAppBroadcast, hygieneCheck, addWhatsAppContact, 
            airPercentageCheck, turnedOnLights, cashHandover, absentSmsCalls, followUpCalls,
            turnetOffLights, gymService
        };
        let auditsResponse = await audits.create(auditModel);
        return res.status(200).json({
            audits: auditsResponse,
            message: "Added New Audits Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteAudits = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Audit Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteAudit = await audits.deleteOne({ _id: id });
          if (
            deleteAudit["deletedCount"] === 0 ||
            deleteAudit === null ||
            deleteAudit === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Audits Not found ",
              success: true,
            });
          } else if (
            deleteAudit["deletedCount"] === 1 ||
            deleteAudit !== null ||
            deleteAudit !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Audit Deleted Successfully !!! ",
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
        let allAudits = await audits.find().populate('gymService').exec();
        if (
            allAudits !== undefined &&
            allAudits.length !== 0 &&
            allAudits !== null
        ) {
          return res.status(200).send({
            audits: allAudits ,
            messge: "All Audits",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Audits does not exist",
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

module.exports = { submit, deleteAudits, getAll };