const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");
const Student = require("./student.model.js");
const Staff = require("./staff.model.js");

const Bill = sequelize.define("Bill", {
  bill_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Student.hasMany(Bill, { foreignKey: "student_id" });
Bill.belongsTo(Student, { foreignKey: "student_id" });

Staff.hasMany(Bill, { foreignKey: "staff_id" });
Bill.belongsTo(Staff, { foreignKey: "staff_id" });

module.exports =  Bill;
