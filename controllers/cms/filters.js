const { isEmpty } = require("lodash");
const filters = require("../../models/cms/filters");

const submit = async (req, res) => {
    try {
        const { fit5, strong60, enquiries, renewals, upcomingDemos, feeBalance, inactiveClients,
            fusions, demosBooked, newJoining, upcomingRenewals, review, activeClients, gymService,
            fit, gym_branch } = req.body;
        if (isEmpty(gymService)) {
            return res.status(422).json({
                message: "Empty Fields found GymService is missing.",
                success: false,
            });
        }
        let filterModel = {
            fit5, strong60, enquiries, renewals, upcomingDemos, feeBalance,
            inactiveClients, fusions, demosBooked, newJoining, upcomingRenewals,
            review, gymService, activeClients, fit, gym_branch
        };
        let filtersResponse = await filters.create(filterModel);
        return res.status(200).json({
            filters: filtersResponse,
            message: "Added New Filters Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteFilters = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Filter Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteFilter = await filters.deleteOne({ _id: id });
          if (
            deleteFilter["deletedCount"] === 0 ||
            deleteFilter === null ||
            deleteFilter === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Filters Not found ",
              success: true,
            });
          } else if (
            deleteFilter["deletedCount"] === 1 ||
            deleteFilter !== null ||
            deleteFilter !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Filter Deleted Successfully !!! ",
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
        let allFilters = await filters.find().populate('gymService').populate('gym_branch').exec();
        if (
            allFilters !== undefined &&
            allFilters.length !== 0 &&
            allFilters !== null
        ) {
          return res.status(200).send({
            filters: allFilters ,
            messge: "All Filters",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Filters does not exist",
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

module.exports = { submit, deleteFilters, getAll };