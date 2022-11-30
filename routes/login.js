const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
let secret = "RESTAPI";

// login post request
router.post("/login", async (req, res) => {
  try {
    console.log("ABC", req.body);
    const users = await User.findOne({ email: req.body.email });
    console.log(users);
    if (users) {
      bcrypt.compare(req.body.password, users.password, (error, result) => {
        // if the result is true
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
          console.log(token);
          return res.status(200).json({
            status: "Sucess",
            token,
          });
        } else {
          return res.status(203).json({
            status: "Failed",
            message: "Password do not match",
          });
        }
      });
    } else {
      res.status(203).json({
        status: "Failed",
        message: "Email not found",
      });
    }
  } catch (e) {
    res.status(203).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    try {
      // console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const data = await User.findOne({ email });
      console.log("anbb", data);
      if (data) {
        res.status(203).json({
          status: "Failed",
        });
      }

      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          res.status(500).json({
            status: "Failed",
            message: err.message,
          });
        }
        try {
          const result = await User.create({
            email,
            password: hash,
          });
          console.log("result", result);
          res.status(200).json({
            status: "Success",
            message: "Registration Successful",
            result,
          });
        } catch (err) {
          console.log(err);
          res.status(200).json({
            status: "Failed",
            error: err.message,
          });
        }
      });
    } catch (e) {
      res.status(203).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

// router.get("/register", async(req, res) => {
//     try{
//         const data = await User.find()
//         res.status(200).json({
//             status : "success",
//             data
//         })
//     }catch(e){
//         res.status(403).json({
//             status : "failure",
//             message : e.message
//         })
//     }
// })

router.post("/logout", (req, res) => {
  token = "";
  res.status(200).send("Logged out Sucessfully");
});

module.exports = router;
