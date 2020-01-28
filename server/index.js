const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log(`Server running on port 3000`));
