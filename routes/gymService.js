const express = require("express");
const GYM_SERVICE = require("../models/gymServices");
const GYM_BRANCH = require("../models/gymBranch");
const gymServiceRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");
const User = require("../models/user");
const Coach = require("../models/coach");
const Demo = require("../models/demo");
const Manager = require("../models/manager");
const Package = require("../models/bookPackage");

// Add GYM Servcie
gymServiceRouter.post("/addGymSevice", async (req, res) => {
  try {
    console.log("Start Add Service Api At line 16");
    console.log('body',req.body);
    // return false;

    const { title, description, price, category, branchesID_Array, demoDate, demoTime, packageDate, packageTime, packageDuration, manager_contact_no, working_hours, coachName, contact_no, delievrables, consultationDate, consultationTime, slotTime,priceOneMonth,priceThreeMonth,priceSixMonth,priceTwelveMonth } = req.body;
    const image = req?.files?.image?.tempFilePath;



 


    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      description !== undefined &&
      description !== "" &&
      description !== null &&
   
      image !== undefined &&
      image !== null &&
      image !== "" &&
      category !== "" &&
      category !== null &&
      category !== undefined
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

      console.log("title,image,category,description,price => at line 58", title, imageURL, category, description, price);

      if (category === "fitness") {
        try {
          if (branchesID_Array.length > 0 && branchesID_Array !== null && branchesID_Array.lenght !== 0 && branchesID_Array !== undefined && branchesID_Array !== "") {
            try {
              let parseData = JSON.parse(branchesID_Array);

              console.log("🚀 ~ file: gymService.js ~ line 65 ~ gymServiceRouter.post ~ parseData", parseData);
              console.log("🚀 ~ file: gymService.js ~ line 66 ~ gymServiceRouter.post ~ parseData.length", parseData.length);
              
              let Data = parseData.map((branch_id, index) => {
                return {
                  title,
                  description,
                  // price,
                  image: imageURL,
                  category,
                  branch_id,
                  slotTime,
                  // duration: packageDuration
                  priceOneMonth,priceThreeMonth,priceSixMonth,priceTwelveMonth
                }
              })

              let gymServiceData = await GYM_SERVICE.insertMany(Data);
              console.log("🚀 ~ file: gymService.js ~ line 81 ~ gymServiceRouter.post ~ gymServiceData", gymServiceData);

              // if (
              //   demoDate !== null &&
              //   demoDate !== "" &&
              //   demoDate !== undefined &&
              //   demoTime !== null &&
              //   demoTime !== "" &&
              //   demoTime !== undefined
              // ) {
              //   let demoData = gymServiceData.map((value, index) => {
              //     return {
              //       Service_id: value["_id"],
              //       Date: demoDate,
              //       Time: demoTime
              //     }
              //   });

              //   let AllDemos = await Demo.insertMany(demoData);
              //   console.log("🚀 ~ file: gymService.js ~ line 100 ~ gymServiceRouter.post ~ AllDemos In Fitness Category", AllDemos)
              // }

              if (
                // working_hours !== null &&
                // working_hours !== "" &&
                // working_hours !== undefined &&
                manager_contact_no !== null &&
                manager_contact_no !== "" &&
                manager_contact_no !== undefined
              ) {

                let allManagersData = gymServiceData.map((value, index) => {
                  console.log("🚀 ~ file: gymService.js ~ line 113 ~ allManagersData ~ value", value)
                  return {
                    service_id: value["_id"],
                    // working_hours,
                    manager_contact_no
                  }
                });

                let TalkToManagers = await Manager.insertMany(allManagersData);
                console.log("🚀 ~ file: gymService.js ~ line 121 ~ gymServiceRouter.post ~ TalkToManagers In Fitness Category", TalkToManagers)
              }
              console.log('hi')
              return res.status(200).json({
                message: "Service Added Successfully In Fitness Section",
                success: true
              });

              // if (
              //   packageDate !== null &&
              //   packageDate !== "" &&
              //   packageDate !== undefined &&
              //   packageTime !== null &&
              //   packageTime !== "" &&
              //   packageTime !== undefined
              // ) {

              // let duration = packageDuration ? packageDuration : null;
              // let packageData = gymServiceData.map((value, index) => {
              //   return {
              //     service_id: value["_id"],
              //     // Date: packageDate,
              //     // Time: packageTime,
              //     Durataion: duration
              //   }
              // });

              // let AllPackages = await Package.insertMany(packageData);
              // console.log("🚀 ~ file: gymService.js ~ line 144 ~ gymServiceRouter.post ~ AllPackages In fitnes", AllPackages);
              // }


            } catch (error) {

              console.log("🚀 ~ file: gymService.js ~ line 147 ~ gymServiceRouter.post ~ error", error);
              return res.status(500).json({
                message: error.message,
                success: false
              });
            }
          }
          else {
            return res.status(422).json({
              message: "Branches ID Arrays Are Required. Please Post Valid Branches ID's Array",
              success: true
            });
          }
        } catch (error) {

          console.log("🚀 ~ file: gymService.js ~ line 162 ~ gymServiceRouter.post ~ error", error)
          return res.status(500).json({
            message: error.message,
            success: false
          });
        }
      }
      else if (category === "wellness") {
        console.log("Enter wellness category line 177", category)
        try {
          if (
            delievrables !== undefined &&
            delievrables !== null &&
            delievrables !== ""
            // consultationDate !== null &&
            // consultationDate !== undefined &&
            // consultationDate !== "" &&
            // consultationTime !== null &&
            // consultationTime !== "" &&
            // consultationTime !== undefined
          ) {
            try {
              let addNewService = await GYM_SERVICE.create({
                title,
                image: imageURL,
                category,
                description,
                price,
                delievrables,
                slotTime,
                priceOneMonth,priceThreeMonth,priceSixMonth,priceTwelveMonth
                // consultationDate,
                // consultationTime
              });
              console.log("🚀 ~ file: gymService.js ~ line 203 ~ gymServiceRouter.post ~ addNewService", addNewService)

              let id = addNewService["_id"];
              console.log("🚀 ~ file: gymService.js ~ line 197 ~ gymServiceRouter.post ~ id In Wellness Sections", id);

              // if (
              //   packageDate !== null &&
              //   packageDate !== "" &&
              //   packageDate !== undefined &&
              //   packageTime !== null &&
              //   packageTime !== "" &&
              //   packageTime !== undefined
              // ) {
              //   let duration = packageDuration ? packageDuration : null;
              //   let AllPackages = await Package.create({
              //     Date: packageDate,
              //     Time: packageTime,
              //     Durataion: duration,
              //     service_id: id
              //   });

              //   console.log("🚀 ~ file: gymService.js ~ line 214 ~ gymServiceRouter.post ~ AllPackages", AllPackages);

              // }

              return res.status(200).json({
                message: "Service Added Successfully In Wellness Sections",
                success: true
              });
            } catch (error) {
              console.log("🚀 ~ file: gymService.js ~ line 218 ~ gymServiceRouter.post ~ error", error)
              return res.status(500).json({
                message: error.message,
                success: false
              });
            }
          }
        } catch (error) {
          console.log("🚀 ~ file: gymService.js ~ line 226 ~ gymServiceRouter.post ~ error", error)
          return res.status(500).json({
            message: error.message,
            success: false
          });
        }
      }
      else if (category === "academy") {
        try {
          if (
            delievrables !== undefined &&
            delievrables !== null &&
            delievrables !== ""
          ) {
            try {
              let service = await GYM_SERVICE.create({
                title,
                description,
                price,
                image: imageURL,
                category,
                delievrables,
                slotTime,
                priceOneMonth,priceThreeMonth,priceSixMonth,priceTwelveMonth
              });
              console.log("🚀 ~ file: gymService.js ~ line 249 ~ gymServiceRouter.post ~ service In Academy", service)

              let id = service["_id"];
              console.log("🚀 ~ file: gymService.js ~ line 252 ~ gymServiceRouter.post ~ id In Academy", id)

              if (
                coachName !== "" &&
                coachName !== null &&
                coachName !== undefined &&
                contact_no !== "" &&
                contact_no !== null &&
                contact_no !== undefined
              ) {
                let newCoach = await Coach.create({
                  name: coachName,
                  contact_no,
                  service_id: id
                });
                console.log("🚀 ~ file: gymService.js ~ line 267 ~ gymServiceRouter.post ~ newCoach In Academy", newCoach)
              }

              if (
                packageDate !== null &&
                packageDate !== "" &&
                packageDate !== undefined &&
                packageTime !== null &&
                packageTime !== "" &&
                packageTime !== undefined
              ) {
                let AllPackages = await Package.create({
                  Date: packageDate,
                  Time: packageTime,
                  service_id: id
                })
                console.log("🚀 ~ file: gymService.js ~ line 285 ~ gymServiceRouter.post ~ AllPackages In Academy", AllPackages);
              }
              return res.status(200).json({
                message: "Service Added Successfully In Academy Sections",
                success: true
              });
            } catch (error) {
              console.log("🚀 ~ file: gymService.js ~ line 288 ~ gymServiceRouter.post ~ error", error);
              return res.status(500).json({
                message: error.message,
                success: false
              });
            }
          }
        } catch (error) {
          console.log("🚀 ~ file: gymService.js ~ line 296 ~ gymServiceRouter.post ~ error", error);
          return res.status(500).json({
            message: error.message,
            success: false
          });
        }
      }
    }
    else {
      return res.status(422).json({
        message: "Empty Field found. Title , Descritpion , Price , Category And Image  Are Required !!!",
        success: false,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: gymService.js ~ line 311 ~ gymServiceRouter.post ~ error", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// Edit GYM Servcie
gymServiceRouter.put("/updateGymSevice", async (req, res) => {
  try {
    const image = req?.files?.image?.tempFilePath;
    const { id, title, description, price, category, branch_id } = req.body;
    if (
      title !== undefined &&
      title !== "" &&
      title !== null &&
      description !== undefined &&
      description !== "" &&
      description !== null &&
      price !== undefined &&
      price !== "" &&
      price !== null &&
      id !== undefined &&
      id !== "" &&
      id !== null &&
      image !== undefined &&
      image !== null &&
      image !== "" &&
      branch_id !== undefined &&
      branch_id !== null &&
      branch_id !== "" &&
      category !== "" &&
      category !== null &&
      category !== undefined
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
      let updateGymService = await GYM_SERVICE.findOneAndUpdate(
        { _id: id },
        { title, description, price, image: imageURL, category, branch_id }
      );

      if (
        updateGymService.length === 0 ||
        updateGymService === undefined ||
        updateGymService === null ||
        updateGymService === ""
      ) {
        return res.status(200).json({
          id,
          message: "This Gym Service Not Found !!!",
          success: false,
        });
      } else {
        return res.status(200).json({
          id,
          message: "Update Successfully Gym Service Content",
          success: true,
        });
      }
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

// Delete GYM Servcie
gymServiceRouter.delete("/deleteGymSevice", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        message: "ID Not found",
        success: false,
      });
    } else if (id !== undefined && id !== null && id !== "") {
      let deleteGymService = await GYM_SERVICE.deleteOne({ _id: id });
      if (
        deleteGymService["deletedCount"] === 0 ||
        deleteGymService === null ||
        deleteGymService === undefined
      ) {
        return res.status(200).json({
          id,
          message: "This Gym Branch Service Not found ",
          success: true,
        });
      } else if (
        deleteGymService["deletedCount"] === 1 ||
        deleteGymService !== null ||
        deleteGymService !== undefined
      ) {
        return res.status(200).json({
          id,
          message: "Gym Branch Service Delete Successfully !!! ",
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

// Get All Gym Service
gymServiceRouter.get("/getAllGymService", async (req, res) => {
  try {
    let getAllGymService = await GYM_SERVICE.find().populate("branch_id")
    // const singleServiceDetials = await GYM_SERVICE.find({ title: serviceTitle }).populate("branch_id")

    if (
      getAllGymService !== undefined &&
      getAllGymService.length !== 0 &&
      getAllGymService !== null
    ) {
      const key = 'title';
      const Services = [...new Map(getAllGymService.map(item =>
        [item[key], item])).values()];
      return res.status(200).send({
        getAllGymService,
        messge: "All Gym Service",
        success: true,
      });
    } else {
      return res.status(404).send({
        messge: "Gym Service Not Exist",
        success: false,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: gymService.js ~ line 234 ~ gymServiceRouter.get ~ error", error)
    return res.status(500).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

//GetBranch Detials by Service Name
gymServiceRouter.post("/getBranchDetailsBySerivceName", async (req, res) => {
  try {
    const { serviceTitle } = req.body;
    if (serviceTitle !== "" && serviceTitle !== undefined && serviceTitle !== "") {
      let singleServiceDetials = await GYM_SERVICE.find({ title: serviceTitle }).populate("branch_id")
      if (singleServiceDetials === null || singleServiceDetials === undefined || singleServiceDetials === "" || singleServiceDetials.length === 0) {
        return res.status(404).json({
          message: "Service Not Found",
          success: false
        });
      } else {
        return res.status(200).json({
          singleServiceDetials,
          message: "Service Details",
          success: true
        });
      }
    }
    else {
      return res.status(422).json({
        message: "Service title is required",
        success: false
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
})

module.exports = gymServiceRouter;
