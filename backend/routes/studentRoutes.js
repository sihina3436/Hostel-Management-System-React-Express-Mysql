const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");
const { authenticateStudent, verifyStudentOwnership } = require("../middleware/studentAuth");

// Login (Public)
router.post("/login", studentController.studentLogin); // tested ☑️

// Authenticated routes
router.put("/me/password",authenticateStudent, studentController.changePassword); // tested ☑️
router.get("/:id/profile",  studentController.getProfile);// tested ☑️
router.put("/:id/profile",  studentController.updateProfile);
router.get("/:id/dashboard", studentController.getDashboard);
router.get("/:id/room",  studentController.getMyRoom);
router.post("/:id/payments",studentController.makePayment);

module.exports = router;