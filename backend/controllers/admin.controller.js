const { Sequelize } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");
const Admin = require("../models/admin.model.js");
const Hostel = require("../models/hostel.model.js");
const Rooms = require("../models/room.model.js");
const Student = require("../models/student.model.js");
const Staff = require("../models/staff.model.js");
const Bill = require("../models/bill.model.js");


exports.createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json({ message: "✅ Hostel created successfully", hostel });
  } catch (err) {
    res.status(500).json({ message: "Error creating hostel", error: err.message });
  }
};

exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.findAll();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
};

exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByPk(req.params.id);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    await hostel.update(req.body);
    res.json({ message: "✅ Hostel updated successfully", hostel });
  } catch (err) {
    res.status(500).json({ message: "Error updating hostel" });
  }
};

exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByPk(req.params.id);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    await hostel.destroy();
    res.json({ message: "✅ Hostel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting hostel" });
  }
};
