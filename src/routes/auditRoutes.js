const express = require("express");

const router = express.Router();

const {
  getAudits,
  getAuditById,
  createAudit
} = require("../controllers/auditController");

/**
 * @swagger
 * /audits:
 *   get:
 *     summary: Get all audits
 *     tags:
 *       - Audits
 *     responses:
 *       200:
 *         description: Audit list
 */
router.get("/", getAudits);
router.get("/:id", getAuditById);
/**
 * @swagger
 * /audits:
 *   post:
 *     summary: Create new audit
 *     tags:
 *       - Audits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Audit created successfully
 */
router.post("/", createAudit);

module.exports = router;

