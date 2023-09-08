const express = require("express");

const EmployeeDetailModel=require("../Models/EmployeeDetail.js")


const router = express.Router();


//method to add the employees
router.post("/add", async (req, res) => {
  try {
    const { empname, image, department, salary, experience } = req.body;

    const savedEmployeeDetail = await EmployeeDetailModel.create({
      empname,
      image,
      department,
      salary,
      experience
    });

    res.status(201).json(savedEmployeeDetail); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//getting all employee details

router.get("/employee-details", async (req, res) => {
  try {
    const employeeDetails = await EmployeeDetailModel.find();
    res.status(200).json(employeeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// delete
router.delete("/employee-details/:employeeid", async (req, res) => {
  try {
    const employeeId = req.params.employeeid;
    const deleteEmployee = await EmployeeDetailModel.findByIdAndRemove(employeeId);

    if (!deleteEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/employee-details/:employeeid", async (req, res) => {
  try {
    const employeeId = req.params.employeeid;
    const updatedEmployee = req.body;

    const editedEmployee = await EmployeeDetailModel.findByIdAndUpdate(
      employeeId,
      updatedEmployee,
      { new: true }
    );

    if (!editedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json(editedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports=router