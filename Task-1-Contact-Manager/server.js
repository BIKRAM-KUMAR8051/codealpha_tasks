const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let contacts = [];
let nextId = 1;

// Home route
app.get("/", (req, res) => {
  res.send("Contact Management System API is running!");
});

// Get all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Add contact
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const contact = {
    id: nextId++,
    name,
    email,
    phone
  };

  contacts.push(contact);
  res.status(201).json(contact);
});

// Update contact
app.put("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return res.status(404).json({
      message: "Contact not found"
    });
  }

  Object.assign(contact, req.body);
  res.json(contact);
});

// Delete contact
app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(c => c.id !== id);

  res.json({ message: "Contact deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
