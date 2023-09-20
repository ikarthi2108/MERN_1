const express = require("express");
const RequestModel = require("../Models/EmployeeReqModel");
const nodemailer = require("nodemailer");
const router = express.Router();

// Route to create a leave request
router.post("/leave-req", async (req, res) => {
  try {
    const { requestData } = req.body;
    const RequestDetails = await RequestModel.create(requestData);
    res.status(200).json(RequestDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com",
    pass: "ihnsbfwigpcqfcrv",
  },
});

// Route to process leave request (accept or decline)
router.post("/process-leave", async (req, res) => {
  try {
    const { id, action } = req.body;
    const request = await RequestModel.findById(id);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    let message = "";

    if (action === "accept") {
      message = "Your leave request has been accepted.";
    } else if (action === "decline") {
      message = "Your leave request has been declined.";
    }

    await sendEmail(request.email, message);
    await RequestModel.deleteOne({ _id: id });
    res.status(200).json({ message: `Request ${action}ed and deleted.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get leave requests
router.get("/leave-res", async (req, res) => {
  try {
    const leaveData = await RequestModel.find();
    res.status(200).json(leaveData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Function to send an email
//const sendEmail=async(to,message)
const sendEmail=async(to,message)=> {
  try {
    const mailOptions = {
      from: "karthiynot2108@gmail.com",
      to: to,
      subject: "Leave Request Status",
      text: message,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${message}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error}`);
  }
}

module.exports = router;
