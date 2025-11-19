const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve images from tiffins folder
app.use("/tiffins", express.static(path.join(__dirname, "tiffins")));

// Read tiffins.json and send response
app.get("/tiffins", (req, res) => {
  fs.readFile("tiffins.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading tiffins.json" });
    }
    res.json(JSON.parse(data));
  });
});

// PORT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tiffins API running on port ${PORT}`);
});
