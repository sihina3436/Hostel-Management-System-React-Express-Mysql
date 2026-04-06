const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller.js");


// Hostels
router.post("/hostels", adminCtrl.createHostel); // tested ☑️
router.get("/hostels", adminCtrl.getAllHostels); // tested ☑️
router.put("/hostels/:id", adminCtrl.updateHostel); // tested ☑️
router.delete("/hostels/:id", adminCtrl.deleteHostel); // tested ☑️

// Rooms
router.post("/rooms", adminCtrl.createRoom);// tested ☑️
router.get("/rooms", adminCtrl.getAllRooms); // tested ☑️
router.get("/rooms/available", adminCtrl.getAvailableRooms); // tested ☑️
router.post("/rooms/assign", adminCtrl.assignStudentToRoom); // tested ☑️


// Students
router.post("/students", adminCtrl.addStudent); // tested ☑️
router.get("/students", adminCtrl.getAllStudents); // tested ☑️
router.put("/students/:id", adminCtrl.updateStudent); // tested ☑️
router.delete("/students/:id", adminCtrl.deleteStudent);// tested ☑️


// Staff
router.post("/staff", adminCtrl.addStaff); // tested ☑️
router.get("/staff", adminCtrl.getAllStaff); // tested ☑️
router.put("/staff/:id", adminCtrl.updateStaff); // tested ☑️
router.delete("/staff/:id", adminCtrl.deleteStaff);// tested ☑️

// Billing
router.post("/bills", adminCtrl.createBill);
router.get("/bills", adminCtrl.getAllBills);
router.get("/bills/student/:id", adminCtrl.getBillsByStudent);

// Reports
router.get("/reports/occupancy", adminCtrl.getRoomOccupancyReport);
router.get("/reports/revenue", adminCtrl.getRevenueReport);


module.exports = router;
