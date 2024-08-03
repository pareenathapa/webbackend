// Importing the package
const mongoose = require("mongoose");

// Creating a function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLOUDURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Exporting the function
module.exports = connectDB;
