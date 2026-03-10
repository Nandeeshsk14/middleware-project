import { useState } from "react";

const BASE_URL = "http://localhost:5000";

const ENDPOINTS = [
  { label: "GET /user",       method: "GET",    path: "/user" },
  { label: "GET /products",   method: "GET",    path: "/products" },
  { label: "POST /orders",    method: "POST",   path: "/orders",  body: { item: "Laptop", qty: 1 } },
  { label: "DELETE /user/42", method: "DELETE", path: "/user/42" },
];

export default function App() {
  const [logs, setLogs]       = useState([]);
  const [response, setResponse] = useState(null);

  const sendRequest = async ({ method, path, body }) => {
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body && { body: JSON.stringify(body) }),
      };

      const res  = await fetch(`${BASE_URL}${path}`, options);
      const data = await res.json();

      // Mirror the server log format in the browser
      const now  = new Date();
      const time = now.toTimeString().split(" ")[0]; // HH:MM:SS
      const logEntry = `${time} ${method} ${path}`;

      setLogs((prev) => [logEntry, ...prev]);
      setResponse(data);
    } catch (err) {
      setLogs((prev) => [`ERROR: ${err.message}`, ...prev]);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛰 Request Logger Demo</h1>

      {/* ── Buttons ── */}
      <div style={styles.buttonRow}>
        {ENDPOINTS.map((ep) => (
          <button key={ep.label} style={styles.btn} onClick={() => sendRequest(ep)}>
            {ep.label}
          </button>
        ))}
      </div>

      {/* ── Log Console ── */}
      <div style={styles.console}>
        <p style={styles.consoleTitle}>📋 Request Log (mirrors server terminal)</p>
        {logs.length === 0 && <p style={styles.empty}>No requests yet...</p>}
        {logs.map((log, i) => (
          <p key={i} style={styles.logLine}>{log}</p>
        ))}
      </div>

      {/* ── Server Response ── */}
      {response && (
        <div style={styles.response}>
          <p style={styles.consoleTitle}>📦 Server Response</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  page:         { fontFamily: "monospace", maxWidth: 700, margin: "40px auto", padding: "0 20px" },
  title:        { fontSize: 24, marginBottom: 24 },
  buttonRow:    { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 },
  btn:          { padding: "10px 16px", background: "#0f172a", color: "#7dd3fc", border: "none",
                  borderRadius: 6, cursor: "pointer", fontSize: 14 },
  console:      { background: "#0f172a", color: "#4ade80", padding: 20, borderRadius: 8, minHeight: 160 },
  consoleTitle: { color: "#94a3b8", marginBottom: 12, fontSize: 13 },
  logLine:      { margin: "4px 0", fontSize: 15 },
  empty:        { color: "#475569" },
  response:     { background: "#1e293b", color: "#e2e8f0", padding: 20, borderRadius: 8, marginTop: 20 },
};