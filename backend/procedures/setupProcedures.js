const sequelize = require("../configurations/dbconnection.js");

async function createAssignStudentProcedure() {
  try {
    // Drop existing procedure to avoid duplication
    await sequelize.query("DROP PROCEDURE IF EXISTS AssignStudentToRoom;");
    await sequelize.query("DROP PROCEDURE IF EXISTS GetStudentProfile;");
    await sequelize.query("DROP PROCEDURE IF EXISTS UpdateStudentProfile;");
    await sequelize.query("DROP PROCEDURE IF EXISTS GetStudentsInSameRoom;");
    await sequelize.query("DROP PROCEDURE IF EXISTS MakeStudentPayment;");

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
    console.log(" Procedure 'AssignStudentToRoom' created successfully!");


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
    console.log(" Procedure 'GetStudentProfile' created successfully!");

    const UpdateStudentProfile = `
        CREATE PROCEDURE UpdateStudentProfile(
        IN p_stud_id INT,
        IN p_name VARCHAR(100),
        IN p_phone_no VARCHAR(15),
        IN p_address VARCHAR(255)
    )
    BEGIN
        -- Update only fields provided
        UPDATE students
        SET 
            name = COALESCE(p_name, name),
            phone_no = COALESCE(p_phone_no, phone_no),
            address = COALESCE(p_address, address)
        WHERE stud_id = p_stud_id;

        -- Return updated data
        SELECT 
            stud_id,
            name,
            phone_no,
            address,
            email,
            role
        FROM students
        WHERE stud_id = p_stud_id;
    END ;
`;
    await sequelize.query(UpdateStudentProfile);
    console.log(" Procedure 'UpdateStudentProfile' created successfully!");

const GetStudentsInSameRoom = `
CREATE PROCEDURE GetStudentsInSameRoom(IN input_student_id INT)
BEGIN
    DECLARE roomId INT;

    -- Find the room ID where the given student is staying
    SELECT room_id INTO roomId
    FROM room_assignments_view
    WHERE student_id = input_student_id
    LIMIT 1;

    -- If the student has no room assigned
    IF roomId IS NULL THEN
        SELECT 'Student has no assigned room' AS message;
    ELSE
        -- Return all students in the same room along with room & hostel details
        SELECT 
            rav.hostel_name,
            rav.hostel_address,
            rav.room_id,
            rav.room_no,
            rav.floor_no,
            rav.is_occupied,
            rav.student_id,
            rav.student_name,
            rav.email,
            rav.phone_no
        FROM room_assignments_view rav
        WHERE rav.room_id = roomId
        ORDER BY rav.student_name;
    END IF;
END
`;

await sequelize.query(GetStudentsInSameRoom, { raw: true });
console.log(" Procedure 'GetStudentsInSameRoom' created successfully!");


    const MakeStudentPayment =`
          CREATE PROCEDURE MakeStudentPayment(
        IN p_student_id INT,
        IN p_staff_id INT,
        IN p_amount DECIMAL(10,2)
    )
    BEGIN
        DECLARE v_student_exists INT;

        --  Validate student existence
        SELECT COUNT(*) INTO v_student_exists 
        FROM students 
        WHERE stud_id = p_student_id;

        IF v_student_exists = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = ' Student not found';
        END IF;

        --  Validate payment amount
        IF p_amount <= 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = ' Invalid payment amount';
        END IF;

        --  Insert new payment
        INSERT INTO bills (student_id, staff_id, amount, date)
        VALUES (p_student_id, p_staff_id, p_amount, NOW());

        --  Return inserted payment record
        SELECT 
            b.bill_id,
            b.student_id,
            s.name AS student_name,
            b.staff_id,
            st.name AS staff_name,
            b.amount,
            b.date
        FROM bills b
        LEFT JOIN students s ON b.student_id = s.stud_id
        LEFT JOIN staff st ON b.staff_id = st.staff_id
        WHERE b.bill_id = LAST_INSERT_ID();
    END ;
    
    `;

    await sequelize.query(MakeStudentPayment);
    console.log(" Procedure 'MakeStudentPayment' created successfully!");


  } catch (error) {
    console.error(" Error creating procedure:", error.message);
  }
}

module.exports = { createAssignStudentProcedure };
