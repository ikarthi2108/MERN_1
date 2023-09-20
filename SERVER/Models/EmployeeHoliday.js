const mongoose=require('mongoose')


const EmpHolidaySchema=new mongoose.Schema({
    selectedDate:{
        type:String,
        required:true,
    },
    event:{
        type:String,
        required:true
    }
})

const EmployeeHolidayModel=mongoose.model("Employeeleaves",EmpHolidaySchema)

module.exports=EmployeeHolidayModel;