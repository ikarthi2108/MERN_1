require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("../SERVER/middlewares/logger.js");
const authenticationRoutes = require("./routes/AuthenticationRoutes.js");
const CrudRoutes = require("./routes/CrudRoutes.js");
const ChangePasswordRoutes = require("./routes/ChangePasswordRoute.js");
const ProfileRoutes = require("./routes/ProfileRoutes.js");
const DashBoardRoutes = require("./routes/DashBoard.js");
const ForgetPasswordRoutes=require("./routes/ForgetPasswordRoute.js")
const announcementRoutes=require("./routes/AnouncementRoute.js");
const requestRoutes=require('./routes/RequestRoutes.js');
const empHolidayRoutes=require('./routes/EmpScheduleRoutes.js')
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

//connecting to the database
mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Use the authenticationRoutes middleware
app.use("/", authenticationRoutes);
app.use("/", CrudRoutes);
app.use("/", ChangePasswordRoutes);
app.use("/", ProfileRoutes);
app.use("/", DashBoardRoutes);
app.use("/",ForgetPasswordRoutes)
app.use("/",announcementRoutes);
app.use("/",requestRoutes)
app.use("/",empHolidayRoutes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
