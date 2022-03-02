const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
let db;
MongoClient.connect(
  "mongodb+srv://jyj:ulsan2017!@cluster0.vqqhr.mongodb.net/todoapp?retryWrites=true&w=majority",
  (err, client) => {
    if (err) {
      console.log(err);
    }
    app.post("/add", (req, res) => {
      const { title, date } = req.body;
      res.send("전송완료");
      db = client.db("todoapp");
      db.collection("post").insertOne(
        { 날짜: date, 제목: title },
        (err, result) => {
          console.log("저장완료");
        }
      );
    });

    app.listen(3000, () => {
      console.log("server start");
    });
  }
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});
app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});
