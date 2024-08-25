const express = require("express");
const sensor = express.Router();

const {
  checkDeviceIdSensorId,
  addSensorData,
  updateDeviceURL,
  updateAllSensorMode,
  getSensorMode,
} = require("../database/databaseFunctions");

// -------------------------- Version 01 APIs ------------------------------------

// get stored data for ML model by sensor id and device id - working & responding
sensor.post("/updateDeviceData", async (req, res) => {
  const { deviceId, device_url } = req.body;
  if (!deviceId && !device_url) {
    return res.status(400).json("deviceId and device_url is not found !");
  }
  const deviceResponse = await updateDeviceURL(
    req.body.deviceId,
    req.body.device_url
  );
  if (deviceResponse.state) {
    return res.status(200).json(deviceResponse.message);
  } else {
    return res.status(400).json(deviceResponse.message);
  }
});

//add sensor data into the database using device id and sensor id - working & responding
sensor.post("/addSensorData", async (req, res) => {
  const { deviceId, sensorId, timestamp, reading } = req.body;
  if (!deviceId && !sensorId && !timestamp && !reading) {
    return res.status(400).json("Missing parameter !");
  }

  const availability = await checkDeviceIdSensorId(deviceId, sensorId);
  if (availability.state) {
    const response = await addSensorData(
      deviceId,
      sensorId,
      timestamp,
      reading
    );
    const device = await getSensorMode(deviceId, sensorId);

    if (response.state) {
      return res
        .status(200)
        .json({ message: response.message, mode: device.mode });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

module.exports = sensor;
