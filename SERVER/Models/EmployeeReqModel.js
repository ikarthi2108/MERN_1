const mongoose = require('mongoose');



const RequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});


const RequestModel=mongoose.model("EmpRequests",RequestSchema)

module.exports=RequestModel