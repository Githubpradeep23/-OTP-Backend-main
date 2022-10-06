const fs = require("fs");
const request = require("request");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "",
      pass: "",
    },
  })
);

const helper = {
  get: (options) => {
    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) reject(error);
        resolve(JSON.parse(body).secure_url);
      });
    });
  },
  sendEmail: async (res, email, subject, messageBody) => {
    try {
      let mailOptions = {
        from: "", //sender Email
        to: email, //Receiver
        subject: subject,
        html: messageBody,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send({
            message: "something went wrong",
            success: false,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            message: "Email sent:",
            details: {
              email,
              subject,
              messageBody,
            },
            information: info.response,
            success: true,
          });
        }
      });
    } catch (error) {
      console.log("🚀 ~ file: comon.js ~ line 5 ~ sendEmail ~ error", error);
    }
  },
};
module.exports = helper;

// Extra Code
// console.log(fs.readFileSync(req?.files?.profilePicture?.tempFilePath));
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(body);
//   console.log(JSON.parse(body).secure_url);
//   imageURL = JSON.parse(body).secure_url;
// });
