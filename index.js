const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const testimonialRouter = require("./routes/testimonial");
const bannerRouter = require("./routes/banner");
const servicesRouter = require("./routes/services");
const gymRouter = require("./routes/gym");
const gymBrnachRouter = require("./routes/gymBranch");
const gymServiceRouter = require("./routes/gymService");
const subscriptionRouter = require("./routes/gymServiceSubscription");
const trackWeightRouter = require("./routes/trackWeight");
const adminRouter = require("./routes/admin");
const paymentRouter = require("./routes/payment");
const copuanRouter = require("./routes/Copuan");
const complainRouter = require("./routes/complain");
const voucherRouter = require("./routes/voucher");
const supportRouter = require("./routes/support");
const demoRouter = require("./routes/demo");
const coachRouter = require("./routes/coach");
const managerRouter = require("./routes/manager");
const packageRouter = require("./routes/package");
const titleRouter = require("./routes/tittle");
const userRouter = require("./routes/user");
const questionireRouter = require("./routes/questionire");
const employeeRouter = require("./routes/employee");
const fileUpload = require("express-fileupload");
// const todoRouter = require('./routes/todo');
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const consultationRouter = require("./routes/consultation");
// const DB = "mongodb://localhost:27017/OTP_BackEnd";



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


// All Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", managerRouter);
app.use("/api/v1", packageRouter);
app.use("/api/v1", testimonialRouter);
app.use("/api/v1", bannerRouter);
app.use("/api/v1", servicesRouter);
app.use("/api/v1", gymRouter);
app.use("/api/v1", gymBrnachRouter);
app.use("/api/v1", gymServiceRouter);
app.use("/api/v1", subscriptionRouter);
app.use("/api/v1", trackWeightRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", voucherRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", complainRouter);
app.use("/api/v1", copuanRouter);
app.use("/api/v1", supportRouter);
app.use("/api/v1", demoRouter);
app.use("/api/v1", coachRouter);
app.use("/api/v1", consultationRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", questionireRouter);
app.use("/api/v1", questionireRouter);
app.use("/api/v1", titleRouter);
app.use("/api/v1/employee", employeeRouter);
// app.use("/api/v1/todo", todoRouter);

mongoose
  // .connect("mongodb+srv://test:test@cluster0.h7sxi.mongodb.net/NewOTP_DATABASE?retryWrites=true&w=majority") Old Live database
  .connect("mongodb+srv://bhartishivam723:Shivam123@cluster0.c1txlyk.mongodb.net/gymDb?retryWrites=true&w=majority")//New database
  .then(() => {
    console.log("Database Connected");


    // Server Listen
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`connected at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });