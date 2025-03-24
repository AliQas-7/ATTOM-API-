const express = require("express");
const bodyParser = require("body-parser");
const propertyRoutes = require("./routes/propertyRoutes");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/property", propertyRoutes);
app.use("/api/sales", salesRoutes);  

module.exports = app;
