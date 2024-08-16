// 1. Importing necessary modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database/database");

// 2. Configuring environment variables
dotenv.config();

// 3. Connecting to the database
connectDB();

// 4. Creating an express app
const app = express();

// JSON config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload config
app.use("/public", express.static("public"));

// CORS config
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/public", express.static("public")); // Serve the uploaded files

// 5. Defining the port
const PORT = process.env.PORT || 5500;

// 6. Creating test routes or endpoints
app.get("/test", (req, res) => {
  res.send("Test API is Working.....!");
});

app.get("/print", (req, res) => {
  res.send("Print API is Working.....!");
});

// 7. Configuring routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/jewelry", require("./routes/jewelryRoutes"));
app.use("/api/order", require("./routes/orderRouter"));
app.use("/api/wishlist", require("./routes/wishlistRouter"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 8. Starting the server
app.listen(PORT, () => {
  console.log(`Server-app is running on port ${PORT}`);
});

// API URLs
// http://localhost:5500/test
// http://localhost:5500/api/user/create
