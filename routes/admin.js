const express = require("express");
const Admin = require("../models/admin");
const Request = require("../models/serviceRequest");
const User = require("../models/user");
const Employee = require("../models/employee");
const adminRouter = express.Router();
const Demo = require("../models/demo");
const demoBooking = require("../models/demoBooking");
const helper = require("../utils/helper");
const fs = require("fs");

// Add Admin
adminRouter.post("/addAdmin", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, isAdmin } = req.body;

    console.log(
      "name, email, password, phoneNumber, isAdmin",
      name,
      email,
      password,
      phoneNumber,
      isAdmin
    );
    let findAdmin = await Admin.find({ email: email });
    if (
      findAdmin.length === 0 ||
      findAdmin === null ||
      findAdmin === undefined
    ) {
      let admin = await Admin.create({
        name,
        email,
        password,
        phoneNumber,
        isAdmin,
      });
      return res.status(200).json({
        admin,
        message: "Add Admin Successfully",
        success: true,
      });
    } else {
      let admin = findAdmin[0];
      return res.status(200).json({
        admin,
        message:
          "Admin Already Existy .Only one admin can add in database. you can not add another admin",
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong ",
      success: false,
    });
  }
});

// Admin Login
adminRouter.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== undefined &&
      email !== null &&
      email !== "" &&
      password !== undefined &&
      password !== null &&
      password !== ""
    ) {
      let findAdmin = await Admin.find({ email: email });
      if (
        findAdmin.length === 0 ||
        findAdmin === undefined ||
        findAdmin === null
      ) {
        return res.status(404).json({
          message: "Admin Not Found",
          success: false,
        });
      } else {
        if (findAdmin[0].password === password) {
          return res.status(200).json({
            findAdmin,
            message: "Admin Successfully LogedIn",
            success: true,
          });
        } else {
          return res.status(200).json({
            message: "Incorrect Password",
            success: true,
          });
        }
      }
    } else {
      return res.status(200).json({
        message: "Empty Field found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong ",
      success: false,
    });
  }
});

