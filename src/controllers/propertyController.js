const axios = require("axios");
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

// 📌 Get Property List by Postal Code and Type
exports.getPropertiesByZipCode = async (req, res) => {
  const { postalcode, propertytype, orderby = "calendardate", page = 1, pagesize = 100 } = req.body;

  if (!postalcode || !propertytype) {
    return res.status(400).json({ error: "postalcode and propertytype are required in request body" });
  }

  const url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address";
  const params = { postalcode, propertytype, orderby, page, pagesize };

  // Fetch from API
  const data = await fetchFromAttom(url, params);
  if (!data) return res.status(500).json({ error: "Failed to fetch property data" });

  res.json(data);
};
