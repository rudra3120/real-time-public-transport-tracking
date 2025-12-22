require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ---------------- BASIC ROUTES ---------------- */

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

/* ---------------- MOCK BUS TRACKING ---------------- */

// Mock GPS data
let busLocation = {
  busId: 1,
  latitude: 23.2599,
  longitude: 77.4126
};

// Get live bus location
app.get("/api/bus/location", (req, res) => {
  res.json(busLocation);
});

// Simulate bus movement
app.post("/api/bus/update", (req, res) => {
  busLocation.latitude += 0.0001;
  busLocation.longitude += 0.0001;

  res.json({
    message: "Bus location updated",
    busLocation
  });
});

/* ---------------- START SERVER (LAST) ---------------- */

const PORT = process.env.PORT || 5000;
// Mock remaining distance (in km)
let remainingDistance = 5; // 5 km initially

// ETA calculation API
app.get("/api/bus/eta", (req, res) => {
  const averageSpeed = 30; // km/h

  // Reduce distance to simulate movement
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
// Route and stop information API
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
