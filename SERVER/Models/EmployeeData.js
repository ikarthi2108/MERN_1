const mongoose = require('mongoose');

// Define the schema for EmployeeData
const EmployeeDataSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        min: 1900, // Minimum year value
        max: 2100  // Maximum year value
    },
    month: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true,
        min: 1,     // Minimum number of days
        max: 31     // Maximum number of days (for simplicity; adjust as needed)
    }
});

// Create the EmployeeData model
const EmployeeDataModel = mongoose.model('EmployeeHolidays', EmployeeDataSchema);

module.exports = EmployeeDataModel; 
