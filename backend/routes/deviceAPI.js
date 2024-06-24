const express = require("express");
const device = express.Router();

const {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateDeviceId,
  updateSensorMode,
  getSensorMode,
  addDeviceSensors,
  deleteSensorData,
  addSensorData,
  getSensorReading,
} = require("../database/databaseFunctions");

const test = require("../database/databaseFunctions");

//get data from websocket

//get data from sensors
device.get("/getSensorReading-:deviceId-:sensorId", (req, res) => {
  const deviceId = req.params.deviceId;
  const sensorId = req.params.sensorId;

  //search device id and sensor id for availability
  const deviceAvailability = true;
  const sensorAvailability = true;

  // get sensor reading from sensors if available
  if (deviceAvailability && sensorAvailability) {
    const reading = { reading: "test" };
    return res.status(200).send(reading);
  }
  if (deviceAvailability) {
    return res.status(400).send("invalid sensor ID !");
  }
  return res.status(400).send("invalid device ID !");
});

//get sensormode from the app
device.get("/getSensorMode-:deviceId-:sensorId", (req, res) => {
  const deviceId = req.params.deviceId;
  const sensorId = req.params.sensorId;

  //search device id and sensor id for availability
  const deviceAvailability = true;
  const sensorAvailability = true;

  // get sensor mode if available
  if (deviceAvailability && sensorAvailability) {
    const mode = { mode: "normal" };
    return res.status(200).send(mode);
  }
  if (deviceAvailability) {
    return res.status(400).send("invalid sensor ID !");
  }
  return res.status(400).send("invalid device ID !");
});

//set sensormode form the app
device.put("/setSensorMode-:deviceId-:sensorId", (req, res) => {
  const deviceId = req.params.deviceId;
  const sensorId = req.params.sensorId;

  //search device id and sensor id for availability
  const deviceAvailability = true;
  const sensorAvailability = true;

  // set sensor mode if available
  if (deviceAvailability && sensorAvailability) {
    //set device mode and get the response
    return res.status(200).send("success !");
  }
  if (deviceAvailability) {
    return res.status(400).send("invalid sensor ID !");
  }
  return res.status(400).send("invalid device ID !");
});

device.get("/getDeviceDetails-:deviceId", (req, res) => {
  const deviceId = req.params.deviceId;

  //search device id for availability
  const deviceAvailability = true;

  // get device details if available
  if (deviceAvailability) {
    //set device mode and get the response
    const details = {
      deviceID: "d001",
      sensorID: {
        S_1: true,
        S_2: true,
        S_3: true,
        S_4: true,
      },
    };
    //update the database for device data
    return res.status(200).send(details);
  }
  return res.status(400).send("invalid device ID !");
});

device.put("/setDeviceId-:device:Id", (req, res) => {
  const deviceId = req.params.deviceId;

  //search device id for availability
  const deviceAvailability = true;

  // set device ID if available
  if (deviceAvailability) {
    //set device ID and get the response

    // update the database for device ID

    return res.status(200).send("Device ID updated Successfully !");
  }
  return res.status(400).send("invalid device ID !");
});

module.exports = device;
