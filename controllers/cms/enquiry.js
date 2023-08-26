const { isEmpty } = require("lodash");
const enquiry = require("../../models/cms/enquiry");

const submit = async (req, res) => {
    try {
        const { gymService, user, source, remarks, gym_branch } = req.body;
        if (isEmpty(gymService) || isEmpty(user)) {
            return res.status(422).json({
                message: "Empty Fields found GymService or User Id is missing.",
                success: false,
            });
        }
        let enquiryModel = { gymService, user, source, remarks, gym_branch };
        let enquiryResponse = await enquiry.create(enquiryModel);
        return res.status(200).json({
            enquiry: enquiryResponse,
            message: "Added New Enquiry Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Enquiry Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteEnquiry = await enquiry.deleteOne({ _id: id });
          if (
            deleteEnquiry["deletedCount"] === 0 ||
            deleteEnquiry === null ||
            deleteEnquiry === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Enquiry Not found ",
              success: true,
            });
          } else if (
            deleteEnquiry["deletedCount"] === 1 ||
            deleteEnquiry !== null ||
            deleteEnquiry !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Enquiry Deleted Successfully !!! ",
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
        let allEnquiries = await enquiry.find().populate('gymService').populate('gym_branch').populate('user').exec();
        let getAllEnquiries = [];
        for(let enquiry of allEnquiries) {
          getAllEnquiries.push({
            ...enquiry._doc,
            branchName: enquiry.gym_branch ? enquiry.gym_branch.branchName : undefined,
            branchLocation: enquiry.gym_branch ? enquiry.gym_branch.location : undefined,
          })
        }
        if (
          getAllEnquiries !== undefined &&
          getAllEnquiries.length !== 0 &&
          getAllEnquiries !== null
        ) {
          return res.status(200).send({
            enquiries: getAllEnquiries ,
            messge: "All Enquiries",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Enquiries does not exist",
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

const getEnquiriesByService = async (req, res) => {
  try {
    let allEnquiries = await enquiry.find().populate('gymService').exec();
    let getAllEnquiriesMap = new Map();
    let totalCount = 0;
    for(let enquiry of allEnquiries) {
      if(!getAllEnquiriesMap.has(enquiry.source)) {
        getAllEnquiriesMap.set(enquiry.source, {
          sourceName: enquiry.source,
          count: 1
        })
      } else {
        enquiryCount = getAllEnquiriesMap.get(enquiry.source);
        getAllEnquiriesMap.set(enquiry.source, {
          sourceName: enquiryCount.source,
          count: enquiryCount.count + 1
        })
      }
      totalCount++;
    }
    let enquiries = [];
    for(let enquiryValue of [...getAllEnquiriesMap.values()]) {
      enquiries.push({
        ...enquiryValue,
        percentage : (enquiryValue.count * 100) / totalCount
      })
    }
    return res.status(200).send({
      enquiries: enquiries ,
      messge: "All Enquiries by Source",
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
}

module.exports = { submit, deleteEnquiry, getAll, getEnquiriesByService };