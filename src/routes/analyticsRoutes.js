const express = require("express");

const router = express.Router();

const {
  getAuditTypes
} = require("../controllers/analyticsController");

router.get("/types", getAuditTypes);

module.exports = router;

