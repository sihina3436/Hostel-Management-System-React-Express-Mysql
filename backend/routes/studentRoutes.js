const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");

// Login (Public)
router.post("/login", studentController.studentLogin); // tested ☑️

// Authenticated routes
router.put("/me/password", studentController.changePassword); // tested ☑️
router.get("/:id/profile",  studentController.getProfile);// tested ☑️

module.exports = router;