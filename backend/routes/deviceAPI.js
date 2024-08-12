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
  getDeviceURL,
} = require("../database/databaseFunctions");

const { getSensorData, setSensorMode } = require("../device/deviceFunctions");

//get data from sensors - working & responding
device.get("/getSensorReading-:deviceId-:sensorId", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  if (availability.state) {
    // get device url from database
    const device_url = await getDeviceURL(req.params.deviceId);

    // get sensor data from device
    const currentSensorData = await getSensorData(
      device_url,
      req.params.sensorId
    );

    // if there any previous data on databse, then sends those data too
    const response = await getSensorReading(
      req.params.deviceId,
      req.params.sensorId
    );

    if (response.state) {
      return res.status(200).json({
        current_reading: currentSensorData,
        database: response.reading,
      });
    } else {
      return res.status(404).json({ message: response.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

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

//set sensormode form the app -- need more security add if databse failed to update - need to update here
device.put("/setSensorMode-:deviceId-:sensorId", async (req, res) => {
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  if (availability.state) {
    // get device url from database
    const device_url = await getDeviceURL(req.params.deviceId);

    // set sensor mode
    const deviceResponse = await setSensorMode(
      device_url,
      req.params.sensorId,
      req.body.mode
    );
    // if sensor mode update success, then update the database
    if (deviceResponse.state) {
      const response = await updateSensorMode(
        req.params.deviceId,
        req.params.sensorId,
        req.body.mode
      );
      if (response.state) {
        return res.status(200).json({ message: response.message });
      } else {
        return res.status(400).json({ message: response.message });
      }
    } else {
      return res.status(400).json({ message: deviceResponse.message });
    }
  } else {
    return res.status(404).json({ message: availability.message });
  }
});

//get registered sensors for the device in database - working & responding
device.get("/getDeviceDetails-:deviceId", async (req, res) => {
  const availability = await checkDeviceId(req.params.deviceId);

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
