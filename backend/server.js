const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./configurations/dbconnection");

// Load environment variables
dotenv.config();

// Import models
require("./models/admin.model");
require("./models/bill.model");
require("./models/hostel.model");
require("./models/room.model");
require("./models/student.model");
require("./models/staff.model");


// Import setup scripts (functions only)
const { createAssignStudentProcedure } = require("../backend/procedures/setupProcedures.js");
const { createRoomCapacityTrigger } = require("../backend/triggers/setupTriggers.js");
const { createViews } = require("../backend/views/setupViews.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const studentRoutes = require("../backend/routes/studentRoutes.js");
const adminRoutes = require("../backend/routes/admin.routes.js");

app.use("/api/admins", adminRoutes);
app.use("/api/students", studentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🏠 Hostel Management System API running...");
});

// Database connection & server start
(async () => {
  try {
    // Test and sync database
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await sequelize.sync({ alter: true }); // sync models to DB
    console.log("✅ All models synced successfully!");

    await createRoomCapacityTrigger();
    await createAssignStudentProcedure();
    await createViews();
    

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
})();
