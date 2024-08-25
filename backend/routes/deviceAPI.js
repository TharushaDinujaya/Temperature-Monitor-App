const express = require("express");
const device = express.Router();

const {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateSensorMode,
  getSensorMode,
  deleteSensorData,
  getSensorReading,
  getDeviceSensors,
  getLastSensorReading,
  getMaxMin,
} = require("../database/databaseFunctions");

// -----------------------------------Version 01 APIs -----------------------------------

//get data from sensors - working & responding
device.get("/getSensorReading-:deviceId-:sensorId", async (req, res) => {
  const { deviceId, sensorId } = req.params;
  const availability = await checkDeviceIdSensorId(deviceId, sensorId);
  if (!availability.state) {
    return res
      .status(400)
      .json({ state: false, message: availability.message });
  }

  // get device url from database
  const max_min = await getMaxMin(deviceId, sensorId);

  const current_reading = await getLastSensorReading(deviceId, sensorId);

  let symbol = "";
  if (sensorId === "1") {
    symbol = "°C";
  } else if (sensorId === "2") {
    symbol = "%";
  } else if (sensorId === "3") {
    symbol = "kPa";
  } else {
    symbol = "U";
  }
  if (availability.state && max_min.state) {
    return res.status(200).json({
      state: true,
      max: max_min.max + symbol,
      min: max_min.min + symbol,
      current: current_reading.reading + symbol,
      gauge: Math.round((current_reading.reading / (max_min.max * 1.1)) * 100),
    });
  } else {
    return res
      .status(404)
      .json({ message: availability.message, state: false });
  }
});

//set sensormode form the app -- need more security add if databse failed to update - need to update here
device.put("/setSensorMode-:deviceId-:sensorId", async (req, res) => {
  const { deviceId, sensorId } = req.params;
  const mode = req.body.mode;
  const availability = await checkDeviceIdSensorId(deviceId, sensorId);
  if (availability.state) {
    // if sensor mode update success, then update the database
    const response = await updateSensorMode(deviceId, sensorId, mode);
    if (response.state) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(400).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

// ---------------------------- Version 2 APIs -------------------------------------

//get sensormode from the database - working & responding
device.get("/getSensorMode-:deviceId-:sensorId", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  if (availability.state) {
    // get sensor mode from the database
    const response = await getSensorMode(
      req.params.deviceId,
      req.params.sensorId
    );
    if (response.state) {
      return res.status(200).json({ mode: response.mode });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

//get registered sensors for the device in database - working & responding
device.get("/getDeviceDetails-:deviceId", async (req, res) => {
  const availability = await checkDeviceId(req.params.deviceId);
  console.log(availability);
  if (availability.state) {
    // get device data from the database
    const response = await getDeviceSensors(req.params.deviceId);
    console.log(response);
    if (response.state) {
      return res.status(200).json(response.sensors);
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

//delete sensor readings data from the database - working & responding
device.delete("/deleteSensorData-:deviceId-:sensorId", async (req, res) => {
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

module.exports = device;
