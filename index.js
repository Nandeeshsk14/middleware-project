const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");

const app = express();
const PORT = 5000;

// ─── Apply Middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger); // 👈 Attach logger to ALL routes

// ─── Routes ────────────────────────────────────────────────
app.get("/user", (req, res) => {
  res.json({ id: 1, name: "Alice", role: "Admin" });
});

app.get("/products", (req, res) => {
  res.json([{ id: 1, name: "Laptop" }, { id: 2, name: "Phone" }]);
});

app.post("/orders", (req, res) => {
  res.status(201).json({ message: "Order created", data: req.body });
});

app.delete("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});