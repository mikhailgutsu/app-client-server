import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "client_server",
});

db.connect((err) => {
  if (err) {
    console.log("Ошибка соединения с базой данных:", err);
  } else {
    console.log("Соединение с базой данных установлено");
  }
});

app.post("/add-user", (req, res) => {
  const { login, password, user } = req.body;

  const sql =
    "INSERT INTO your_table_name (login, password, user) VALUES (?, ?, ?)";
  db.query(sql, [login, password, user], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Ошибка при добавлении данных");
    } else {
      res.send("Пользователь успешно добавлен");
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
