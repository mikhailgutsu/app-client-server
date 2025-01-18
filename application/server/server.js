const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "client_server", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});
// Example POST endpoint
app.post("/tasks", (req, res) => {
  const { title, description, status, date } = req.body; // Extract fields from the request body
  const query =
    "INSERT INTO tasks (title, description, status, date) VALUES (?, ?, ?, ?)"; // Update query to include the new fields

  // Execute query with provided data
  db.query(query, [title, description, status, date], (err, result) => {
    if (err) {
      console.error("Error inserting task:", err);
      res.status(500).send("Server error");
    } else {
      res.status(201).send({
        id: result.insertId,
        title,
        description,
        status,
        date,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
