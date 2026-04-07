const sequelize = require("../configurations/dbconnection.js");

async function createRoomCapacityTrigger() {
  try {
    // Drop trigger if it already exists
    await sequelize.query("DROP TRIGGER IF EXISTS check_room_capacity;");

    const triggerSQL = `
      CREATE TRIGGER check_room_capacity
      BEFORE INSERT ON students
      FOR EACH ROW
      BEGIN
        DECLARE student_count INT;
        SELECT COUNT(*) INTO student_count FROM students WHERE room_id = NEW.room_id;
        IF student_count >= 4 THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = ' Room capacity reached (max 4 students allowed)';
        END IF;
      END;
    `;

    await sequelize.query(triggerSQL);
    console.log("✅ Trigger 'check_room_capacity' created successfully!");
  } catch (error) {
    console.error("Error creating trigger:", error.message);
  }
}

module.exports = { createRoomCapacityTrigger };
