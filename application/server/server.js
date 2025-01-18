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

// Example GET endpoint
app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks"; // Query to fetch all tasks from the table

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(results); // Send the results in JSON format
    }
  });
});

// POST endpoint for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  const query = "SELECT * FROM users WHERE username = ? AND password = ?"; // Query to check user credentials

  // Execute the query with the provided username and password
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).send("Server error");
    } else if (results.length > 0) {
      // User found, return user information
      const user = results[0];
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } else {
      // No matching user found
      res.status(401).send("Invalid username or password");
    }
  });
});

app.post("/login_page", (req, res) => {
  const { login, password, user } = req.body;

  // Correct table name and column names
  const query =
    "SELECT * FROM login_page WHERE login = ? AND password = ? AND user = ?";

  db.query(query, [login, password, user], (err, results) => {
    if (err) {
      console.error("Error checking login in the database:", err);
      res.status(500).send("Server error");
    } else if (results.length > 0) {
      const userData = results[0];
      res.status(200).json({
        id: userData.id,
        login: userData.login,
        user: userData.user,
        status: "Login successful",
      });
    } else {
      res.status(401).send("Invalid login, password, or user");
    }
  });
});

// Register Endpoint
app.post("/register", (req, res) => {
  const { login, password, user } = req.body;

  if (!login || !password || !user) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO login_page (login, password, user) VALUES (?, ?, ?)";

  db.query(query, [login, password, user], (err, results) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(201).json({
      id: results.insertId,
      login,
      user,
      status: "User registered successfully",
    });
  });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  // First, check if the task exists
  const checkQuery = "SELECT * FROM tasks WHERE id = ?";
  db.query(checkQuery, [taskId], (err, results) => {
    if (err) {
      console.error("Error checking task:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Task exists, proceed to delete
    const deleteQuery = "DELETE FROM tasks WHERE id = ?";
    db.query(deleteQuery, [taskId], (err, result) => {
      if (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ error: "Server error" });
      }

      res
        .status(200)
        .json({ message: "Task deleted successfully", id: taskId });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
