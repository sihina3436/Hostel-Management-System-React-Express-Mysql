const sequelize = require("../configurations/dbconnection.js");

async function createAssignStudentProcedure() {
  try {
    // Drop existing procedure to avoid duplication
    await sequelize.query("DROP PROCEDURE IF EXISTS AssignStudentToRoom;");
    await sequelize.query("DROP PROCEDURE IF EXISTS GetStudentProfile;");
    
    const procedureSQL = `
      CREATE PROCEDURE AssignStudentToRoom(IN p_student_id INT, IN p_room_id INT)
      BEGIN
        DECLARE stud_count INT;
        SELECT COUNT(*) INTO stud_count FROM Students WHERE room_id = p_room_id;

        IF stud_count >= 4 THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Room is already full';
        ELSE
          UPDATE Students SET room_id = p_room_id WHERE stud_id = p_student_id;
        END IF;
      END;
    `;

    await sequelize.query(procedureSQL);
    console.log("✅ Procedure 'AssignStudentToRoom' created successfully!");


    const GetStudentProfileProcedureSQL = `
  
      CREATE PROCEDURE GetStudentProfile(IN p_student_id INT)
      BEGIN
          SELECT 
              s.stud_id,
              s.name AS student_name,
              s.email,
              s.phone_no,
              s.address,
              s.role,
              r.room_id,
              r.room_no,
              r.floor_no,
              r.is_occupied,
              r.capacity,
              h.hostel_id,
              h.host_name,
              h.address AS hostel_address,
              h.contact_no AS hostel_contact,
              h.type AS hostel_type
          FROM students s
          LEFT JOIN rooms r ON s.room_id = r.room_id
          LEFT JOIN hostels h ON r.hostel_id = h.hostel_id
          WHERE s.stud_id = p_student_id;
      END ;

    `;
   
    await sequelize.query(GetStudentProfileProcedureSQL);
    console.log("✅ Procedure 'GetStudentProfile' created successfully!");

 

  } catch (error) {
    console.error("❌ Error creating procedure:", error.message);
  }
}

module.exports = { createAssignStudentProcedure };
