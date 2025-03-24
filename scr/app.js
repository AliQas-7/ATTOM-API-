const express = require("express");
const bodyParser = require("body-parser");
const propertyRoutes = require("./routes/propertyRoutes");
const salesRoutes = require("./routes/salesRoutes");
const sequelize = require("./config/db");

const app = express();
app.use(bodyParser.json());

app.use("/api/property", propertyRoutes);
app.use("/api/sales", salesRoutes);  

// Sync database with better error handling
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database connected and synced"))
  .catch((err) => {
    console.error("🔥 Database Sync Error:", err);
    process.exit(1); // Exit process on DB sync failure
  });

module.exports = app;
