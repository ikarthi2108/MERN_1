const express = require("express");
const router = express.Router();

const EmployeeDetailModel = require("../Models/EmployeeDetail");

//get route

router.get("/All-Data", async (req, res) => {
  try {
    const AllData = await EmployeeDetailModel.find();
    res.status(200).json(AllData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

module.exports = router;
