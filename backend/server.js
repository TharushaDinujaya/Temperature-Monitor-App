const express = require("express");
const app = express();
const cors = require("cors");

const deviceAPI = require("./routes/deviceAPI");
const databaseAPI = require("./routes/databaseAPI");
const {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateSensorMode,
  getSensorMode,
  addDeviceSensors,
  deleteSensorData,
  addSensorData,
  getSensorReading,
  getDeviceSensors,
  addDevice,
  updateDeviceURL,
  getDeviceURL,
} = require("./database/databaseFunctions");

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/device", deviceAPI);
app.use("/data", databaseAPI);

updateDeviceURL(1, "192.168.0.100").then((response) => {
  console.log(response);
});

app.get("/", (req, res) => {
  res.status(200).send("Success !");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "invalid request" });
});

app.listen(port, () => {
  console.log("Server is running on Port :", port);
});
