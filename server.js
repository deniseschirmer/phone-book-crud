const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let entries = [
  {
    id: 1,
    firstName: "Eric",
    lastName: "Elliot",
    phoneNumber: "123-456-7890",
  },
  {
    id: 2,
    firstName: "Steve",
    lastName: "Jobs",
    phoneNumber: "987-654-3210",
  },
  {
    id: 3,
    firstName: "Fred",
    lastName: "Allen",
    phoneNumber: "555-123-4567",
  },
  {
    id: 4,
    firstName: "Steve",
    lastName: "Wozniak",
    phoneNumber: "888-999-0000",
  },
  {
    id: 5,
    firstName: "Bill",
    lastName: "Gates",
    phoneNumber: "777-888-9999",
  },
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
