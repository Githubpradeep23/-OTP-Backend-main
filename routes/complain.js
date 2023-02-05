const express = require("express");
const Complain = require("../models/complains");
const complainRouter = express.Router();
const mongoose = require('mongoose');

//Add Complain
complainRouter.post("/addComplain", async (req, res) => {
  try {
    const { query, userID } = req.body;
    if (
      userID !== "" &&
      userID !== undefined &&
      userID !== null &&
      query !== "" &&
      query !== undefined &&
      query !== null
    ) {
      let newComplain = await Complain.create({
        user_id: userID,
        complain: query,
        status: false
      });
      return res.status(200).json({
        newComplain,
        message: "Complain Added Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

//Get All Complainsss
complainRouter.get("/getAllComplains", async (req, res) => {
  try {
    let getAllComplain = await Complain.find().populate("user_id");
    if (
      getAllComplain !== undefined &&
      getAllComplain.length !== 0 &&
      getAllComplain !== null
    ) {
      return res.status(200).send({
        getAllComplain,
        messge: "Get All Complain Successfully",
        success: true,
      });
    } else {
      return res.status(200).send({
        getAllComplain,
        messge: "Complains Not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

complainRouter.delete("/deleteComplain",async(req,res)=>{
  try{
    const { id } = req.body;
    if (
      id !== "" &&
      id !== undefined &&
      id !== null 
    ){

      await Complain.deleteOne({ _id:id })
      return res.status(200).json({
        message: "Complain deleted Successfully",
        success: true,
      });
    
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }

  }catch(err){
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
})

complainRouter.put("/updateComplainStatus",async(req,res)=>{
  try{
    const { id } = req.body;
    if (
      id !== "" &&
      id !== undefined &&
      id !== null 
    ){

      const complain = await Complain.findById({ _id: mongoose.Types.ObjectId(id) });
      await Complain.updateOne({_id:mongoose.Types.ObjectId(id)}, { $set: {status:!complain._doc.status}}); 
      return res.status(200).json({
        message: "Complain Status updated Successfully",
        success: true,
      });
    
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }

  }catch(err){
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
})

module.exports = complainRouter
