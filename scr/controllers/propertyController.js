const axios = require("axios");
const Property = require("../models/Property");
require("dotenv").config();

const ATTOM_API_KEY = process.env.ATTOM_API_KEY;

// Function to fetch data from ATTOM API
const fetchFromAttom = async (url, params) => {
  try {
    const response = await axios.get(url, {
      headers: { "apikey": ATTOM_API_KEY, "Accept": "application/json" },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("ATTOM API Error:", error.response?.data || error.message);
    return null;
  }
};

// Function to check if data already exists in the database
const getExistingData = async (requestType, params, Model) => {
  return await Model.findOne({
    where: {
      requestType,
      requestParams: JSON.stringify(params),
    },
  });
};

// 📌 Get Property List by Postal Code and Type
exports.getPropertiesByZipCode = async (req, res) => {
  const { postalcode, propertytype, orderby = "calendardate", page = 1, pagesize = 100 } = req.body;

  if (!postalcode || !propertytype) {
    return res.status(400).json({ error: "postalcode and propertytype are required in request body" });
  }

  const url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address";
  const params = { postalcode, propertytype, orderby, page, pagesize };

  // Check if data already exists
  const existingEntry = await getExistingData("property_list", params, Property);
  
  if (existingEntry) {
    return res.json(existingEntry.responseData); // ✅ Return existing data instead of error
  }

  // Fetch from API
  const data = await fetchFromAttom(url, params);
  if (!data) return res.status(500).json({ error: "Failed to fetch property data" });

  // Store in DB (only if it's unique)
  await Property.create({
    requestType: "property_list",
    requestParams: JSON.stringify(params),
    responseData: data,
  });

  res.json(data);
};
