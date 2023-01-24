const Request = require("../models/serviceRequest");
const Employee = require("../models/employee");
const fs = require("fs");
const mongoose = require('mongoose');


const addEmployee = async (req, res) => {
    try {
        const { firstName, lastName, number, email, postal_code, employee_Address, gender, age, role } = req.body;
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
          image !== "" &&
          image !== undefined &&
          image !== null &&
          number !== "" &&
          number !== undefined &&
          number !== null &&
          role !== "" &&
          role !== undefined &&
          role !== null
        ) {
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
            let employeeCreation = {
                firstName,
                lastName,
                number,
                email,
                postal_code,
                employee_Address,
                gender, 
                age,
                profilePicture: imageURL
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
        let allEmployee = await Employee.find();
        let getAllEmployee = [];
        // for(let user of allUsers) {
        //   let questionireAnswers = await Answers.find({ user_id: mongoose.Types.ObjectId(user._doc._id)}).populate("questions_id").populate("questionire_id").exec();
        //   let updatedQuestionireAns = questionireAnswers.map(q => q._doc);
        //   getAllUsers.push({
        //     ...user._doc,
        //     "questionireAnswers": updatedQuestionireAns
        // })
        // }
        // if (
        //   getAllUsers !== undefined &&
        //   getAllUsers.length !== 0 &&
        //   getAllUsers !== null
        // ) {
        //   return res.status(200).send({
        //     getAllUsers,
        //     messge: "All Users",
        //     success: true,
        //   });
        // } else {
        //   return res.status(200).send({
        //     messge: "Users Not Exist",
        //     success: false,
        //   });
        // }
      } catch (error) {
        return res.status(200).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { addEmployee, deleteEmployeeProfile, getAllEmployees }