adminRouter.post("/addCoin", async (req, res) => {
  try {
    const { id, coin } = req.body;
    if (
      id !== undefined &&
      id !== "" &&
      id !== null &&
      coin !== undefined &&
      coin !== null &&
      coin !== ""
    ) {
      console.log("id,coin", id, coin);
      let checkUser = await User.findById({ _id: id });
      if (checkUser !== null && checkUser !== undefined) {
        let previousCoin = checkUser["coin"];

        let addCoin = await User.findOneAndUpdate(
          { _id: id },
          { coin: previousCoin + coin }
        );

        if (
          addCoin.length === 0 ||
          addCoin === undefined ||
          addCoin === null ||
          addCoin === ""
        ) {
          return res.status(200).json({
            id,
            message: "User Not Found !!!",
            success: false,
          });
        } else {
          return res.status(200).json({
            message: "Coins Add Successfully",
            success: true,
          });
        }
      } else {
        return res.status(200).json({
          id,
          message: "User Not Found !!!",
          success: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "Empty Field found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong ",
      success: false,
    });
  }
});

adminRouter.post("/addRequestForAdmin", async (req, res) => {
  try {
    const { message, inSufficientCoins, serviceID, userID } = req.body;
    console.log(
      "message, inSufficientCoins, serviceID, userID ",
      message,
      inSufficientCoins,
      serviceID,
      userID
    );
    if (
      message !== null &&
      message !== undefined &&
      message !== "" &&
      inSufficientCoins !== null &&
      inSufficientCoins !== undefined &&
      inSufficientCoins !== "" &&
      serviceID !== null &&
      serviceID !== "" &&
      serviceID !== undefined &&
      userID !== null &&
      userID !== "" &&
      userID !== undefined
    ) {
      let createRequest = await Request.create({
        serviceID,
        userID,
        message,
        inSufficientCoins,
      });
      return res.status(200).json({
        createRequest,
        message: "Add Request Successfully ",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong ",
      success: false,
    });
  }
});

// Get All Service
adminRouter.get("/getAllUsers", async (req, res) => {
  try {
    let getAllUsers = await User.find();
    if (
      getAllUsers !== undefined &&
      getAllUsers.length !== 0 &&
      getAllUsers !== null
    ) {
      return res.status(200).send({
        getAllUsers,
        messge: "All Users",
        success: true,
      });
    } else {
      return res.status(200).send({
        messge: "Users Not Exist",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// Add User
adminRouter.post("/addNewUser", async (req, res) => {
  try {
    const { firstName, lastName, number, coin, email, postal_code, user_Address, gender, DOB } = req.body;
    const image = req?.files?.image?.tempFilePath;
    if (
      firstName !== "" &&
      firstName !== undefined &&
      firstName !== null &&
      lastName !== "" &&
      lastName !== undefined &&
      lastName !== null &&
      coin !== "" &&
      coin !== undefined &&
      coin !== null &&
      DOB !== "" &&
      DOB !== undefined &&
      DOB !== null &&
      gender !== "" &&
      gender !== undefined &&
      gender !== null &&
      email !== "" &&
      email !== undefined &&
      email !== null &&
      user_Address !== "" &&
      user_Address !== undefined &&
      user_Address !== null &&
      postal_code !== "" &&
      postal_code !== undefined &&
      postal_code !== null &&
      image !== "" &&
      image !== undefined &&
      image !== null &&
      number !== "" &&
      number !== undefined &&
      number !== null
    ) {

      let findEmployee = await User.findOne({ number: number });
      if (findUser !== undefined && findUser !== null) {
        return res.status(422).json({
          message: "User Already Exist",
          success: false,
        });
      } else {
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
        let user = await User.create({
          firstName,
          lastName,
          number,
          email,
          DOB,
          gender,
          user_Address,
          postal_code,
          coin,
          profilePicture: imageURL
        });
        return res.status(200).json({
          user,
          message: "Add User Successfully",
          success: true,
        });
      }
    } else {
      return res.status(422).json({
        message: "Empty Field found.All Fields are required",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});


// Delet User
adminRouter.delete("/deleteUser", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    }
    else {
      let deleteUser = await User.deleteOne({ _id: id });
      if (
        deleteUser["deletedCount"] === 0 ||
        deleteUser === null ||
        deleteUser === undefined
      ) {
        return res.status(404).json({
          message: "Deme Not found ",
          success: false,
        });
      } else if (
        deleteUser["deletedCount"] === 1 ||
        deleteUser !== null ||
        deleteUser !== undefined
      ) {
        return res.status(200).json({
          message: "User Deleted Successfully ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});


//Add Employee
adminRouter.post("/addNewEmployee", async (req, res) => {
  try {
    const { firstName, lastName, number, email, postal_code, employee_Address, gender, age } = req.body;
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
      age !== "" &&
      age !== undefined &&
      age !== null &&
      email !== "" &&
      email !== undefined &&
      email !== null &&
      employee_Address !== "" &&
      employee_Address !== undefined &&
      employee_Address !== null &&
      postal_code !== "" &&
      postal_code !== undefined &&
      postal_code !== null &&
      image !== "" &&
      image !== undefined &&
      image !== null &&
      number !== "" &&
      number !== undefined &&
      number !== null
    ) {

      let findEmployee = await Employee.findOne({ number: number });
      if (findEmployee !== undefined && findEmployee !== null) {
        return res.status(422).json({
          message: "Employee Already Exist",
          success: false,
        });
      } else {
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
        let employee = await Employee.create({
          firstName,
          lastName,
          number,
          email,
          postal_code,
          employee_Address,
          gender, age,
          profilePicture: imageURL
        });
        return res.status(200).json({
          employee,
          message: "Add New Employee Successfully",
          success: true,
        });
      }
    } else {
      return res.status(422).json({
        message: "Empty Field found.All Fields are required",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});


//Delete Employee
adminRouter.delete("/deleteEmployee", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    }
    else {
      let deleteEmployee = await Employee.deleteOne({ _id: id });
      if (
        deleteEmployee["deletedCount"] === 0 ||
        deleteEmployee === null ||
        deleteEmployee === undefined
      ) {
        return res.status(404).json({
          message: "Deme Not found ",
          success: false,
        });
      } else if (
        deleteEmployee["deletedCount"] === 1 ||
        deleteEmployee !== null ||
        deleteEmployee !== undefined
      ) {
        return res.status(200).json({
          message: "Employee Deleted Successfully ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//Add Demo
adminRouter.post("/addDemo", async (req, res) => {
  const { Date, Time, Service_id } = req.body;
  try {
    if (
      Date !== "" &&
      Date !== undefined &&
      Date !== null &&
      Time !== "" &&
      Time !== undefined &&
      Time !== null &&
      Service_id !== "" &&
      Service_id !== undefined &&
      Service_id !== null
    ) {
      let demo = await Demo.create({
        Date,
        Time,
        Service_id,
      });
      return res.status(200).json({
        demo,
        message: "Add Demo Successfully",
        success: false,
      });
    } else {
      return res.status(422).json({
        message: "Empty Field Found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// Edit Demo 
adminRouter.put("/editDemo", async (req, res) => {
  try {
    const { Date, Time, Service_id, id } = req.body;
    if (
      Date !== "" &&
      Date !== undefined &&
      Date !== null &&
      Time !== "" &&
      Time !== undefined &&
      Time !== null &&
      id !== "" &&
      id !== undefined &&
      id !== null &&
      Service_id !== "" &&
      Service_id !== undefined &&
      Service_id !== null
    ) {
      let updateDemo = await Demo.findOneAndUpdate(
        { _id: id },
        {
          Date, Time, Service_id,
        }
      );
      if (
        updateDemo.length === 0 ||
        updateDemo === undefined ||
        updateDemo === null ||
        updateDemo === ""
      ) {
        return res.status(404).json({
          message: "This Gym Branch Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Gym Branch",
          success: true,
        });
      }
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: true
    })
  }
});

// Delet Demo
adminRouter.delete("/deleteDemo", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    }
    else {
      let deleteDemo = await Demo.deleteOne({ _id: id });
      if (
        deleteDemo["deletedCount"] === 0 ||
        deleteDemo === null ||
        deleteDemo === undefined
      ) {
        return res.status(404).json({
          message: "Deme Not found ",
          success: false,
        });
      } else if (
        deleteDemo["deletedCount"] === 1 ||
        deleteDemo !== null ||
        deleteDemo !== undefined
      ) {
        return res.status(200).json({
          message: "Demo Deleted Successfully ",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
      success: false,
    });
  }
});

// Get All Demo Booking By All Users
adminRouter.get("/getAllUserBookingDemo", async (req, res) => {
  try {
    let getAllDemosBookings = await demoBooking.find();
    if (
      getAllDemosBookings.lenght === 0 ||
      getAllDemosBookings === undefined ||
      getAllDemosBookings === null
    ) {
      return res.status(422).json({
        message: "Demo Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        getAllDemosBookings,
        message: "Get All Users Booking Demos Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

adminRouter.get("/getAdminUserProfile", async (req, res) => {
  try {
    // let getAllDemosBookings = await Admin.find();
    let AdminData = await Admin.find({ _id: '6309ba46e04e4772afddfa06' });
    if (
      AdminData.length === 0 ||
      AdminData === undefined ||
      AdminData === null
    ) {
      return res.status(422).json({
        message: "Demo Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        AdminData,
        message: "Get All Users Booking Demos Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }

})

adminRouter.post("/adminUpdateProfile", async (req, res) => {

 
  try {
    const { name, email, phoneNumber, password } = req.body;
    if (
      name !== "" &&
      name !== undefined &&
      name !== null &&
      email !== "" &&
      email !== undefined &&
      email !== null &&
      phoneNumber !== "" &&
      phoneNumber !== undefined &&
      phoneNumber !== null &&
      password !== "" &&
      password !== undefined &&
      password !== null
    ) {
      let adminData = await Admin.findOneAndUpdate(
        { _id: '6309ba46e04e4772afddfa06' },
        {
          name, email, phoneNumber, password
        }
      );
      if (
        adminData.length === 0 ||
        adminData === undefined ||
        adminData === null ||
        adminData === ""
      ) {
        return res.status(404).json({
          message: "User Data Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          // id,
          message: "Update Password Successfully",
          success: true,
        });
      }
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: true
    })
  }

});
// 
module.exports = adminRouter;