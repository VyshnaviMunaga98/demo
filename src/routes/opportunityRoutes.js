const express = require("express");

const router = express.Router();

const {
  getOpportunities,
  createOpportunity,
  getOpportunitiesByAudit
} = require("../controllers/opportunityController");

router.get("/", getOpportunities);

router.post("/", createOpportunity);

router.get("/audit/:auditId", getOpportunitiesByAudit);

module.exports = router;