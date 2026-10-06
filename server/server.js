const express = require("express");
const cors = require("cors");
const path = require("path");
const { getAIInsights, askInventoryAssistant } = require("./ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "online", service: "GlowStock AI" });
});

app.get("/api/ai/insights", (req, res) => {
  res.json(getAIInsights());
});

app.post("/api/ai/assistant", (req, res) => {
  const question = String(req.body.question || "").trim();
  res.json({ answer: askInventoryAssistant(question) });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`GlowStock AI running at http://localhost:${PORT}`);
});
