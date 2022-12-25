const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const secret = "RESTAPI";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne({ email });
    if (users) {
      bcrypt.compare(password, users.password, (error, result) => {
        if (result) {
          const token =
            "test " +
            jsonWebToken.sign(
              {
                data: users._id,
                expiresIn: 3 * 24 * 60 * 60,
              },
              secret
            );
          return res.status(200).json({
            status: "Success",
            token,
          });
        } else {
          return res.status(400).json({
            status: "Failed",
            message: "Password do not match",
          });
        }
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Email does not exist",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: "e.message",
    });
  }
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { email, password } = req.body;
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: "Failed", message: "Invalid Email or Password" });
      } else {
        const data = await User.findOne({ email });
        if (data) {
          res.status(400).json({
            status: "Failed",
            message: "Email already exists.",
          });
        } else {
          const newPassword = await bcrypt.hash(password, 10);
          const result = await User.create({
            email: email,
            password: newPassword,
          });
          res.status(200).json({
            status: "Success",
            message: "Registration Successful",
            result,
          });
        }
      }
    } catch (e) {
      res.status(400).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

module.exports = router;
