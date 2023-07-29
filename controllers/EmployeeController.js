const Request = require("../models/serviceRequest");
const Employee = require("../models/employee");
const fs = require("fs");
const mongoose = require('mongoose');
const helper = require("../utils/helper");
const { isEmpty } = require("lodash");

const addEmployee = async (req, res) => {
    try {
        const { firstName, lastName, number, email, postal_code, employee_address, gender, age, role, password, gym_branch } = req.body;
        const image = req?.files?.image?.tempFilePath;
        if (
          firstName !== "" &&
          firstName !== undefined &&
          firstName !== null &&
          lastName !== "" &&
          lastName !== undefined &&
          lastName !== null &&
          gender !== "" &&
          gender !== undefined &&
          gender !== null &&
          email !== "" &&
          email !== undefined &&
          email !== null &&
          number !== "" &&
          number !== undefined &&
          number !== null &&
          role !== "" &&
          role !== undefined &&
          role !== null &&
          password !== "" &&
          password !== undefined &&
          password !== null
        ) {
          let employeeCreation = {
            firstName,
            lastName,
            number,
            email,
            gender,
            role
          };
          if(image !== null && image !== '' && image !== undefined) {
              let options = {
                method: "POST",
                url: "https://api.cloudinary.com/v1_1/bng/image/upload",
                headers: {
                    "cache-control": "no-cache",
                    "content-type":
                    "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                },
                formData: {
                    file: {
                    value: fs.readFileSync(image),
                    options: { filename: "r.png", contentType: null },
                    },
                    upload_preset: "uploadApi",
                    cloud_name: "bng",
                },
            };
            let imageURL = await helper.get(options);
            employeeCreation.profilePicture = imageURL
          }  
          if(employee_address !== null && employee_address !== '' && employee_address !== undefined){
              employeeCreation['employee_address'] = employee_address;
          }
          if(postal_code !== null && postal_code !== '' && postal_code !== undefined){
              employeeCreation['postal_code'] = postal_code;
          }
          if(age !== null && age !== '' && age !== undefined){
              employeeCreation['age'] = age                                                                                   ;
          }
          if(password !== null && password !== '' && password !== undefined){
              employeeCreation['password'] = password                                                                                   ;
          }
          if(gym_branch !== null && gym_branch !== '' && gym_branch !== undefined) {
              employeeCreation['gym_branch'] = gym_branch   
          }
          let employee = await Employee.create(employeeCreation);
            return res.status(200).json({
              employee,
              message: "Added New Employee Successfully",
              success: true,
            });
        } else {
          return res.status(422).json({
            message: "Empty Fields found. Either firstName, lastName, gender, email, image, number and role missing.",
            success: false,
          });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
      }
}

const deleteEmployeeProfile = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Employee Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteEmployee = await Employee.deleteOne({ _id: id });
          if (
            deleteEmployee["deletedCount"] === 0 ||
            deleteEmployee === null ||
            deleteEmployee === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Employee Not found ",
              success: true,
            });
          } else if (
            deleteEmployee["deletedCount"] === 1 ||
            deleteEmployee !== null ||
            deleteEmployee !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Employee Deleted Successfully !!! ",
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

const getAllEmployees = async (req, res) => {
    try {
        let allEmployees = await Employee.find().populate('gym_branch').exec();
        let getAllEmployee = [];
        for(let employee of allEmployees) {
          getAllEmployee.push({
            ...employee._doc,
            branchName: employee.gym_branch.branchName,
            branchLocation: employee.gym_branch.location,
          })
        }
        if (
          getAllEmployee !== undefined &&
          getAllEmployee.length !== 0 &&
          getAllEmployee !== null
        ) {
          return res.status(200).send({
            getAllEmployee,
            messge: "All Employees",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Employee does not exist",
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

const updateEmployeeProfile = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, number, email, postal_code, employee_address, gender, age, role, password, gym_branch} = req.body;
    const image = req?.files?.image?.tempFilePath;
    console.log('image', image)
    if (!employeeId) {
      return res.status(400)
          .json([{ msg: "Employee ID is required", res: "error", }]);
    }
    const profile = {}
    const employee = await Employee.findOne({ _id: mongoose.Types.ObjectId(employeeId) });
    if (employee === '' || employee === null || employee === undefined) {
      return res.status(400)
          .json([{ msg: "Employee not found.", res: "error", }]);
    }
    profile.firstName = firstName !== null && firstName !== undefined && firstName !== '' ? firstName : employee.firstName;
    profile.number = number !== null && number !== undefined && number !== '' ? number : employee.number;
    profile.gender = gender !== null && gender !== undefined && gender !== '' ? gender : employee.gender;
    profile.role = role !== null && role !== undefined && role !== '' ? role : employee.role;
    if(lastName !== null && lastName !== undefined && lastName !== '') { profile.lastName = lastName }
    if(email !== null && email !== undefined && email !== '') { profile.email = email }
    if(postal_code !== null && postal_code !== undefined && postal_code !== '') { profile.postal_code = postal_code }
    if(employee_address !== null && employee_address !== undefined && employee_address !== '') { profile.employee_address = employee_address }
    if(age !== null && age !== undefined && age !== '') { profile.age = age }
    if(password !== null && password !== undefined && password !== '') { profile.password = password }
    if(gym_branch !== null && gym_branch !== undefined && gym_branch !== '') { profile.gym_branch = mongoose.Types.ObjectId(gym_branch) }
    if (image !== "" &&
        image !== undefined &&
        image !== null) {
  
        var options = {
            method: "POST",
            url: "https://api.cloudinary.com/v1_1/bng/image/upload",
            headers: {
                "cache-control": "no-cache",
                "content-type":
                    "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            },
            formData: {
                file: {
                    value: fs.readFileSync(image),
                    options: { filename: "r.png", contentType: null },
                },
                upload_preset: "uploadApi",
                cloud_name: "bng",
            },
        };
  
        profile.profilePicture = await helper.get(options);
  
      } else {
        profile.profilePicture = employee.profilePicture
      }
      let updateEmployee = await Employee.findOneAndUpdate(
        { _id: employeeId },
        profile
      );
      if (
        updateEmployee.length === 0 ||
        updateEmployee === undefined ||
        updateEmployee === null ||
        updateEmployee === ""
      ) {
          return res.status(200)
              .json([{ msg: "Employee not found!!!", res: "error", }]);
      } else {
          const employeeData = await Employee.findOne({ _id: employeeId })
          return res.status(200)
              .json([{ msg: "Employee Profile updated successflly", data: employeeData, res: "success" }]);
      }
  } catch(err) {
    return res.status(500)
            .json([{ msg: err.message, res: "error" }]);
  }
}

const updateStatus = async (req, res) => {
  try{
    const { id } = req.body;
    if (
      id !== "" &&
      id !== undefined &&
      id !== null 
    ){

      const employee = await Employee.findById({ _id: mongoose.Types.ObjectId(id) });
      await Employee.updateOne({_id:mongoose.Types.ObjectId(id)}, { $set: {status:!employee._doc.status}}); 
      return res.status(200).json({
        message: "Employee Status updated Successfully",
        success: true,
      });
    
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }

  }catch(err){
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

const changePassword = async (req, res) => {
  try{
    const { number, password } = req.body;
    if (
      number !== "" &&
      number !== undefined &&
      number !== null &&
      password !== "" &&
      password !== undefined &&
      password !== null
    ){

      const employee = await Employee.findOne({ number });
      if(employee === null || employee === undefined || employee === '') {
        return res.status(400).json({
          message: "Employee not found with given number!!",
          success: false,
        });
      }
      await Employee.updateOne({ number }, { $set: {"password": password}}); 
      return res.status(200).json({
        message: "Employee Password updated Successfully",
        success: true,
      });
    
    } else {
      return res.status(200).json({
        message: "Empty Field found. All field are required !!!",
        success: false,
      });
    }

  }catch(err){
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

const loginEmployee = async (req, res) => {
  try {
      const { number, password } = req.body;
      let employeeRes = await Employee.findOne({ number, password });
      console.log(JSON.stringify(employeeRes._doc));
      if (isEmpty(employeeRes)) {
        return res.status(400).send({
          messge: "Either phone number or password incorrect",
          success: true,
        });
      } else {
        return res.status(200).send({
          messge: "Employee Found",
          success: true,
          employeeRes
        });
      }
    } catch (error) {
      return res.status(400).send({
        messge: "Somethig went wrong",
        success: false,
      });
    }
}


const getEmployeesById = async (req, res) => {
  try {
      const id = req.params['id'];
      let employeeById = await Employee.findOne({ _id : id}).populate('gym_branch').exec();
      const updatedEmployeeById = {
        ...employeeById._doc,
        branchName: employeeById.gym_branch.branchName,
        branchLocation: employeeById.gym_branch.location,
      }
      if (
        updatedEmployeeById !== undefined &&
        updatedEmployeeById !== null
      ) {
        return res.status(200).send({
          employee: updatedEmployeeById,
          messge: "Get Employee ById",
          success: true,
        });
      } else {
        return res.status(200).send({
          messge: "Employee does not exist",
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


module.exports = { addEmployee, deleteEmployeeProfile, getAllEmployees, updateEmployeeProfile, updateStatus, changePassword, loginEmployee, getEmployeesById }
