const express = require("express");
const sensor = express.Router();

const {
  checkDeviceIdSensorId,
  addSensorData,
  updateDeviceURL,
  updateAllSensorMode,
} = require("../database/databaseFunctions");

//get stored data for ML model by sensor id and device id - working & responding
sensor.post("/updateDeviceData", async (req, res) => {
  const deviceResponse = await updateDeviceURL(
    req.body.deviceId,
    req.body.device_url
  );
  if (deviceResponse.state) {
    const sensorResponse = await updateAllSensorMode(
      req.body.deviceId,
      req.body.sensors
    );
    if (sensorResponse.state) {
      return res.status(200).json(sensorResponse);
    } else {
      return res.status(400).json(sensorResponse.message);
    }
  } else {
    return res.status(400).json(deviceResponse.message);
  }
});

//add sensor data into the database using device id and sensor id - working & responding
sensor.post("/addSensorData", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.body.deviceId,
    req.body.sensorId
  );
  if (availability.state) {
    const response = await addSensorData(
      req.body.deviceId,
      req.body.sensorId,
      req.body.timestamp,
      req.body.reading
    );
    if (response.state) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

module.exports = sensor;
