const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  // Log incoming headers for debugging
  console.log(req.headers);

  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // If the Authorization header is not found, return an error response
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header not found!",
    });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // If the token is missing, return an error response
  if (!token || token === "") {
    return res.status(401).json({
      success: false,
      message: "Token is missing!",
    });
  }

  try {
    // Verify the token and get the decoded user information
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Not Authenticated!",
    });
  }
};

const adminGuard = (req, res, next) => {
  // Log incoming headers for debugging
  console.log(req.headers);

  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // If the Authorization header is not found, return an error response
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header not found!",
    });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // If the token is missing, return an error response
  if (!token || token === "") {
    return res.status(401).json({
      success: false,
      message: "Token is missing!",
    });
  }

  try {
    // Verify the token and get the decoded user information
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;

    // Check if the user has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Permission Denied!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Not Authenticated!",
    });
  }
};

module.exports = {
  authGuard,
  adminGuard,
};
