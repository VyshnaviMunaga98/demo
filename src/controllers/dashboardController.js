const db = require("../config/db");

const getDashboardSummary = (req, res) => {

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

    let openAudits = 0;
    let closedAudits = 0;
    let inReviewAudits = 0;

    let internalAudits = 0;
    let externalAudits = 0;

    let highPriorityAudits = 0;
    let reviewRequiredAudits = 0;
    let complexAudits = 0;

    audits.forEach(audit => {

      // Claim status counts
      if (audit.claimStatus === "Open") {
        openAudits++;
      }

      if (audit.claimStatus === "Closed") {
        closedAudits++;
      }

      if (audit.claimStatus === "In Review") {
        inReviewAudits++;
      }

      // Type counts
      if (audit.type === "Internal") {
        internalAudits++;
      }

      if (audit.type === "External") {
        externalAudits++;
      }

      // Dynamic score calculation
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

      // High priority
      if (score >= 70) {
        highPriorityAudits++;
      }

      // Review required
      if (
        audit.type === "External" &&
        audit.claimStatus === "Open"
      ) {
        reviewRequiredAudits++;
      }

      // Complexity
      if (audit.lobs.length >= 3) {
        complexAudits++;
      }

    });

    res.json({
      success: true,
      data: {
        totalAudits: audits.length,
        openAudits,
        closedAudits,
        inReviewAudits,
        internalAudits,
        externalAudits,
        highPriorityAudits,
        reviewRequiredAudits,
        complexAudits
      }
    });

  });

};

module.exports = {
  getDashboardSummary
};

// const db = require("../config/db");

// const getDashboardSummary = (req, res) => {
//   const query = `
//     SELECT COUNT(*) as totalAudits
//     FROM audits
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
//       data: results[0]
//     });
//   });
// };

// module.exports = {
//   getDashboardSummary
// };
