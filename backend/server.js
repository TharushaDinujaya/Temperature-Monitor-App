const express = require("express");
const app = express();
const cors = require("cors");

const deviceAPI = require("./routes/deviceAPI");
const databaseAPI = require("./routes/databaseAPI");
const sensorAPI = require("./routes/sensorAPI");

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/device", deviceAPI);
app.use("/api/v1/data", databaseAPI);
app.use("/api/v1/deviceData", sensorAPI);

app.all("*", (req, res) => {
  res.status(404).json({ message: "invalid request" });
});

app.listen(port, () => {
  console.log("Server is running on Port :", port);
});
