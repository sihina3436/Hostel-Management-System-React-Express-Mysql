const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");

const Hostel = sequelize.define("Hostel", {
  hostel_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  host_name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  contact_no: { type: DataTypes.STRING },
  type: { type: DataTypes.ENUM("Girls", "Boys"), allowNull: false },
});

module.exports = Hostel;
