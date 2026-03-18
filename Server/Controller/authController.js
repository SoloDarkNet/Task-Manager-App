const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//RegisterUser

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // password remove
    const { password: removedPassword, ...userData } = newUser._doc;

    res.status(201).json({
      message: "User Registered Successfully",
      user: userData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//Login User

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user Exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    //compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credential",
      });
    }

    //Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    //Send Response
    const { password: removedPassword, ...userData } = user._doc;

    res.status(200).json({
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { RegisterUser, LoginUser };
