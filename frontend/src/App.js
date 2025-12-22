import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

/* ================= STYLES ================= */

const pageStyle = {
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  minHeight: "100vh",
  padding: "40px"
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "auto",
  background: "#f9fafb",
  borderRadius: "20px",
  padding: "30px"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px"
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#2d3748"
};

const liveBadge = {
  background: "#22c55e",
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px"
};

const cardBase = {
  borderRadius: "16px",
  padding: "22px",
  color: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease"
};

const hoverIn = e => (e.currentTarget.style.transform = "translateY(-6px)");
const hoverOut = e => (e.currentTarget.style.transform = "translateY(0)");

const label = { fontSize: "13px", opacity: 0.85 };
const value = { fontSize: "20px", fontWeight: "700" };

/* ================= APP ================= */

function App() {
  const [bus, setBus] = useState(null);
  const [eta, setEta] = useState(null);
  const [route, setRoute] = useState(null);
  const [status, setStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/api/bus/location`).then(r => r.json()).then(setBus);
      fetch(`${API_URL}/api/bus/eta`).then(r => r.json()).then(setEta);
      fetch(`${API_URL}/api/route`).then(r => r.json()).then(setRoute);
      fetch(`${API_URL}/api/bus/status`).then(r => r.json()).then(setStatus);
      setLastUpdated(new Date());
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const statusColor =
    status?.status === "Running"
      ? "#22c55e"
      : status?.status === "Delayed"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        {/* HEADER */}
        <div style={headerStyle}>
          <div style={titleStyle}>🚌 Public Transport Tracking Dashboard</div>
          <div style={liveBadge}>LIVE</div>
        </div>

        {/* MAIN GRID */}
        <div style={gridStyle}>

          {/* BUS CARD */}
          <div
            style={{ ...cardBase, background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <p style={label}>Bus</p>
            <p style={value}>{bus ? `Bus #${bus.busId}` : "Loading..."}</p>
            {bus && (
              <>
                <p style={label}>Latitude</p>
                <p>{bus.latitude.toFixed(6)}</p>
                <p style={label}>Longitude</p>
                <p>{bus.longitude.toFixed(6)}</p>
              </>
            )}
          </div>

          {/* STATUS CARD */}
          <div
            style={{ ...cardBase, background: "linear-gradient(135deg, #10b981, #059669)" }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <p style={label}>Bus Status</p>
            <p style={{ ...value, color: statusColor }}>
              {status ? status.status : "Checking..."}
            </p>
          </div>

          {/* ETA CARD */}
          <div
            style={{ ...cardBase, background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <p style={label}>Estimated Arrival</p>
            {eta ? (
              <>
                <p style={value}>{eta.etaMinutes} min</p>
                <p style={label}>Remaining Distance</p>
                <p>{eta.remainingDistance} km</p>
                <p style={label}>Average Speed</p>
                <p>{eta.averageSpeed} km/h</p>
              </>
            ) : (
              <p>Calculating...</p>
            )}
          </div>

        </div>

        {/* ROUTE */}
        <div
          style={{
            ...cardBase,
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            marginTop: "25px"
          }}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
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

        {/* ADMIN PANEL */}
        <div
          style={{
            ...cardBase,
            background: "linear-gradient(135deg, #ec4899, #db2777)",
            marginTop: "25px"
          }}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          <h3>🧑‍💼 Admin Panel</h3>
          <p><strong>Active Buses:</strong> 1</p>
          <p>
            <strong>System Health:</strong>{" "}
            <span style={{ color: "#22c55e" }}>Online</span>
          </p>
          {lastUpdated && (
            <p style={label}>
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <p style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "13px",
          color: "#6b7280"
        }}>
          © 2025 Real-Time Public Transport Tracking System | Minor Project
        </p>

      </div>
    </div>
  );
}

export default App;
