const express = require("express");
const Tittle = require("../models/tittle");
const tittleRouter = express.Router();
const helper = require("../utils/helper");
const fs = require("fs");

tittleRouter.post("/addTittle", async (req, res) => {
    const {
        name,
        description
      } = req.body;
    const image = req?.files?.image?.tempFilePath;
    console.log(`Inside add tittle`);
    console.log(`${image}`);
    try {
        if (
            name !== undefined &&
            name !== "" &&
            name !== null
          ) {
            if (image !== undefined &&
                image !== null &&
                image !== "") {
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
                    var imageURL = await helper.get(options);
                    console.log({ imageURL });
                    const tittle = new Tittle({
                        name: name,
                        description: description,
                        image: imageURL || undefined
                    })
                    await tittle.save();
                } else {
                    return res.status(200).json({
                        message: "Image is missing !!!",
                        success: false,
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

tittleRouter.get("/getAllTittle", async (req, res) => {
    try {
      let tittles = await Tittle.find();
      if (
        tittles !== undefined &&
        tittles.length !== 0 &&
        tittles !== null
      ) {
        return res.status(200).send({
          tittles,
          messge: "All Tittles",
          success: true,
        });
      } else {
        return res.status(200).send({
          messge: "Tittles does not Exist",
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

module.exports = tittleRouter;