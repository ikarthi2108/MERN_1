const express = require("express");
const EmployeeModal = require("../Models/Employee.js");
const bcrypt = require("bcrypt");
const {validateRegistration}=require('../middlewares/validator.js')


const router = express.Router();

// Register route
router.post("/register",validateRegistration, (req, res) => {
  const { name, username, number, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModal.create({ name, username, number, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

//login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModal.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {     // hashing the password
        if (response) {
          res.json({
            status: "success",
            user: {
              username: user.username, //in this user object sending the users details along with the success message
              email: user.email,
            },
          });
        } else {
          res.json("Invalid Credentials");
        }
      });
    } else {
      res.json("No record Existed");
    }
  });
});


module.exports = router;
