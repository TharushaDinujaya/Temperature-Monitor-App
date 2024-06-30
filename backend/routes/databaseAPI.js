const express = require("express");
const database = express.Router();

const {
  checkDeviceIdSensorId,
  deleteSensorData,
  addSensorData,
  getSensorReading,
} = require("../database/databaseFunctions");

//get stored data for ML model by sensor id and device id
database.get("/storedData-:deviceId-:sensorId", (req, res) => {
  checkDeviceIdSensorId(req.params.deviceId, req.params.sensorId).then(
    (availability) => {
      if (availability.state) {
        getSensorReading(req.params.deviceId, req.params.sensorId).then(
          (response) => {
            if (response.state) {
              return res.status(200).json({
                reading: response.reading,
                sensor: req.params.sensorId,
                device: req.params.deviceId,
              });
            } else {
              return res.status(404).json({ message: response.message });
            }
          }
        );
      } else {
        return res.status(404).json({ message: availability.message });
      }
    }
  );
});

//delete sensor readings data by admin authorization
database.delete("/deleteStoredData-:deviceId-:sensorId", (req, res) => {
  checkDeviceIdSensorId(req.params.deviceId, req.params.sensorId).then(
    (availability) => {
      if (availability.state) {
        deleteSensorData(req.params.deviceId, req.params.sensorId).then(
          (response) => {
            if (response.state) {
              return res.status(200).json({ message: response.message });
            } else {
              return res.status(404).json({ message: response.message });
            }
          }
        );
      } else {
        return res.status(404).json({ message: availability.message });
      }
    }
  );
});

//add sensor data into the database using device id and sensor id
database.post("/addSensorData", (req, res) => {
  console.log(
    req.body.deviceId,
    req.body.sensorId,
    req.body.timestamp,
    req.body.reading
  );
  checkDeviceIdSensorId(req.body.deviceId, req.body.sensorId).then(
    (availability) => {
      if (availability.state) {
        addSensorData(
          req.body.deviceId,
          req.body.sensorId,
          req.body.timestamp,
          req.body.reading
        ).then((response) => {
          if (response.state) {
            return res.status(200).json({ message: response.message });
          } else {
            return res.status(404).json({ message: response.message });
          }
        });
      } else {
        return res.status(404).json({ message: availability.message });
      }
    }
  );
});

module.exports = database;
