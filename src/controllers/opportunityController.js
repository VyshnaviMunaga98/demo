const db = require("../config/db");


// GET ALL OPPORTUNITIES
const getOpportunities = (req, res) => {

  const query = `
    SELECT *
    FROM outcome_opportunities
    ORDER BY createdDate DESC
  `;

  db.query(query, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      data: results
    });

  });

};


// CREATE OPPORTUNITY
const createOpportunity = (req, res) => {

  const {
    auditId,
    title,
    category,
    priority,
    status,
    owner,
    dueDate
  } = req.body;

  // Generate simple ID
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM outcome_opportunities
  `;

  db.query(countQuery, (countErr, countResult) => {

    if (countErr) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    const opportunityId =
      `OPP-${1000 + countResult[0].total + 1}`;

    const opportunity = {
      id: opportunityId,
      auditId,
      title,
      category,
      priority,
      status,
      owner,
      dueDate,
      createdDate: new Date()
    };

    const insertQuery = `
      INSERT INTO outcome_opportunities
      SET ?
    `;

    db.query(insertQuery, opportunity, (insertErr) => {

      if (insertErr) {
        console.error(insertErr);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(201).json({
        success: true,
        message: "Opportunity created successfully",
        data: opportunity
      });

    });

  });

};


// GET OPPORTUNITIES BY AUDIT
const getOpportunitiesByAudit = (req, res) => {

  const query = `
    SELECT *
    FROM outcome_opportunities
    WHERE auditId = ?
    ORDER BY createdDate DESC
  `;

  db.query(
    query,
    [req.params.auditId],
    (err, results) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.json({
        success: true,
        data: results
      });

    }
  );

};


module.exports = {
  getOpportunities,
  createOpportunity,
  getOpportunitiesByAudit
};