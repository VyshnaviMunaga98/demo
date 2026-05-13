const express = require("express");
const cors = require("cors");

require("./src/config/db");

const dashboardRoutes = require("./src/routes/dashboardRoutes");
const auditRoutes = require("./src/routes/auditRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Audit Claim Review API is running"
  });
});

app.use("/dashboard", dashboardRoutes);
app.use("/audits", auditRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/opportunities", opportunityRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});