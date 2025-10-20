const { DataTypes } = require("sequelize");
const sequelize = require("../configurations/dbconnection.js");

const Admin = sequelize.define("Admin", {
  admin_id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
});

module.exports = Admin;
