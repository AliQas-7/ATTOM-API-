const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Property = sequelize.define("Property", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  requestType: { 
    type: DataTypes.ENUM("property_detail", "property_list"), // ✅ Added "property_list"
    allowNull: false 
  },
  requestParams: { type: DataTypes.TEXT, allowNull: false },
  responseData: { type: DataTypes.JSON, allowNull: false },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = Property;
