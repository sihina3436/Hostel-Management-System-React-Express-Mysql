const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection");

const Staff = sequelize.define("Staff", {
  staff_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  contact_no: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, allowNull: false,defaultValue: 'staff' },
  password: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Staff;
