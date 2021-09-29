const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const User = require("../app/models/user");
const authController = require("../app/controllers/authController");
const validationUser = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email already exists");
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty(),
];
router.post("/login", authController.login);
router.put("/signUp", validationUser, authController.signUp);
module.exports = router;
