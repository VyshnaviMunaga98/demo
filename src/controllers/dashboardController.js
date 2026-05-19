const db = require("../config/db");

const getDashboardSummary = (req, res) => {

  const query = `
    SELECT *
    FROM audits
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

    const audits = results.map(audit => ({
      ...audit,
      lobs: JSON.parse(audit.lobs || "[]")
    }));


    // COUNTS
    let openAudits = 0;
    let closedAudits = 0;
    let inReviewAudits = 0;

    let internalAudits = 0;
    let externalAudits = 0;

    let highPriority = 0;
    let mediumPriority = 0;
    let lowPriority = 0;

    let estimatedSavings = 0;


    // PROCESS AUDITS
    audits.forEach(audit => {

      // Status counts
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

      // Simple dynamic score
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

      // Priority distribution
      if (score >= 70) {

        highPriority++;

        estimatedSavings += 25000;

      } else if (score >= 40) {

        mediumPriority++;

        estimatedSavings += 10000;

      } else {

        lowPriority++;

        estimatedSavings += 3000;
      }

    });


    // KPI CARDS
    const summaryCards = [
      {
        title: "Total Audits",
        value: audits.length
      },
      {
        title: "Open Audits",
        value: openAudits
      },
      {
        title: "High Priority",
        value: highPriority
      },
      {
        title: "Estimated Savings",
        value: estimatedSavings
      }
    ];


    // STATUS CHART
    const auditStatusDistribution = [
      {
        label: "Open",
        value: openAudits
      },
      {
        label: "Closed",
        value: closedAudits
      },
      {
        label: "In Review",
        value: inReviewAudits
      }
    ];


    // TYPE CHART
    const auditTypeDistribution = [
      {
        label: "Internal",
        value: internalAudits
      },
      {
        label: "External",
        value: externalAudits
      }
    ];


    // PRIORITY CHART
    const priorityDistribution = [
      {
        label: "High",
        value: highPriority
      },
      {
        label: "Medium",
        value: mediumPriority
      },
      {
        label: "Low",
        value: lowPriority
      }
    ];


    // MOCK TREND DATA
    const monthlyAuditTrend = [
      {
        month: "Jan",
        count: 8
      },
      {
        month: "Feb",
        count: 12
      },
      {
        month: "Mar",
        count: 15
      },
      {
        month: "Apr",
        count: 10
      },
      {
        month: "May",
        count: audits.length
      }
    ];


    // RECENT AUDITS
    const recentAudits = audits.slice(0, 5).map(audit => ({

      id: audit.id,

      name: audit.name,

      type: audit.type,

      claimStatus: audit.claimStatus,

      createdDate: audit.createdDate

    }));


    // FINAL RESPONSE
    res.json({
      success: true,

      data: {
        summaryCards,

        auditStatusDistribution,

        auditTypeDistribution,

        priorityDistribution,

        monthlyAuditTrend,

        recentAudits
      }
    });

  });

};

module.exports = {
  getDashboardSummary
};