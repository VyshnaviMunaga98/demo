const express = require("express");

const router = express.Router();

const {
  getOpportunities,
  createOpportunity,
  getOpportunitiesByAudit
} = require("../controllers/opportunityController");

/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Get all opportunities
 *     tags:
 *       - Opportunities
 *     responses:
 *       200:
 *         description: Opportunities fetched successfully
 */
router.get("/", getOpportunities);

/**
 * @swagger
 * /opportunities:
 *   post:
 *     summary: Create new opportunity
 *     tags:
 *       - Opportunities
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 */
router.post("/", createOpportunity);

router.get("/audit/:auditId", getOpportunitiesByAudit);

module.exports = router;