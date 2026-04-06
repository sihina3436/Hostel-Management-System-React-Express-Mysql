// 📁 /utils/createViews.js
const sequelize = require("../configurations/dbconnection.js");

async function createViews() {
  try {
    console.log("🚀 Starting to create SQL Views...");

    // Drop old views safely
    await sequelize.query("DROP VIEW IF EXISTS AvailableRoomsView;");
    await sequelize.query("DROP VIEW IF EXISTS RevenueReportView;");
    await sequelize.query("DROP VIEW IF EXISTS room_assignments_view;");

    // ✅ 1️⃣ Available Rooms View
    const availableRoomsView = `
      CREATE VIEW AvailableRoomsView AS
      SELECT 
        r.room_id,
        r.room_no,
        r.floor_no,
        r.hostel_id,
        COUNT(s.stud_id) AS occupied,
        (4 - COUNT(s.stud_id)) AS available_slots
      FROM rooms r
      LEFT JOIN students s ON r.room_id = s.room_id
      GROUP BY r.room_id, r.room_no, r.floor_no, r.hostel_id
      HAVING occupied < 4;
    `;
    await sequelize.query(availableRoomsView);
    console.log("✅ View 'AvailableRoomsView' created successfully!");

    // ✅ 2️⃣ Monthly Revenue Report View
    const revenueReportView = `
      CREATE VIEW RevenueReportView AS
      SELECT 
        DATE_FORMAT(b.date, '%Y-%m') AS month,
        SUM(b.amount) AS total_revenue
      FROM bills b
      GROUP BY DATE_FORMAT(b.date, '%Y-%m')
      ORDER BY month DESC;
    `;
    await sequelize.query(revenueReportView);
    console.log("✅ View 'RevenueReportView' created successfully!");

    // ✅ 3️⃣ Room Assignment View
    const roomAssignmentsView = `
      CREATE VIEW room_assignments_view AS
      SELECT
        h.hostel_id,
        h.host_name AS hostel_name,
        h.address AS hostel_address,
        r.room_id,
        r.room_no,
        r.floor_no,
        r.is_occupied,
        s.stud_id AS student_id,
        s.name AS student_name,
        s.email,
        s.phone_no
      FROM
        hostels h
      JOIN rooms r ON h.hostel_id = r.hostel_id
      LEFT JOIN students s ON r.room_id = s.room_id
      ORDER BY h.host_name, r.room_no;
    `;
    await sequelize.query(roomAssignmentsView);
    console.log("✅ View 'room_assignments_view' created successfully!");

    console.log("🎯 All SQL Views created successfully!");
  } catch (error) {
    console.error("❌ Error creating views:", error.message);
  }
}

module.exports = { createViews };
