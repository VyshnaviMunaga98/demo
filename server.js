const express = require("express");
const cors = require("cors");

require("./src/config/db");

const dashboardRoutes = require("./src/routes/dashboardRoutes");
const auditRoutes = require("./src/routes/auditRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const authRoutes = require("./src/routes/authRoutes");
const verifyToken = require("./src/middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec =require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Audit Claim Review API is running"
  });
});

app.use("/auth", authRoutes);
app.use("/audits", verifyToken, auditRoutes);
app.use("/dashboard", verifyToken, dashboardRoutes);
app.use("/analytics", verifyToken, analyticsRoutes);
app.use("/opportunities", verifyToken, opportunityRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});