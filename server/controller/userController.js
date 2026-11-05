const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const signup = async (req, res) => {
  try {
    const username =
      typeof req.body.username === "string" ? req.body.username.trim() : "";
    const email =
      typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password =
      typeof req.body.password === "string" ? req.body.password : "";

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill out all feilds",
        success: false,
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
        success: false,
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
        success: false,
      });
    }

    if(password.length < 8) {
      return res.status(400).json({
        message: "Password Must be 8 character or more",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User already exists`,
        success: false,
      });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(201).json({
      message: "Register succesful",
      success: true,
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message:`Internal Server Error: ${error.message}`,
      success: false,
    });
  }

};

//login function

const login = async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password =
      typeof req.body.password === "string" ? req.body.password : "";

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the feilds",
        success: false,
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
        success: false,
      });
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    // validate password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {expiresIn: "1d"},
    );

    return res.status(200).json({
      message: "login successfull",
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `server error: ${error.message}`,
      success: false,
    });
  }
};

const profile = async(req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if(!user){
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
    });
    
  }catch(err){
    return res.status(500).json({
      message: `server error: ${err.message}`,
      success: false,
    });
  }
}

module.exports = {signup, login, profile};
