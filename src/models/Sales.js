const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // ✅ Import the database connection

const Sales = sequelize.define("Sales", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  requestParams: { type: DataTypes.JSON, allowNull: false },
  responseData: { type: DataTypes.JSON, allowNull: false },
  type: { 
    type: DataTypes.ENUM("snapshot", "detail", "history_snapshot", "deed_mortgage_history", "expanded_deed_mortgage_history", "sales_history_detail"), 
    allowNull: false, 
    defaultValue: "snapshot" 
  },
  
  normalizedRequest: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  }
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = Sales;
