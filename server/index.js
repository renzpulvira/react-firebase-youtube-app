const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const videoRouter = require("./routes/video-router");

app.use(cors());
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use("/api", videoRouter);

app.listen(3000, () => console.log(`Server running on port 3000`));
