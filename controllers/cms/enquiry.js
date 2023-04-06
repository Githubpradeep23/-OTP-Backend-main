const { isEmpty } = require("lodash");
const enquiry = require("../../models/cms/enquiry");

const submit = async (req, res) => {
    try {
        const { gymService, user, source, remarks } = req.body;
        if (isEmpty(gymService) || isEmpty(user)) {
            return res.status(422).json({
                message: "Empty Fields found GymService or User Id is missing.",
                success: false,
            });
        }
        let enquiryModel = { gymService, user, source, remarks };
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
        let allEnquiries = await enquiry.find().populate('gymService').populate('user').exec();
        if (
            allEnquiries !== undefined &&
            allEnquiries.length !== 0 &&
            allEnquiries !== null
        ) {
          return res.status(200).send({
            enquiries: allEnquiries ,
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

module.exports = { submit, deleteEnquiry, getAll };