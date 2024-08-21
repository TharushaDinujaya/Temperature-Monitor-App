const { connectToDatabase } = require("./connectToDatabase");

let connection = false;

//check device's existance by device id - working
async function checkDeviceId(deviceId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql = "SELECT * FROM Device WHERE device_id = ?";
    const [response] = await connection.execute(sql, [deviceId]);
    if (response.length == 1) {
      outResponse = {
        state: true,
        message: "device is available",
        url: response[0].device_url,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "device is unavailable",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//check sensor existance by device id and sensor id - working
async function checkDeviceIdSensorId(deviceId, sensorId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql = "SELECT * FROM Sensor WHERE device_id = ? AND sensor_id = ?";
    const [response] = await connection.execute(sql, [deviceId, sensorId]);
    if (response.length == 1) {
      outResponse = {
        state: true,
        message: "sensor is available",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "sensor is unavailable",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//update device id by device id and new device id - working
async function updateDeviceId(currentId, newId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
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

    outResponse = {
      state: true,
      message: "updated device id successful",
      error: null,
    };
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//change sensor modes by device is, sensor id and mode - working
async function updateSensorMode(deviceId, sensorId, mode) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "UPDATE Sensor SET sensor_mode = ? WHERE sensor_id = ? AND device_id = ?;";
    const [response] = await connection.query(sql, [mode, sensorId, deviceId]);
    if (response.affectedRows == 1 && response.changedRows == 1) {
      outResponse = {
        state: true,
        message: "updated sensor mode successfully",
        error: null,
      };
    } else if (response.affectedRows == 1 && response.changedRows == 0) {
      outResponse = {
        state: false,
        message: "already in " + mode,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "sensor mode update failed",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

// get maximum sensor reading and minimum sensor reading by device id and sensor id - working
async function getMaxMin(deviceId, sensorId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql_max =
      "SELECT MAX(reading) AS max FROM tempmondb.sensordata WHERE device_id = ? AND sensor_id = ?;";
    const sql_min =
      "SELECT MIN(reading) AS min FROM tempmondb.sensordata WHERE device_id = ? AND sensor_id = ?;";
    const [max_data] = await connection.query(sql_max, [deviceId, sensorId]);
    const [min_data] = await connection.query(sql_min, [deviceId, sensorId]);

    if (max_data.length === 1 && min_data.length === 1) {
      outResponse = {
        state: true,
        message: "got max and min data successfully",
        max: max_data[0].max,
        min: min_data[0].min,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "failed to get maximum and minimum",
        max: 0,
        min: 0,
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//change all sensor modes by device id and sensor list - working
async function updateAllSensorMode(deviceId, sensors) {
  let outResponse;
  try {
    connection = await connectToDatabase();

    const update_sql =
      "UPDATE Sensor SET sensor_mode = ? WHERE sensor_id = ? AND device_id = ?;";
    const add_sql =
      "INSERT INTO Sensor (sensor_id, device_id, sensor_mode) VALUES (?, ?, ?)";
    let responseArray = [];

    for (let i = 0; i < sensors.length; i++) {
      const [response] = await connection.query(update_sql, [
        sensors[i].sensor_mode,
        sensors[i].sensor_id,
        deviceId,
      ]);
      if (response.affectedRows == 1) {
        responseArray.push({ sensor_id: sensors[i].sensor_id, state: true });
      } else {
        const addResponse = await connection.query(add_sql, [
          sensors[i].sensor_id,
          deviceId,
          sensors[i].sensor_mode,
        ]);
        if (addResponse.affectedRows == 1) {
          responseArray.push({ sensor_id: sensors[i].sensor_id, state: true });
        } else {
          responseArray.push({ sensor_id: sensors[i].sensor_id, state: false });
        }
      }
    }
    outResponse = {
      state: true,
      message: "updated sensor mode successfully",
      result: responseArray,
      error: null,
    };
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get current sensor mode by device id and sensor id - working
async function getSensorMode(deviceId, sensorId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "SELECT sensor_mode FROM Sensor WHERE sensor_id = ? AND device_id = ?";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.length == 1) {
      outResponse = {
        state: true,
        message: "sensor is available",
        mode: response[0].sensor_mode,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "sensor is unavailable",
        mode: "unable find the mode",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//add a sensor to the device by device id and sensor id - working
async function addDeviceSensors(deviceId, sensorId, mode) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "INSERT INTO Sensor (sensor_id, device_id, sensor_mode) VALUES (?, ?, ?)";
    const [response] = await connection.query(sql, [sensorId, deviceId, mode]);
    if (response.affectedRows == 1) {
      outResponse = {
        state: true,
        message: "added sensor successfully",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "failed to add the sensor",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//delete sensor reading data by device id and sensor id - working
async function deleteSensorData(deviceId, sensorId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql = "DELETE FROM SensorData WHERE sensor_id = ? AND device_id = ?;";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.affectedRows >= 1) {
      outResponse = {
        state: true,
        message: "deleted sensor data successfully",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "sensor data unavailable",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//add sensor reading by device id, sensor id, timestamp, reading value - working
async function addSensorData(deviceId, sensorId, timestamp, reading) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "INSERT INTO SensorData (sensor_id, device_id, timestamp, reading) VALUES (?, ?, ?, ?)";
    const [response] = await connection.query(sql, [
      sensorId,
      deviceId,
      timestamp,
      reading,
    ]);
    if (response.affectedRows == 1) {
      outResponse = {
        state: true,
        message: "added sensor data successfully",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "sensor data update failed",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get sensor reading by device id, sensor id - working
async function getSensorReading(deviceId, sensorId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "SELECT timestamp, reading FROM SensorData WHERE sensor_id = ? AND device_id = ?";
    const [response] = await connection.query(sql, [sensorId, deviceId]);
    if (response.length > 0) {
      outResponse = {
        state: true,
        message: "received sensor data successfully",
        reading: response,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "no sensor data in the database",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get sensors in device by device id - working
async function getDeviceSensors(deviceId) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql = "SELECT sensor_id, sensor_mode FROM Sensor WHERE device_id = ?";
    const [response] = await connection.query(sql, [deviceId]);
    if (response.length > 0) {
      outResponse = {
        state: true,
        message: "received sensors list successfully",
        sensors: response,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "no sensors registered for the device in the database",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get sensors in device by device id - working
async function addNewDevice(deviceId, device_url) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql =
      "INSERT IGNORE INTO Device (device_id, device_url) VALUES (?, ?);";
    const [response] = await connection.query(sql, [deviceId, device_url]);
    if (response.affectedRows == 1) {
      outResponse = {
        state: true,
        message: "added new device successfully",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "failed to add new device into the database",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get sensors in device by device id - working
async function updateDeviceURL(deviceId, device_url) {
  let outResponse;
  try {
    connection = await connectToDatabase();
    const sql = "UPDATE Device SET device_url = ? WHERE device_id = ?;";
    const [response] = await connection.query(sql, [device_url, deviceId]);
    if (response.affectedRows == 1) {
      outResponse = {
        state: true,
        message: "updated device url successfully",
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "failed to update device url",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
  }
}

//get sensors in device by device id - working
async function getDeviceURL(deviceId) {
  let outResponse;
  connection = await connectToDatabase();
  try {
    const sql = "SELECT device_url FROM Device WHERE device_id = ?";
    const [response] = await connection.query(sql, [deviceId]);
    if (response.length > 0) {
      outResponse = {
        state: true,
        message: "got device id successfully",
        url: response[0].device_url,
        error: null,
      };
    } else {
      outResponse = {
        state: false,
        message: "unable to find the device url",
        error: null,
      };
    }
  } catch (err) {
    outResponse = {
      state: false,
      message: "database connection failed",
      error: err,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
    return outResponse;
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
  getDeviceSensors,
  addNewDevice,
  updateDeviceURL,
  getDeviceURL,
  updateAllSensorMode,
  getMaxMin,
};
