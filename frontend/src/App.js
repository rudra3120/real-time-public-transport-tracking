import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

/* ---------- UI STYLES ---------- */

const pageStyle = {
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  background: "linear-gradient(135deg, #eef2f7, #f8fafc)",
  minHeight: "100vh",
  padding: "40px"
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "auto"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px"
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "600"
};

const liveBadge = {
  color: "#0f9d58",
  fontWeight: "600",
  fontSize: "14px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease"
};

const cardHover = e => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
};

const cardLeave = e => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
};

const labelStyle = { color: "#666", fontSize: "13px" };
const valueStyle = { fontSize: "18px", fontWeight: "600" };

const footerStyle = {
  marginTop: "40px",
  textAlign: "center",
  fontSize: "13px",
  color: "#777"
};

/* ---------- APP ---------- */

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
        .then(setBus);

      fetch(`${API_URL}/api/bus/eta`)
        .then(res => res.json())
        .then(setEta);

      fetch(`${API_URL}/api/route`)
        .then(res => res.json())
        .then(setRoute);

      fetch(`${API_URL}/api/bus/status`)
        .then(res => res.json())
        .then(setStatus);

      setLastUpdated(new Date());
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const statusColor =
    status?.status === "Running"
      ? "#0f9d58"
      : status?.status === "Delayed"
      ? "#f4b400"
      : "#d93025";

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div style={titleStyle}>🚌 Public Transport Tracking Dashboard</div>
          <div style={liveBadge}>● LIVE</div>
        </div>

        {/* METRICS GRID */}
        <div style={gridStyle}>
          {/* BUS INFO */}
          <div style={cardStyle} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
            <p style={labelStyle}>Bus</p>
            <p style={valueStyle}>{bus ? `Bus #${bus.busId}` : "Loading..."}</p>
            {bus && (
              <>
                <p style={labelStyle}>Latitude</p>
                <p>{bus.latitude.toFixed(6)}</p>
                <p style={labelStyle}>Longitude</p>
                <p>{bus.longitude.toFixed(6)}</p>
              </>
            )}
          </div>

          {/* STATUS */}
          <div style={cardStyle} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
            <p style={labelStyle}>Bus Status</p>
            <p style={{ ...valueStyle, color: statusColor }}>
              {status ? status.status : "Checking..."}
            </p>
          </div>

          {/* ETA */}
          <div style={cardStyle} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
            <p style={labelStyle}>Estimated Arrival</p>
            {eta ? (
              <>
                <p style={valueStyle}>{eta.etaMinutes} min</p>
                <p style={labelStyle}>Distance</p>
                <p>{eta.remainingDistance} km</p>
                <p style={labelStyle}>Avg Speed</p>
                <p>{eta.averageSpeed} km/h</p>
              </>
            ) : (
              <p>Calculating...</p>
            )}
          </div>
        </div>

        {/* ROUTE CARD */}
        <div
          style={{ ...cardStyle, marginTop: "25px" }}
          onMouseEnter={cardHover}
          onMouseLeave={cardLeave}
        >
          <h3>🧭 Route & Stops</h3>
          {route ? (
            <>
              <p><strong>{route.routeName}</strong></p>
              <ul>
                {route.stops.map((stop, i) => (
                  <li key={i}>{stop}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading route information...</p>
          )}
        </div>

        {/* ADMIN DASHBOARD */}
        <div
          style={{ ...cardStyle, marginTop: "25px" }}
          onMouseEnter={cardHover}
          onMouseLeave={cardLeave}
        >
          <h3>🧑‍💼 Admin Panel</h3>
          <p><strong>Active Buses:</strong> 1</p>
          <p><strong>System Health:</strong> <span style={{ color: "#0f9d58" }}>Online</span></p>
          {lastUpdated && (
            <p style={labelStyle}>
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          © 2025 Real-Time Public Transport Tracking System | Minor Project
        </div>
      </div>
    </div>
  );
}

export default App;
