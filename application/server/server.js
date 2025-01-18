import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5001;

// Enable CORS to allow requests from other origins
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Configure MySQL database connection
const db = mysql.createConnection({
  host: "localhost", // Replace with your database host if not local
  user: "root", // Replace with your MySQL username
  password: "root", // Replace with your MySQL password
  database: "client_server", // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log("Ошибка соединения с базой данных:", err);
  } else {
    console.log("Соединение с базой данных установлено");
  }
});

// Route to add a new user
app.post("/add-user", (req, res) => {
  const { login, password, user } = req.body;

  // Replace 'your_table_name' with your actual table name
  const sql =
    "INSERT INTO your_table_name (login, password, user) VALUES (?, ?, ?)";
  db.query(sql, [login, password, user], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Ошибка при добавлении данных");
    } else {
      res.send("Пользователь успешно добавлен");
    }
  });
});

// Start the server and listen on all network interfaces (0.0.0.0)
app.listen(port, "0.0.0.0", () => {
  console.log(`Сервер запущен и доступен на порту ${port}`);
});