const express = require("express");
const packageRouter = express.Router();
const Package = require("../models/bookPackage");
const BookPackage = require("../models/bookPackageByUser");

//Add PackageRouter Wellness
packageRouter.post("/addPackageByAdmin", async (req, res) => {
    try {
        const { Date, Time, Duration, service_id } = req.body;
        if (
            Date !== "" &&
            Date !== undefined &&
            Date !== null &&
            Time !== "" &&
            Time !== undefined &&
            Time !== null &&
            service_id !== "" &&
            service_id !== undefined &&
            service_id !== null
        ) {
            let duration = Duration ? Duration : null
            let package = await Package.create({
                Date,
                Time,
                service_id,
                Duration: duration
            });
            return res.status(200).json({
                package,
                message: "Add Package Successfully",
                success: true
            });
        }
        else {
            return res.status(422).json({
                message: "Empty Field Found",
                success: false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

//Get All Packages 
packageRouter.get("/getAllPackages", async (req, res) => {
    try {
        let allPackages = await Package.find().populate("service_id").exec();
        if (allPackages.lenght === 0 || allPackages === null || allPackages === undefined) {
            return res.status(422).json({
                message: "Package Does Not Exist",
                success: false
            });
        }
        else {
            return res.status(200).json({
                allPackages,
                message: "Get All Packages Successfully",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

// User Book Package 
packageRouter.post("/bookPackageByUser", async (req, res) => {
    try {
        const { user_id, package_id, Date, bookPackage } = req.body;
        if (
            user_id !== "" &&
            user_id !== null &&
            user_id !== undefined &&
            package_id !== "" &&
            package_id !== null &&
            package_id !== undefined &&
            Date !== "" &&
            Date !== null &&
            Date !== undefined &&
            bookPackage !== "" &&
            bookPackage !== null &&
            bookPackage !== undefined
        ) {
            let bookPackageByUser = await BookPackage.create({
                user_id,
                package_id,
                Date,
                bookPackage
            });
            let book_package = bookPackageByUser;
            return res.status(200).json({
                book_package,
                message: "Successfully Book Package",
                success: false
            });
        }
        else {
            return res.status(422).json({
                message: "Empty field found. This fields User_id, Package_id, Date, bookPackage, is required fields",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
})

// Get All Packages By User 
packageRouter.get("/getAllPackageByUser", async (req, res) => {
    try {
        let allPackages = await BookPackage.find().populate(
            {
                path: 'user_id',
                model: 'User',
            }
        ).populate(
            {
                path: 'package_id',
                model: 'Package',
            }
        ).exec();
        if (allPackages.lenght === 0 || allPackages === null || allPackages === undefined) {
            return res.status(422).json({
                message: "Package does not exists !!!",
                success: false
            });
        }
        else {
            return res.status(200).json({
                allPackages,
                message: "Get All Package Successfully",
                success: true
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
})


//Get Specific Package
packageRouter.post("/getPackageByUserId", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (
            user_id !== "" &&
            user_id !== undefined &&
            user_id !== null
        ) {
            let userPackages = await BookPackage.findOne({ user_id });

            if (userPackages === null || userPackages === undefined || userPackages === "") {
                return res.status(422).json({
                    message: "Package does not exits",
                    success: false
                });
            }
            else {
                return res.status(200).json({
                    userPackages,
                    message: "Get Package Successfully",
                    success: true
                })
            }
        }
        else {
            return res.status(422).json({
                message: "User Id is required. Enter User Id",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
});




module.exports = packageRouter;
