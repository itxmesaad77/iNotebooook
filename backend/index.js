const connectToMongo = require("./db");
const path = require("path");

var cors = require("cors");
const express = require("express");
connectToMongo();
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Sadi!");
});
//accessing the static files
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
// Available Routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
