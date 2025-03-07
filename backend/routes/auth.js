const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// create user using: POST "/api/auth/createUser". No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    // If there are errors, return Bad request and the errors
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    // Check if user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ error: "User with this email already exists" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).send("Some error occurred.");
      });
  }
);

module.exports = router;
