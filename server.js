const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const FILE = "./views.json";

// Create views.json if missing
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({ views: 0 }));
}

// Increase view count
app.get("/api/view", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  data.views += 1;
  fs.writeFileSync(FILE, JSON.stringify(data));
  res.json(data);
});

// Get view count only
app.get("/api/views", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
