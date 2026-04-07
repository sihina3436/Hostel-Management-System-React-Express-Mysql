
const Student = require("../models/student.model");
const Bill = require("../models/bill.model");
const Rooms = require("../models/room.model");  
const Hostel = require("../models/hostel.model");
const sequelize = require("../configurations/dbconnection");
const jwt = require("jsonwebtoken");


// Student Login
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
// Change Password
async function changePassword(req, res) {
  try {
    const {stud_id, currentPassword, newPassword } = req.body;

    // Check if both fields are provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Find the student by ID from JWT payload (added by authenticateStudent middleware)
    const student = await Student.findByPk(req.user.stud_id || req.stud_id);

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
// get Student Profile
async function getProfile(req, res) {
  try {
    const studentId = req.params.id;

    // Call stored procedure
    const [result] = await sequelize.query(
      "CALL GetStudentProfile(:student_id);",
      { replacements: { student_id: studentId } }
    );

    if (!result || result.length === 0)
      return res.status(404).json({ success: false, message: "Student not found" });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

// Update Student Profile
 async function updateProfile (req, res)  {
  try {
    const studentId = req.params.id;
    const { name, phone_no, address } = req.body;

    if (!name && !phone_no && !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Call stored procedure
    const [result] = await sequelize.query(
      "CALL UpdateStudentProfile(:id, :name, :phone_no, :address);",
      {
        replacements: {
          id: studentId,
          name: name || null,
          phone_no: phone_no || null,
          address: address || null,
        },
      }
    );

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Profile updated successfully",
      data: result[0],
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Get Student Room Details + Roommates
async function getMyRoom(req, res) {
  try {
    const studentId = req.params.id
      ? parseInt(req.params.id, 10)
      : req.user?.stud_id || req.user?.id;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    // ✅ Do NOT destructure the result — CALL returns an array directly
    const roommates = await sequelize.query(
      "CALL GetStudentsInSameRoom(:studentId);",
      {
        replacements: { studentId },
      }
    );

    // ✅ Some Sequelize versions wrap CALL results like [rows, metadata]
    // so handle both cases
    const data = Array.isArray(roommates) ? roommates : roommates[0];

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No room found or not assigned yet",
      });
    }

    // Separate the logged-in student from their roommates
    const myDetails = data.find(r => r.student_id === studentId);
    const otherRoommates = data.filter(r => r.student_id !== studentId);

    res.status(200).json({
      success: true,
      data: {
        myRoom: myDetails || null,
        roommates: otherRoommates || [],
      },
    });
  } catch (error) {
    console.error("❌ Error fetching room details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching room details",
      error: error.message,
    });
  }
}

// Make Annual Payment
async function makePayment (req, res) {
  try {
    const studentId = req.params.id ? parseInt(req.params.id, 10) : (req.user?.stud_id || req.user?.id);
    const { amount, staff_id } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Please provide a valid payment amount" });
    }

    const [results] = await sequelize.query(
      "CALL MakeStudentPayment(:studentId, :staffId, :amount)",
      {
        replacements: {
          studentId,
          staffId: staff_id || null,
          amount: Number(amount)
        },
        multipleStatements: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "✅ Payment recorded successfully",
      data: results[0] || results
    });

  } catch (error) {
    console.error("❌ Error making payment:", error.message);
    res.status(500).json({
      success: false,
      message: "Error processing payment",
      error: error.message,
    });
  }
};

// Get Student Dashboard
async function getDashboard(req, res) {
  try {
    const studentId = req.params.id ? parseInt(req.params.id, 10) : (req.user?.stud_id || req.user?.id);

    const student = await Student.findOne({
      where: { stud_id: studentId || null, id: studentId },
      include: [{ model: Rooms, include: [Hostel] }]
    });

    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const currentYear = new Date().getFullYear();
    const paymentsForYear = await Bill.findAll({ where: { student_id: studentId } });
    const paymentsThisYear = paymentsForYear.filter(
      (p) => new Date(p.date).getFullYear() === currentYear
    );
    const sumThisYear = paymentsThisYear.reduce(
      (s, p) => s + parseFloat(p.amount || 0),
      0
    );

    let roommateCount = 0;
    if (student.room_id) {
      const roommates = await Student.count({ where: { room_id: student.room_id } });
      roommateCount = Math.max(0, roommates - 1);
    }

    res.status(200).json({
      success: true,
      data: {
        student: {
          stud_id: student.stud_id || student.id,
          name: student.name,
          email: student.email,
          phone_no: student.phone_no,
          address: student.address
        },
        room: student.Room
          ? {
              room_no: student.Room.room_no,
              floor_no: student.Room.floor_no,
              hostel_name: student.Room.Hostel?.host_name,
              roommate_count: roommateCount
            }
          : null,
        payment_summary: {
          total_payments: paymentsThisYear.length,
          total_paid: sumThisYear.toFixed(2),
          year: currentYear
        }
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
  }
}

module.exports = {
  studentLogin,
  changePassword,
  getProfile,
  updateProfile,
  getMyRoom,
  makePayment,
  getDashboard
};
