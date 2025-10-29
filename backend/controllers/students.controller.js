// controllers/students.controller.js
const Student = require("../models/student.model");
const Bill = require("../models/bill.model");
const Rooms = require("../models/room.model");  // ✅ updated import name
const Hostel = require("../models/hostel.model");
const sequelize = require("../configurations/dbconnection");
const jwt = require("jsonwebtoken");

// ===============================
// Student Login
// ===============================
async function studentLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ⚠️ No bcrypt check (password is compared directly)
    if (student.password && student.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const payload = {
      stud_id: student.stud_id || student.id,
      email: student.email,
      role: student.role || "student"
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "your_jwt_secret_key", { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "✅ Login successful",
      data: {
        token,
        student: {
          stud_id: payload.stud_id,
          name: student.name,
          email: student.email,
          phone_no: student.phone_no,
          role: payload.role
        }
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Error during login", error: error.message });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check if both fields are provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Find the student by ID from JWT payload (added by authenticateStudent middleware)
    const student = await Student.findByPk(req.user.stud_id || req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Compare plain text passwords (no bcrypt)
    if (student.password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    await student.update({ password: newPassword });

    return res.status(200).json({
      success: true,
      message: "✅ Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    });
  }
}






module.exports = {
  studentLogin,
  changePassword


};
