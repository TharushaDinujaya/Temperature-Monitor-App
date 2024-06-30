const express = require("express");
const device = express.Router();

const {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateDeviceId,
  updateSensorMode,
  getSensorMode,
  deleteSensorData,
  getSensorReading,
  getDeviceSensors,
} = require("../database/databaseFunctions");

//get data from sensors
device.get("/getSensorReading-:deviceId-:sensorId", (req, res) => {
  checkDeviceIdSensorId(req.params.deviceId, req.params.sensorId).then(
    (availability) => {
      if (availability.state) {
        // get data from device

        // if there any previous data on databse, then sends those data too
        getSensorReading(req.params.deviceId, req.params.sensorId).then(
          (response) => {
            if (response.state) {
              return res.status(200).json(response.reading);
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

//get sensormode from the app
device.get("/getSensorMode-:deviceId-:sensorId", (req, res) => {
  checkDeviceIdSensorId(req.params.deviceId, req.params.sensorId).then(
    (availability) => {
      if (availability.state) {
        // get sensor mode from the device
        // getSensorMode(req.params.deviceId, req.params.sensorId).then(
        //   (response) => {
        //     if (response.state) {
        //       return res.status(200).json({ mode: response.mode });
        //     } else {
        //       return res.status(404).json({ message: response.message });
        //     }
        //   }
        // );
      } else {
        return res.status(404).json({ message: availability.message });
      }
    }
  );
});

//set sensormode form the app
device.put("/setSensorMode-:deviceId-:sensorId", (req, res) => {
  checkDeviceIdSensorId(req.params.deviceId, req.params.sensorId).then(
    (availability) => {
      if (availability.state) {
        // set device mode by calling API

        // if sensor mode update success, then update the database
        updateSensorMode(
          req.params.deviceId,
          req.params.sensorId,
          req.body.mode
        ).then((response) => {
          if (response.state) {
            return res.status(200).json({ message: response.message });
          } else {
            return res.status(400).json({ message: response.message });
          }
        });
      } else {
        return res.status(404).json({ message: availability.message });
      }
    }
  );
});

//get registered sensors for the device in database
device.get("/getDeviceDetails-:deviceId", (req, res) => {
  checkDeviceId(req.params.deviceId).then((availability) => {
    if (availability.state) {
      // get device data from the database
      getDeviceSensors(req.params.deviceId).then((response) => {
        if (response.state) {
          return res.status(200).json(response.sensors);
        } else {
          return res.status(404).json({ message: response.message });
        }
      });
    } else {
      return res.status(404).json({ message: availability.message });
    }
  });
});

//change device id
// device.put("/setDeviceId-:deviceId", (req, res) => {
//   checkDeviceId(req.params.deviceId).then((availability) => {
//     if (availability.state) {
//       updateDeviceId(req.params.deviceId, req.body.deviceId).then(
//         (response) => {
//           console.log(response);
//           if (response.state) {
//             return res.status(200).json({ message: response.message });
//           } else {
//             return res.status(400).json({ message: response.message });
//           }
//         }
//       );
//     } else {
//       return res.status(404).json({ message: availability.message });
//     }
//   });
// });

//delete sensor readings data from the database
device.delete("/deleteSensorData-:deviceId-:sensorId", (req, res) => {
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

// register a new device
device.post("/registerDevice", (req, res) => {
  console.log("Message recieved !");
  return res.status(200).send({ message: "Success !" });
});
module.exports = device;
