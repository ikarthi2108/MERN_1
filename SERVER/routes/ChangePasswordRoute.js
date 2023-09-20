const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const EmployeeModel = require("../Models/Employee");

// PUT change user's password by email
router.put("/change-password/:email", async (req, res) => {
  const { email } = req.params;
  const { oldPassword, newPassword } = req.body; // Add oldPassword to req.body

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password is correct
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
