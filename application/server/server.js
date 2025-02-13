//<----------------------------------   Express-preset
const express = require("express");

//<----------------------------------   Permissions
const cors = require("cors");

//<----------------------------------   OpenServer
const mysql = require("mysql");

//<----------------------------------   reqConfig
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

//<----------------------------------   Database
const db = mysql.createConnection({
  /*
    LocalHost - host
  */
  host: "localhost",
  /*
    myPhpAdmin - login
  */
  user: "root",
  /*
    myPhpAdmin - password
  */
  password: "root",
  /*
    myPhpAdmin - DB-table(collapse)
  */
  database: "client_server",
});

//<----------------------------------   Init()
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

/////////////////////////////////////////////////////////////
//           ENDPOINTs
/////////////////////////////////////////////////////////////
app.post("/tasks", (req, res) => {
  const { title, description, status, date } = req.body;

  const query =
    "INSERT INTO tasks (title, description, status, date) VALUES (?, ?, ?, ?)";

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

app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).send("Server error");
    } else if (results.length > 0) {
      const user = results[0];
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});

app.post("/login_page", (req, res) => {
  const { login, password, user } = req.body;

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

  const checkQuery = "SELECT * FROM tasks WHERE id = ?";
  db.query(checkQuery, [taskId], (err, results) => {
    if (err) {
      console.error("Error checking task:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

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

//<----------------------------------   UPDATE task status
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  const updateQuery = "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(updateQuery, [status, taskId], (err, result) => {
    if (err) {
      console.error("Error updating task status:", err);
      return res.status(500).send("Server error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Task not found");
    }

    res.status(200).json({ message: "Task status updated successfully" });
  });
});

//<----------------------------------------------  ServerRunning
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
