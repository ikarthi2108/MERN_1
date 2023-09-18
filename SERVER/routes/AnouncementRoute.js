const express = require("express");
const router = express.Router();
const messageModel = require("../Models/EmployeeAnnouncementModel");

router.post("/Emp-Message", async (req, res) => {
  try {
    const { message } = req.body;

    const Saved_Message = await messageModel.create({
      message,
    });

    res.status(200).json(Saved_Message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/Get-Message", async (req, res) => {
  try {
    const message = await messageModel.find();
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/delete-message/:messageId", async (req, res) => {
  try {
    const  messageId  = req.params.messageId;

    const deleteMessage = await messageModel.findByIdAndDelete(messageId);

    if (!deleteMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
     res.json({ message: "Message deleted" });
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: "Server Error Occured" });
  }
});

module.exports = router;
