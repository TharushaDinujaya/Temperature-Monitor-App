const express = require("express");
const database = express.Router();

// const { addDeviceSensors } = require("../database/databaseFunctions");
// // addDeviceSensors(2, 3).then((data) => {
// //   console.log(data);
// // });

database.get("/storedData-:deviceId-:sensorId", (req, res) => {
  const deviceId = req.params.deviceId;
  const sensorId = req.params.sensorId;

  //search device id and sensor id for availability
  const deviceAvailability = true;
  const sensorAvailability = true;

  // get data from the datavase if available
  if (deviceAvailability && sensorAvailability) {
    const data = { data: "data" };
    return res.status(200).send(data);
  }
  if (deviceAvailability) {
    return res.status(400).send("invalid sensor ID !");
  }
  return res.status(400).send("invalid device ID !");
});

database.delete("/storedData-:deviceId-:sensorId", (req, res) => {
  const deviceId = req.params.deviceId;
  const sensorId = req.params.sensorId;

  //search device id and sensor id for availability
  const deviceAvailability = true;
  const sensorAvailability = true;

  // delete data from the datavase if available
  if (deviceAvailability && sensorAvailability) {
    //delete data from the dabase
    return res.status(200).send("deleted stored sensor data successfully !");
  }
  if (deviceAvailability) {
    return res.status(400).send("invalid sensor ID !");
  }
  return res.status(400).send("invalid device ID !");
});

module.exports = database;
