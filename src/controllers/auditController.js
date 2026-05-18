const db = require("../config/db");

const createAudit = (req, res) => {
  const {
    name,
    questionnaire,
    type,
    lobs,
    claimNumber,
    policyHolderName,
    claimStatus
  } = req.body;

  const audit = {
    id: `AUD-${Date.now()}`,
    name,
    questionnaire,
    type,
    lobs: JSON.stringify(lobs),
    claimNumber,
    policyHolderName,
    claimStatus,
    createdDate: new Date()
  };

  const query = `
    INSERT INTO audits SET ?
  `;

  db.query(query, audit, (err) => {
    // console.log(audit);
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "Audit created successfully",
      data: audit
    });
  });
};

const getAudits = (req, res) => {
  const query = `
    SELECT * FROM audits
    ORDER BY createdDate DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    const audits = results.map(audit => ({
      ...audit,
      lobs: JSON.parse(audit.lobs || "[]")
    }));

    res.json({
      success: true,
      total: audits.length,
      data: audits
    });
  });
};

const getAuditById = (req, res) => {
  const query = `
    SELECT * FROM audits
    WHERE id = ?
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Audit not found"
      });
    }

    const audit = {
      ...results[0],
      lobs: JSON.parse(results[0].lobs || "[]")
    };

    res.json({
      success: true,
      data: audit
    });
  });
};

module.exports = {
  createAudit,
  getAudits,
  getAuditById
};
