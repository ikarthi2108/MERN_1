const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("name").notEmpty().withMessage("name is required field"),
  body("username").notEmpty().withMessage("username is required"),
  body("number").notEmpty().withMessage("Number is required"),
  body("email").isEmail().withMessage("Invalid email "),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Export the validation middleware
module.exports = {
  validateRegistration,
};
