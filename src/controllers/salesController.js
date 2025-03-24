const axios = require("axios");
require("dotenv").config();

const ATTOM_API_KEY = process.env.ATTOM_API_KEY;
const BASE_URL = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

// Fetch data from ATTOM API
const fetchFromAttom = async (url, params) => {
  try {
    const response = await axios.get(url, {
      headers: { apikey: ATTOM_API_KEY, Accept: "application/json" },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("ATTOM API Error:", error.response?.data || error.message);
    return null;
  }
};

// Simplified function to fetch sales data
const fetchSalesData = async (req, res, endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const params = req.body;

  try {
    const data = await fetchFromAttom(url, params);
    if (!data) return res.status(500).json({ error: "Failed to fetch data from ATTOM API" });
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSalesSnapshot = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/sale/snapshot");
};

exports.getSaleDetail = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/sale/detail");
};

exports.getSalesHistorySnapshot = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/saleshistory/snapshot");
};

exports.getDeedAndMortgageHistory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/saleshistory/basichistory");
};

exports.getExpandedDeedAndMortgageHistory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/saleshistory/expandedhistory");
};

exports.getSalesHistoryDetail = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchSalesData(req, res, "/saleshistory/detail");
};
