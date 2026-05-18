const issueWeights = {
  "Documentation Missing": 15,
  "Incorrect Data": 20,
  "Approval Delay": 25,
  "Process Gap": 10
};

const calculateRisk = ({ impactLevel, delayCount, issueType }) => {
  const impactScore = impactLevel * 15;
  const delayScore = delayCount * 10;
  const issueScore = issueWeights[issueType] || 10;

  const totalScore =
    impactScore +
    delayScore +
    issueScore;

  let riskLevel = "Low";

  if (totalScore >= 70) {
    riskLevel = "High";
  } else if (totalScore >= 40) {
    riskLevel = "Medium";
  }

  return {
    riskScore: totalScore,
    riskLevel,
    reviewRequired: totalScore >= 70
  };
};

module.exports = {
  calculateRisk
};