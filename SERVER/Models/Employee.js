const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
  }
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
