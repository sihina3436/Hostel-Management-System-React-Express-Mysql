const { Sequelize } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");
const Admin = require("../models/admin.model.js");
const Hostel = require("../models/hostel.model.js");
const Rooms = require("../models/room.model.js");
const Student = require("../models/student.model.js");
const Staff = require("../models/staff.model.js");
const Bill = require("../models/bill.model.js");


// ==================== HOSTEL MANAGEMENT ====================
// create hostel
exports.createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json({ message: "✅ Hostel created successfully", hostel });
  } catch (err) {
    res.status(500).json({ message: "Error creating hostel", error: err.message });
  }
};

// get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.findAll();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
};
// get hostel by id
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
// delete hostel
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

// ==================== ROOM MANAGEMENT ====================

//Add room
exports.createRoom = async (req, res) => {
  try {
    const room = await Rooms.create(req.body);
    res.status(201).json({ message: "✅ Room created successfully", room });
  } catch (err) {
    res.status(500).json({ message: "Error creating room", error: err.message });
  }
};

//Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.findAll({ include: Hostel });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

//Get available rooms
exports.getAvailableRooms = async (req, res) => {
   try {
    const [data] = await sequelize.query("SELECT * FROM AvailableRoomsView");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Assign student to room proceduree
exports.assignStudentToRoom = async (req, res) => {
  const { student_id, room_id } = req.body;
  try {
    await sequelize.query(`CALL AssignStudentToRoom(:student_id, :room_id)`, {
      replacements: { student_id, room_id },
    });
    res.json({ message: "✅ Student assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== STUDENT MANAGEMENT ====================

exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: "✅ Student registered successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error creating student" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ include: Rooms });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
};


// update student profile
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    await student.update(req.body);
    res.json({ message: "✅ Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error updating student" });
  }
};

// delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    await student.destroy();
    res.json({ message: "✅ Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
};


// ==================== STAFF MANAGEMENT ====================
// add staff
exports.addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({ message: "✅ Staff added successfully", staff });
  } catch (err) {
    res.status(500).json({ message: "Error creating staff" });
  }
};

// get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Error fetching staff" });
  }
};
// update staff profile
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    await staff.update(req.body);
    res.json({ message: "✅ Staff updated successfully", staff });
  } catch (err) {
    res.status(500).json({ message: "Error updating staff" });
  }
};

// delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    await staff.destroy();
    res.json({ message: "✅ Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting staff" });
  }
};

// ==================== BILLING ====================
// create bill
exports.createBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.status(201).json({ message: "✅ Bill created successfully", bill });
  } catch (err) {
    res.status(500).json({ message: "Error creating bill" });
  }
};

// get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({ include: [Student, Staff] });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bills" });
  }
};

// get bills by student
exports.getBillsByStudent = async (req, res) => {
  try {
    const bills = await Bill.findAll({ where: { student_id: req.params.id } });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student bills" });
  }
};

// ==================== REPORTS ====================

// Room occupancy report
exports.getRoomOccupancyReport = async (req, res) => {
  try {
    const [data] = await Rooms.sequelize.query(`
      SELECT r.room_id, r.room_no, COUNT(s.stud_id) AS occupied,
             (4 - COUNT(s.stud_id)) AS available_slots
      FROM Rooms r
      LEFT JOIN Student s ON r.room_id = s.room_id
      GROUP BY r.room_id;
    `);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching occupancy report" });
  }
};

// Revenue report
exports.getRevenueReport = async (req, res) => {
  try {
    const [data] = await Bill.sequelize.query(`
      SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total_revenue
      FROM Bill
      GROUP BY month
      ORDER BY month DESC;
    `);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching revenue report" });
  }
};



