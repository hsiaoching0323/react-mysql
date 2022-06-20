const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'meteor0323',
  database: 'book',
  port: '3306'
});

app.post("/addbook", (req, res) => {
  const author = req.body.author;
  const bookName = req.body.bookName;
  const copy = req.body.copy;
  const price = req.body.price;

  db.query(
    "INSERT INTO book (author, bookName, copy, price) VALUES (?,?,?,?)",
    [author, bookName, copy, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/book", (req, res) => {
  db.query("SELECT * FROM book", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(3001, () => {
  console.log("your server is running on port 3001");
});