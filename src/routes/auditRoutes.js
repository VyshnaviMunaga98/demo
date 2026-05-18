const express = require("express");

const router = express.Router();

const {
  getAudits,
  getAuditById,
  createAudit
} = require("../controllers/auditController");

router.get("/", getAudits);
router.get("/:id", getAuditById);
router.post("/", createAudit);

module.exports = router;

