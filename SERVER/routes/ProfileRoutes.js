const express = require("express");
const router = express.Router();
const EmployeeModel = require("../Models/Employee");

// GET user data by email
router.get("/user-data", (req, res) => {
  const { email } = req.query;

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// PUT update user data by ID
router.put("/update-user/:id", (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  EmployeeModel.findByIdAndUpdate(id, updatedUserData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
