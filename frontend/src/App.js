import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [bus, setBus] = useState(null);
  const [status, setStatus] = useState("Fetching live bus data...");

  useEffect(() => {
    const fetchBusLocation = () => {
      fetch(`${API_URL}/api/bus/location`)
        .then(res => res.json())
        .then(data => {
          setBus(data);
          setStatus("Live bus data received");
        })
        .catch(() => {
          setStatus("Unable to connect to backend");
        });
    };

    fetchBusLocation();
    const interval = setInterval(fetchBusLocation, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚌 Real-Time Public Transport Tracking System</h1>

      <h3>Live Bus Tracking (Mock GPS)</h3>
      <p><strong>Status:</strong> {status}</p>

      {bus ? (
        <div>
          <p><strong>Bus ID:</strong> {bus.busId}</p>
          <p><strong>Latitude:</strong> {bus.latitude.toFixed(6)}</p>
          <p><strong>Longitude:</strong> {bus.longitude.toFixed(6)}</p>
        </div>
      ) : (
        <p>Loading bus location...</p>
      )}

      <p style={{ marginTop: "40px", color: "gray" }}>
        Mock GPS Simulation | Minor Project
      </p>
    </div>
  );
}

export default App;
