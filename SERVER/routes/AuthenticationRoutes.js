const express = require("express");
const EmployeeModal = require("../Models/Employee.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegistration } = require("../middlewares/validator.js");

const router = express.Router();

router.post('/register', validateRegistration, async (req, res) => {
  const { name, username, number, email, password, role } = req.body;

  try {

    const existingUser = await EmployeeModal.findOne({ email });     // Check if the email is already registered
  if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new employee record
    const newEmployee = await EmployeeModal.create({
      name,
      username,
      number,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const secret_key = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModal.findOne({ email: email });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const accessToken = jwt.sign({ email: user.email }, secret_key, {
          expiresIn: "1m",
        });

        res.json({
          status: "success",
          user: {
            email: user.email,
            username: user.username,
            role: user.role
          },
          accessToken: accessToken,
        });
      } else {
        res.status(401).json({ error: "Password is incorrect" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Problem with the login", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
