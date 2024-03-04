const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./backend/.env" });
const mongoDB = require("../db");
mongoDB();

app.use(cors());

app.use((req, res, next) => {
  //change this header back to what you had for your frontend url
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("../Routes/CreateUser"));
app.use("/api", require("../Routes/DisplayData"));
app.use("/api", require("../Routes/OrderData"));
app.get("/", (req, res) => {
  res.send("Helo World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
