const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "IAmGoooooodBoy"; //Usally this is stored in .env file

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
    let success = false;
    const result = validationResult(req);
    // If there are errors, return Bad request and the errors
    if (!result.isEmpty()) {
      success = false;
      return res.status(200).send({ success: success, errors: result.array() });
    }

    // Check if user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res
        .status(200)
        .send({ success: success, error: "User with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    })
      .then((user) => {
        const DataTransfer = {
          user: {
            id: user.id,
          },
        };
        // Create a token
        const authToken = jwt.sign(DataTransfer, JWT_SECRET);
        success = true;
        return res.send({ success: success, authToken: authToken });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).send("Some error occurred.");
      });
  }
);

// Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {

    // If there are errors, return Bad request and the errors
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
      success = false;
      return res.status(200).send({ success: success, errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(200).send({ success: success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(200).send({ success: success, error: "Please try to login with correct credentials" });
      }

      const DataTransfer = {
        user: {
          id: user.id,
        },
      };
      // Create a token
      const authToken = jwt.sign(DataTransfer, JWT_SECRET);
      success = true;
      return res.send({ success: success, authToken: authToken }); // Send the token in response                       
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
}
)

module.exports = router;