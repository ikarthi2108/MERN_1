const express = require("express");
const router = express.Router();

const EmployeeDetailModel = require("../Models/EmployeeDetail");
const EmployeeDataModel =require("../Models/EmployeeData")

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


router.post("/Emp-working", async (req, res) => {
  const { year, month, numberOfDays } = req.body;
  try {
    const data = await EmployeeDataModel.create({ year, month, numberOfDays });
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-schedule",async(req,res)=>{
  try{
    const ScheduleData=await EmployeeDataModel.find();
    res.status(200).json(ScheduleData)
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:"Internal Server Error"})
  }
})


module.exports = router;
