import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [bus, setBus] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/api/bus/location`)
        .then(res => res.json())
        .then(data => setBus(data));

      fetch(`${API_URL}/api/bus/eta`)
        .then(res => res.json())
        .then(data => setEta(data));
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚌 Real-Time Public Transport Tracking System</h1>

      <h3>Live Bus Tracking (Mock GPS)</h3>

      {bus && (
        <>
          <p><strong>Bus ID:</strong> {bus.busId}</p>
          <p><strong>Latitude:</strong> {bus.latitude.toFixed(6)}</p>
          <p><strong>Longitude:</strong> {bus.longitude.toFixed(6)}</p>
        </>
      )}

      <h3>Estimated Arrival Time (ETA)</h3>
      {eta && eta.etaMinutes ? (
  <>
    <p><strong>Remaining Distance:</strong> {eta.remainingDistance} km</p>
    <p><strong>Average Speed:</strong> {eta.averageSpeed} km/h</p>
    <p><strong>ETA:</strong> {eta.etaMinutes} minutes</p>
  </>
) : (
  <p>Calculating ETA...</p>
)}

      <p style={{ marginTop: "40px", color: "gray" }}>
        Live Tracking & ETA Demo | Minor Project
      </p>
    </div>
  );
}

export default App;
