// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());

app.use(cors());
app.use(bodyParser.json());

let entries = [
  // Suas entradas iniciais podem ser definidas aqui
];

app.get("/api/entries", (req, res) => {
  res.json(entries);
});

app.post("/api/entries", (req, res) => {
  const newEntry = req.body;
  newEntry.id = entries.length + 1;
  entries.push(newEntry);
  res.json(newEntry);
});

app.put("/api/entries/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEntry = req.body;
  entries = entries.map((entry) => (entry.id === id ? updatedEntry : entry));
  res.json(updatedEntry);
});

app.delete("/api/entries/:id", (req, res) => {
  const id = parseInt(req.params.id);
  entries = entries.filter((entry) => entry.id !== id);
  res.json({ message: "Entry deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
