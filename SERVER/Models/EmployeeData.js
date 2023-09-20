const mongoose = require('mongoose');


const EmployeeDataSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        min: 1900, 
        max: 2100  
    },
    month: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true,
        min: 1,     
        max: 31    
    }
});


const EmployeeDataModel = mongoose.model('EmployeeHolidays', EmployeeDataSchema);

module.exports = EmployeeDataModel; 
