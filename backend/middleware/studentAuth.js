const jwt = require("jsonwebtoken");
const { Student } = require("../models/student.model") || require("../models");

// Verify JWT and attach user to req
exports.authenticateStudent = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Ensure the logged-in student is the same as the ID in the route
exports.verifyStudentOwnership = (req, res, next) => {
  const requestedId = parseInt(req.params.id, 10);
  if (requestedId !== req.user.stud_id) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};
