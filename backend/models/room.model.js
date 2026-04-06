const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");
const Hostel = require("./hostel.model.js");

const Rooms = sequelize.define("Rooms", {
  room_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  room_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floor_no: {
    type: DataTypes.INTEGER,
  },
  is_occupied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 4, 
  },
});

Hostel.hasMany(Rooms, { foreignKey: "hostel_id" });
Rooms.belongsTo(Hostel, { foreignKey: "hostel_id" });

module.exports = Rooms;
