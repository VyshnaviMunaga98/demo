const db = require("../config/db");

const getAuditTypes = (req, res) => {

  const query = `
    SELECT * FROM audits
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

    const auditTypes = {};
    const claimStatuses = {};
    const priorityDistribution = {};

    audits.forEach(audit => {

      // Audit types
      auditTypes[audit.type] =
        (auditTypes[audit.type] || 0) + 1;

      // Claim status
      claimStatuses[audit.claimStatus] =
        (claimStatuses[audit.claimStatus] || 0) + 1;

      // Priority calculation
      let score = 0;

      if (audit.type === "External") {
        score += 30;
      }

      if (audit.claimStatus === "Open") {
        score += 40;
      }

      if (audit.lobs.length >= 2) {
        score += 20;
      }

      if (audit.questionnaire === "Compliance") {
        score += 10;
      }

      let priority = "Low";

      if (score >= 70) {
        priority = "High";
      } else if (score >= 40) {
        priority = "Medium";
      }

      priorityDistribution[priority] =
        (priorityDistribution[priority] || 0) + 1;

    });

    res.json({
      success: true,
      data: {
        auditTypes,
        claimStatuses,
        priorityDistribution
      }
    });

  });

};

module.exports = {
  getAuditTypes
};

// const db = require("../config/db");

// const getAuditTypes = (req, res) => {
//   const query = `
//     SELECT type, COUNT(*) as count
//     FROM audits
//     GROUP BY type
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Database error"
//       });
//     }

//     res.json({
//       success: true,
//       data: results
//     });
//   });
// };

// module.exports = {
//   getAuditTypes
// };

