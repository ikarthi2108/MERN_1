const express=require("express")
const EmployeeHolidayModel=require("../Models/EmployeeHoliday")

const router=express.Router()

router.post('/emp-holidays',async(req,res)=>{

    try{
    const {selectedDate,eventName}=req.body;
    const LeaveData=await EmployeeHolidayModel.create({
       selectedDate:selectedDate,
       event:eventName
    })
    res.status(200).json(LeaveData)
}
catch(error){
    console.log(error);
    res.status(500).json({Error:"Internal Server Error"})
}
})

router.get("/get-holidays",async(req,res)=>{
    try{
        const HolidayData=await EmployeeHolidayModel.find();
        res.status(200).json(HolidayData)
    }catch(error){
       console.log(error)
       res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports=router;