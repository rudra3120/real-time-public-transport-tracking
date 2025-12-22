require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Backend status API (for frontend integration)
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is live and connected",
    timestamp: new Date()
  });
});
