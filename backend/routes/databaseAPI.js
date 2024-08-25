const express = require("express");
const database = express.Router();

const {
  checkDeviceIdSensorId,
  deleteSensorData,
  getSensorReading,
  addNewDevice,
} = require("../database/databaseFunctions");

// -------------------------------- Version 01 APIs ---------------------------------------

//get stored data for ML model by sensor id and device id - working & responding
database.get("/storedData-:deviceId-:sensorId", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  if (availability.state) {
    const response = await getSensorReading(
      req.params.deviceId,
      req.params.sensorId
    );
    if (response.state) {
      return res.status(200).json({
        state: true,
        reading: response.reading,
        sensor: req.params.sensorId,
        device: req.params.deviceId,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

// ----------------------------------- Version 02 APIs ------------------------------

//delete sensor readings data by admin authorization - working & responding
database.delete("/deleteStoredData-:deviceId-:sensorId", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  if (availability.state) {
    const response = await deleteSensorData(
      req.params.deviceId,
      req.params.sensorId
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

//add new device Id into the database - working & responding
database.put("/addNewDevice-:deviceId", async (req, res) => {
  const response = await addNewDevice(req.params.deviceId, req.body.device_url);
  if (response.state) {
    return res.status(200).json({ message: response.message });
  } else {
    return res.status(404).json({ message: response.message });
  }
});

module.exports = database;
