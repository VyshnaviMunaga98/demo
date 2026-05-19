const express = require("express");

const router = express.Router();

const {
  getAuditTypes
} = require("../controllers/analyticsController");

/**
 * @swagger
 * /analytics/types:
 *   get:
 *     summary: Get analytics data
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Analytics data fetched successfully
 */
router.get("/types", getAuditTypes);

module.exports = router;

