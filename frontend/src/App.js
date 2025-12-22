import React from "react";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚌 Real-Time Public Transport Tracking System</h1>

      <p>
        This system provides real-time tracking of public buses for small cities.
        Commuters can view live bus locations, estimated arrival times, and route
        information.
      </p>

      <h3>Features</h3>
      <ul>
        <li>Live Bus Location Tracking</li>
        <li>Estimated Arrival Time (ETA)</li>
        <li>Route and Stop Information</li>
        <li>Admin Monitoring Dashboard</li>
      </ul>

      <h3>Backend Status</h3>
      <a
        href="https://transport-tracking-backend.onrender.com"
        target="_blank"
        rel="noreferrer"
      >
        Check Backend Health
      </a>

      <p style={{ marginTop: "40px", color: "gray" }}>
        Minor Project | Computer Science Engineering
      </p>
    </div>
  );
}

export default App;
