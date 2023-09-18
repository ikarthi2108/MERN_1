const express = require("express");
const EmployeeModal = require("../Models/Employee.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegistration } = require("../middlewares/validator.js");

const router = express.Router();

let refreshTokens = [];

// Register route
router.post("/register", validateRegistration, (req, res) => {
  const { name, username, number, email, password,role } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModal.create({ name, username, number, email, password: hash,role })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

const secret_key = process.env.JWT_SECRET;
const refresh_key = process.env.JWT_REFRESH_SECRET;

router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await EmployeeModal.findOne({ email: email });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      // console.log(password);
      // console.log(user.password);
      if (isValid) {
        let userPayload = { email: user.email };
        if (rememberMe) {
          userPayload.password = user.password;
        }
        const accessToken = jwt.sign(userPayload, secret_key, {
          expiresIn: "1m",
        });

        const refreshToken = jwt.sign(userPayload, refresh_key, {
          expiresIn: "1d",
        });

        refreshTokens.push(refreshToken);

        res.json({
          status: "success",
          user: {
            email: user.email,
            username:user.username,
            role:user.role
          },
          accessToken: accessToken,
          refreshToken: refreshToken,
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

router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(401).json({ error: "unauthorized" });
  };
  if(!refreshTokens.includes(refresh_token)){
    return res.status(403).json({error:"Access Denied"})
  }

  try{
    const jwtData=jwt.verify(refresh_token,refresh_key)
    const {email}=jwtData;

    const newAccessToken = jwt.sign({ email }, secret_key, {
      expiresIn: "1m",
    });
    
    console.log(newAccessToken);

    if(newAccessToken){
      res.status(201).json({status:"Success",accessToken:newAccessToken})
    }else{
      return res.status(500).json({error:"Internal Server Error"})
    }
  }catch(error){
         throw error;
  }
});

module.exports = router;

