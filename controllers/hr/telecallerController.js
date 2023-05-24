const { isEmpty } = require("lodash");
const telecaller = require("../../models/hr/telecaller");
const mongoose = require('mongoose');

const submit = async (req, res) => {
    try {
        const { name, service, mobile,review, gym_branch } = req.body;
        if ( isEmpty(name) ||  isNaN(mobile) || isEmpty(service) || isEmpty(review)) {
            return res.status(400).json({
                message: "Empty Fields found. Either name, mobile, service or review is missing.",
                success: false,
            });
        }
        let telecallerModel = {
            name,
            mobile,
            service,
            review,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        
        let telecallerResponse = await telecaller.create(telecallerModel);
        return res.status(200).json({
          telecaller: telecallerResponse,
          message: "Added new Telecaller Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteTelecaller = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Telecaller Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteTelecaller = await telecaller.deleteOne({ _id: id });
          if (
            deleteTelecaller["deletedCount"] === 0 ||
            deleteTelecaller === null ||
            deleteTelecaller === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Telecaller Not found ",
              success: true,
            });
          } else if (
            deleteTelecaller["deletedCount"] === 1 ||
            deleteTelecaller !== null ||
            deleteTelecaller !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Telecaller Deleted Successfully !!! ",
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
        let telecallers = await telecaller.find().populate('service').populate('gym_branch').exec();
        let getAllTelecallers = [];
        for(let telecaller of telecallers) {
          getAllTelecallers.push({
            ...telecaller._doc,
            branchName: telecaller.gym_branch ? telecaller.gym_branch.branchName : undefined,
            branchLocation: telecaller.gym_branch ? telecaller.gym_branch.location : undefined,
          })
        }
        if (
          getAllTelecallers !== undefined &&
          getAllTelecallers.length !== 0 &&
          getAllTelecallers !== null
        ) {
          return res.status(200).send({
            telecallers: getAllTelecallers ,
            messge: "All telecallers",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "telecallers does not exist",
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

module.exports = { submit, deleteTelecaller, getAll };