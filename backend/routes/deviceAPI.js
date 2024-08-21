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
  getMaxMin,
} = require("../database/databaseFunctions");

const { getSensorData, setSensorMode } = require("../device/deviceFunctions");

//get data from sensors - working & responding
device.get("/getSensorReading-:deviceId-:sensorId", async (req, res) => {
  console.log("Got request");
  const availability = await checkDeviceIdSensorId(
    req.params.deviceId,
    req.params.sensorId
  );
  console.log(availability);

  // get device url from database
  const max_min = await getMaxMin(req.params.deviceId, req.params.sensorId);
  const current_reading = 10;
  console.log(max_min);
  if (availability.state && max_min.state) {
    return res.status(200).json({
      state: true,
      max: max_min.max,
      min: max_min.min,
      current: current_reading,
      gauge: (current_reading / (max_min.max * 1.1)) * 100,
    });
  } else {
    return res
      .status(404)
      .json({ message: availability.message, state: false });
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

    // // set sensor mode
    // const deviceResponse = await setSensorMode(
    //   device_url,
    //   req.params.sensorId,
    //   req.body.mode
    // );

    const deviceResponse = {
      state: true,
    };

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
