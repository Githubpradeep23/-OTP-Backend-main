const Request = require("../../models/serviceRequest");
const pushCall = require("../../models/todo/pushCall");

const submit = async (req, res) => {
    try {
        const { callBackOn, interestedIn, bookDemo, gymService, userId, remarks } = req.body;
        if (
            callBackOn !== "" &&
            callBackOn !== undefined &&
            callBackOn !== null &&
            gymService !== "" &&
            gymService !== undefined &&
            gymService !== null &&
            userId !== "" &&
            userId !== undefined &&
            userId !== null) {
                let pushCallModel = {
                    callBackOn: new Date(callBackOn),
                    gymService,
                    userId
                };
                if(interestedIn !== null && interestedIn !== '' && interestedIn !== undefined){
                    pushCallModel['interestedIn'] = interestedIn;
                }
                if(bookDemo !== null && bookDemo !== '' && bookDemo !== undefined){
                    pushCallModel['bookDemo'] = bookDemo;
                }
                if(remarks !== null && remarks !== '' && remarks !== undefined){
                    pushCallModel['remarks'] = remarks                                                                                   ;
                }
                let pushCallResponse = await pushCall.create(pushCallModel);
                return res.status(200).json({
                  pushCall: pushCallResponse,
                  message: "Added New PushCall Successfully",
                  success: true,
                });
            } else {
            return res.status(422).json({
                message: "Empty Fields found. Either callBackOn, gymService and userId missing.",
                success: false,
            });
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deletePushCall = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "PushCall Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deletePushCall = await pushCall.deleteOne({ _id: id });
          if (
            deletePushCall["deletedCount"] === 0 ||
            deletePushCall === null ||
            deletePushCall === undefined
          ) {
            return res.status(404).json({
              id,
              message: "PushCall Not found ",
              success: true,
            });
          } else if (
            deletePushCall["deletedCount"] === 1 ||
            deletePushCall !== null ||
            deletePushCall !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "PushCall Deleted Successfully !!! ",
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
        let pushCalls = await pushCall.find().populate('gymService').populate('userId').exec();
        if (
            pushCalls !== undefined &&
            pushCalls.length !== 0 &&
            pushCalls !== null
        ) {
          return res.status(200).send({
            pushCalls ,
            messge: "All PushCalls",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "PushCall does not exist",
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

module.exports = { submit, deletePushCall, getAll };