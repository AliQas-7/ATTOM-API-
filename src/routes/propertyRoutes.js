const express = require("express");
const { getPropertiesByZipCode } = require("../controllers/propertyController");

const router = express.Router();

// Route to get property details by ATTOM ID
router.get("/address", getPropertiesByZipCode);

module.exports = router;
