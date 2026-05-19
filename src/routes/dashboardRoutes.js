const express = require("express");

const router = express.Router();

const {
  getDashboardSummary
} = require("../controllers/dashboardController");

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 */
router.get("/summary", getDashboardSummary);

module.exports = router;
