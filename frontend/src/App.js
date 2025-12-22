import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

// Card style for UI sections
const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginBottom: "25px",
  transition: "transform 0.3s ease"
};

function App() {
  const [bus, setBus] = useState(null);
  const [eta, setEta] = useState(null);
  const [route, setRoute] = useState(null);
  const [status, setStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/api/bus/location`)
        .then(res => res.json())
        .then(data => setBus(data));

      fetch(`${API_URL}/api/bus/eta`)
        .then(res => res.json())
        .then(data => setEta(data));

      fetch(`${API_URL}/api/route`)
        .then(res => res.json())
        .then(data => setRoute(data));

      fetch(`${API_URL}/api/bus/status`)
        .then(res => res.json())
        .then(data => setStatus(data));

      setLastUpdated(new Date());
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const statusColor =
    status?.status === "Running"
      ? "green"
      : status?.status === "Delayed"
      ? "orange"
      : "red";

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: "40px"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px"
        }}
      >
        <h1>🚌 Real-Time Public Transport Tracking System</h1>
        <p style={{ color: "green", fontWeight: "bold" }}>
          ● Live Tracking Active
        </p>

        {/* Live Bus Tracking */}
        <div style={cardStyle}>
          <h3>🚌 Live Bus Tracking (Mock GPS)</h3>
          {bus && (
            <>
              <p><strong>Bus ID:</strong> {bus.busId}</p>
              <p><strong>Latitude:</strong> {bus.latitude.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {bus.longitude.toFixed(6)}</p>
            </>
          )}
        </div>

        {/* Bus Status */}
        <div style={cardStyle}>
          <h3>🚌 Bus Status</h3>
          {status ? (
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: statusColor, fontWeight: "bold" }}>
                {status.status}
              </span>
            </p>
          ) : (
            <p>Loading bus status...</p>
          )}
        </div>

        {/* ETA */}
        <div style={cardStyle}>
          <h3>⏱️ Estimated Arrival Time (ETA)</h3>
          {eta && eta.etaMinutes ? (
            <>
              <p><strong>Remaining Distance:</strong> {eta.remainingDistance} km</p>
              <p><strong>Average Speed:</strong> {eta.averageSpeed} km/h</p>
              <p><strong>ETA:</strong> {eta.etaMinutes} minutes</p>
            </>
          ) : (
            <p>Calculating ETA...</p>
          )}
        </div>

        {/* Route & Stops */}
        <div style={cardStyle}>
          <h3>🧭 Route & Stops</h3>
          {route ? (
            <>
              <p><strong>Route:</strong> {route.routeName}</p>
              <ul>
                {route.stops.map((stop, index) => (
                  <li key={index}>{stop}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading route information...</p>
          )}
        </div>

        {/* Admin Dashboard */}
        <div style={cardStyle}>
          <h3>🧑‍💼 Admin Dashboard</h3>
          <p><strong>Active Buses:</strong> 1</p>
          <p><strong>Bus Status:</strong> {status ? status.status : "Checking..."}</p>
          <p><strong>Average Speed:</strong> {eta ? eta.averageSpeed : "--"} km/h</p>
          <p>
            <strong>System Health:</strong>{" "}
            <span style={{ color: "green" }}>Online</span>
          </p>

          {lastUpdated && (
            <p
              style={{
                background: "#e8f5e9",
                padding: "8px 14px",
                borderRadius: "20px",
                display: "inline-block",
                fontSize: "14px"
              }}
            >
              ⏱ Last Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <hr />
        <p style={{ textAlign: "center", color: "#777", fontSize: "14px" }}>
          © 2025 Real-Time Public Transport Tracking System | Minor Project
        </p>
      </div>
    </div>
  );
}

export default App;
