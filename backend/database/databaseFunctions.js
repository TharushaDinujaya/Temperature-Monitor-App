const { connectToDatabase } = require("./connectToDatabase");

//check device's existance by device id - working
async function checkDeviceId(deviceId) {
  try {
    connection = await connectToDatabase();
    const sql = "SELECT * FROM Device WHERE device_id = ?";
    const [response] = await connection.execute(sql, [deviceId]);
    if (response.length == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "device is available",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "device is unavailable",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//check sensor existance by device id and sensor id - working
async function checkDeviceIdSensorId(deviceId, sensorId) {
  try {
    connection = await connectToDatabase();
    const sql = "SELECT * FROM sensor WHERE device_id = ? AND sensor_id = ?";
    const [response] = await connection.execute(sql, [deviceId, sensorId]);
    if (response.length == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "sensor is available",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor is unavailable",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//update device id by device id and new device id - working
async function updateDeviceId(currentId, newId) {
  connection = await connectToDatabase();
  try {
    const sqlRemoveFKSensor =
      "ALTER TABLE Sensor DROP FOREIGN KEY Sensor_ibfk_1;";
    const sqlRemoveFKSensorData =
      "ALTER TABLE SensorData DROP FOREIGN KEY SensorData_ibfk_1;";

    const sqlUpdate = "UPDATE Device SET device_id = ? WHERE device_id = ?;";

    const sqlAddFKSensor =
      "ALTER TABLE Sensor ADD CONSTRAINT Sensor_ibfk_1 FOREIGN KEY (device_id) REFERENCES Device(device_id);";
    const sqlAddFKSensorData =
      "ALTER TABLE SensorData ADD CONSTRAINT SensorData_ibfk_1 FOREIGN KEY (sensor_id, device_id) REFERENCES Sensor(sensor_id, device_id);";

    await connection.execute(sqlRemoveFKSensor, []);
    await connection.execute(sqlRemoveFKSensorData, []);
    await connection.execute(sqlUpdate, [newId, currentId]);
    await connection.execute(sqlAddFKSensor, []);
    await connection.execute(sqlAddFKSensorData, []);

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: true,
            message: "updated device id successful",
          },
          1000
        );
      })
    );
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//change sensor modes by device is, sensor id and mode - working
async function updateSensorMode(deviceId, sensorId, mode) {
  connection = await connectToDatabase();
  try {
    const sql =
      "UPDATE sensor SET sensor_mode = ? WHERE sensor_id = ? AND device_id = ?;";
    const [response] = await connection.query(sql, [mode, sensorId, deviceId]);
    if (response.affectedRows == 1 && response.changedRows == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "updated sensor mode successfully",
            },
            1000
          );
        })
      );
    } else if (response.affectedRows == 1 && response.changedRows == 0) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "already in " + mode,
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor mode update failed",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//get current sensor mode by device id and sensor id - working
async function getSensorMode(deviceId, sensorId) {
  connection = await connectToDatabase(deviceId, sensorId);
  try {
    const sql =
      "SELECT sensor_mode FROM sensor WHERE sensor_id = ? AND device_id = ?";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.length == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "sensor is available",
              mode: response[0].sensor_mode,
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor is unavailable",
              mode: "unable find the mode",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//add a sensor to the device by device id and sensor id - working
async function addDeviceSensors(deviceId, sensorId) {
  connection = await connectToDatabase();
  try {
    const sql =
      "INSERT INTO Sensor (sensor_id, device_id, sensor_mode) VALUES (?, ?, ?)";
    const [response] = await connection.query(sql, [
      sensorId,
      deviceId,
      "normal",
    ]);
    if (response.affectedRows == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "added sensor successfully",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "failed to add the sensor",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor is added already",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "database connection failed",
              code: err.code,
            },
            1000
          );
        })
      );
    }
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//delete sensor reading data by device id and sensor id - working
async function deleteSensorData(deviceId, sensorId) {
  connection = await connectToDatabase();
  try {
    const sql = "DELETE FROM sensordata WHERE sensor_id = ? AND device_id = ?;";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.affectedRows == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "deleted sensor data successfully",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor data unavailable",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//add sensor reading by device id, sensor id, timestamp, reading value - working
async function addSensorData(deviceId, sensorId, timestamp, reading) {
  connection = await connectToDatabase();
  try {
    const sql =
      "INSERT INTO sensordata (sensor_id, device_id, timestamp, reading) VALUES (?, ?, ?, ?)";
    const [response] = await connection.query(sql, [
      sensorId,
      deviceId,
      timestamp,
      reading,
    ]);
    if (response.affectedRows == 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "added sensor data successfully",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "sensor data update failed",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "same sensor data already in the database",
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "database connection failed",
              code: err.code,
            },
            1000
          );
        })
      );
    }
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

//get sensor reading by device id, sensor id - working
async function getSensorReading(deviceId, sensorId) {
  connection = await connectToDatabase();
  try {
    const sql =
      "SELECT timestamp, reading FROM sensordata WHERE sensor_id = ? AND device_id = ?";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.affectedRows != 1) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: true,
              message: "received sensor data successfully",
              reading: response,
            },
            1000
          );
        })
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            {
              state: false,
              message: "no sensor data received",
            },
            1000
          );
        })
      );
    }
  } catch (err) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          {
            state: false,
            message: "database connection failed",
            code: err.code,
          },
          1000
        );
      })
    );
  } finally {
    if (connection) {
      await connection.end();
      // console.log("Connection closed.");
    }
  }
}

module.exports = {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateDeviceId,
  updateSensorMode,
  getSensorMode,
  addDeviceSensors,
  deleteSensorData,
  addSensorData,
  getSensorReading,
};
