const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Configure Multer for image upload
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/user/"); // Make sure this directory exists and is accessible
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// 1. Get user function
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }
    const token = await jwt.sign({ id: user._id }, "SECRET");
    res.json({
      success: true,
      token: token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// 2. Create user function
const createUser = async (req, res) => {
  //1. Get data from the user (Fname,lname, email,pp)
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  //2. validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  try {
    //check if the user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists!",
      });
    }

    // Hash the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, randomSalt);

    // Create the new user with the image if uploaded
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      confirmPassword: hashPassword,
      image: req.file ? req.file.path : null,
    });

    // Save the new user to the database
    await newUser.save();

    // Send the success response
    res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// 3. Update user function
const updateUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  //2. validation
  if (!firstName || !lastName || !email) {
    return res.json({
      success: false,
      message: "Please enter all required fields!",
    });
  }

  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.json({
          success: false,
          message: "Passwords do not match!",
        });
      }
      const randomSalt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, randomSalt);
      user.confirmPassword = user.password;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    if (req.file) {
      user.image = req.file.path; // Update the image if a new one is uploaded
    }

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// 4. Delete user function
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// 5. Login user function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    const token = await jwt.sign({ id: user._id }, "SECRET");
    res.json({
      success: true,
      message: "Login Successful",
      token: token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Exporting the functions
module.exports = {
  getUser,
  createUser: [upload.single("image"), createUser],
  updateUser: [upload.single("image"), updateUser],
  deleteUser,
  loginUser,
};
