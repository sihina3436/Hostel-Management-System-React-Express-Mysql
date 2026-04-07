const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");
const Rooms = require("./room.model.js");

const Student = sequelize.define("Student", {
  stud_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone_no: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, allowNull: false ,defaultValue:'student'},
  password: {
  type: DataTypes.STRING,
  allowNull: false
},
});


Rooms.hasMany(Student, { foreignKey: "room_id" });
Student.belongsTo(Rooms, { foreignKey: "room_id" });

module.exports = Student;
