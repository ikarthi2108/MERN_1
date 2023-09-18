const mongoose=require('mongoose')

 const messageSchema=mongoose.Schema({
    message:{
        type:String
    }
 })

 const messageModel=mongoose.model("EmpAnnouncements",messageSchema)

 module.exports=messageModel;