const axios = require("axios");
const Sales = require("../models/Sales");
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

// Normalize request parameters for better duplicate checks
const normalizeParams = (params) => {
  return JSON.stringify(
    Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {})
  );
};

// Fetch existing data from DB
const getExistingData = async (params, type) => {
  const normalizedParams = normalizeParams(params);
  return await Sales.findOne({ where: { normalizedRequest: normalizedParams, type } });
};

// Generic function to fetch and store sales data
const fetchAndStoreSalesData = async (req, res, type, endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const params = req.body;
  const normalizedParams = normalizeParams(params);

  try {
    // Check if data already exists in DB
    const existingData = await getExistingData(params, type);
    if (existingData) {
      return res.json(existingData.responseData); // ✅ Return existing data instead of error
    }

    // Fetch new data from ATTOM API
    const data = await fetchFromAttom(url, params);
    if (!data) return res.status(500).json({ error: "Failed to fetch data from ATTOM API" });

    // Store the fetched data in DB
    await Sales.create({
      type,
      normalizedRequest: normalizedParams,
      requestParams: params,
      responseData: data,
    });

    res.json(data);
  } catch (error) {
    console.error(`Error in ${type}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Routes with Improved Duplicate Handling
exports.getSalesSnapshot = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "snapshot", "/sale/snapshot");
};

exports.getSaleDetail = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "detail", "/sale/detail");
};

exports.getSalesHistorySnapshot = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "history_snapshot", "/saleshistory/snapshot");
};

exports.getDeedAndMortgageHistory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "deed_mortgage_history", "/saleshistory/basichistory");
};

exports.getExpandedDeedAndMortgageHistory = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "expanded_deed_mortgage_history", "/saleshistory/expandedhistory");
};

exports.getSalesHistoryDetail = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  fetchAndStoreSalesData(req, res, "sales_history_detail", "/saleshistory/detail");
};

// 📌 Fetch all stored sales data
exports.getStoredSales = async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.json(sales);
  } catch (error) {
    console.error("DB Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch stored sales data" });
  }
};
