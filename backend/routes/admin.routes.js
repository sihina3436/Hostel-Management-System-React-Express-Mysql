const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller.js");

// Hostels
router.post("/hostels", adminCtrl.createHostel); // tested ☑️
router.get("/hostels", adminCtrl.getAllHostels); // tested ☑️
router.put("/hostels/:id", adminCtrl.updateHostel); // tested ☑️
router.delete("/hostels/:id", adminCtrl.deleteHostel); // tested ☑️


module.exports = router;
