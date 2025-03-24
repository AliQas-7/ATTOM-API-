const express = require("express");
const salesController = require("../controllers/salesController");

const router = express.Router();

router.get("/snapshot", salesController.getSalesSnapshot);              // Sales snapshot
router.get("/detail", salesController.getSaleDetail);                   // Sale detail by address
router.get("/saleshistory", salesController.getSalesHistorySnapshot);   // Sales history snapshot
router.get("/saleshistory/basichistory", salesController.getDeedAndMortgageHistory);  // Basic sales history
router.get("/saleshistory/expandedhistory", salesController.getExpandedDeedAndMortgageHistory);  // Expanded sales history
router.get("/saleshistory/detail", salesController.getSalesHistoryDetail);    // Detailed sales history
router.get("/stored", salesController.getStoredSales);

module.exports = router;
