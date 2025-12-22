import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

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
<h3>🚌 Bus Status</h3>

{status ? (
  <p>
    <strong>Status:</strong>{" "}
    {status.status === "Running" && "🟢 Running"}
    {status.status === "Delayed" && "🟡 Delayed"}
    {status.status === "Not in Service" && "🔴 Not in Service"}
  </p>
) : (
  <p>Loading bus status...</p>
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
<h3>⏱️ Last Updated</h3>

{lastUpdated ? (
  <p>{lastUpdated.toLocaleTimeString()}</p>
) : (
  <p>Updating...</p>
)}


      <p style={{ marginTop: "40px", color: "gray" }}>
        Live Tracking & ETA Demo | Minor Project
      </p>
    </div>
  );
}

export default App;
