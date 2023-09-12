const mongoose = require("mongoose");

const EmployeeDetailSchema = new mongoose.Schema({
  empname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

const EmployeeDetailModel = mongoose.model(
  "EmployeeDetail",
  EmployeeDetailSchema
);

module.exports = EmployeeDetailModel;
