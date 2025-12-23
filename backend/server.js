require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Store live bus location (real GPS)
let busLocation = {
  busId: 1,
  latitude: 23.2599,
  longitude: 77.4126,
  timestamp: new Date()
};

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Backend status API
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is live and connected",
    timestamp: new Date()
  });
});

// Receive real GPS from phone
app.post("/api/bus/location", (req, res) => {
  const { busId, latitude, longitude } = req.body;

  busLocation = {
    busId,
    latitude,
    longitude,
    timestamp: new Date()
  };

  res.json({ message: "Location updated successfully" });
});

// Send GPS to frontend
app.get("/api/bus/location", (req, res) => {
  res.json(busLocation);
});

// ETA calculation API
let remainingDistance = 5;

app.get("/api/bus/eta", (req, res) => {
  const averageSpeed = 30;

  if (remainingDistance > 0.5) {
    remainingDistance -= 0.2;
  }

  const etaMinutes = (remainingDistance / averageSpeed) * 60;

  res.json({
    remainingDistance: remainingDistance.toFixed(2),
    averageSpeed,
    etaMinutes: etaMinutes.toFixed(1)
  });
});

// Route API
app.get("/api/route", (req, res) => {
  res.json({
    routeId: "R-101",
    routeName: "City Center to Railway Station",
    stops: [
      "City Center",
      "Market Square",
      "Bus Stand",
      "Central Mall",
      "Railway Station"
    ]
  });
});

// Bus status API
app.get("/api/bus/status", (req, res) => {
  res.json({
    busId: 1,
    status: "Running",
    lastUpdated: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
