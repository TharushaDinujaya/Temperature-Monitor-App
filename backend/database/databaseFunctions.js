const device = require("../routes/deviceAPI");
const { client } = require("./connectToDatabase");

//check device's existance by device id - working
async function checkDeviceId(deviceId) {
  let response;
  try {
    await client.connect();
    const sql = "SELECT * FROM Device WHERE device_id = " + deviceId + ";";
    const data = await client.query(sql); // Execute the create table query
    if (data.rows.length == 1) {
      response = {
        state: true,
        message: "device is available",
        url: data.rows[0].device_url,
      };
    } else {
      response = {
        state: false,
        message: "device is unavailable",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//check sensor existance by device id and sensor id - working
async function checkDeviceIdSensorId(deviceId, sensorId) {
  let response;
  try {
    await client.connect();
    const sql =
      "SELECT * FROM sensor WHERE device_id = " +
      deviceId +
      " AND sensor_id = " +
      sensorId +
      ";";
    const data = await client.query(sql); // Execute the create table query

    if (data.rows.length == 1) {
      const sql_get_url =
        "SELECT device_url FROM device WHERE device_id = " + deviceId + ";";
      const device_data = await client.connect(sql_get_url);
      response = {
        state: true,
        message: "sensor is available",
        url: device_data.rows[0].device_url,
      };
    } else {
      response = {
        state: false,
        message: "sensor is unavailable",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//change sensor modes by device is, sensor id and mode - working
async function updateSensorMode(deviceId, sensorId, mode) {
  let response;
  try {
    await client.connect();
    const sql =
      "UPDATE sensor SET sensor_mode = " +
      mode +
      " WHERE sensor_id = " +
      sensorId +
      " AND device_id = " +
      deviceId +
      ";";
    const data = await client.query(sql);
    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "updated sensor mode successfully",
      };
    } else {
      response = {
        state: false,
        message: "sensor mode update failed",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//get current sensor mode by device id and sensor id - working
async function getSensorMode(deviceId, sensorId) {
  let response;
  try {
    await client.connect();
    const sql =
      "SELECT sensor_mode FROM sensor WHERE sensor_id = " +
      sensorId +
      " AND device_id = " +
      deviceId +
      ";";
    const data = await client.query(sql);

    if (data.rows.length == 1) {
      response = {
        state: true,
        message: "sensor is available",
        mode: data.rows[0].sensor_mode,
      };
    } else {
      response = {
        state: false,
        message: "sensor is unavailable",
        mode: "unable find the mode",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//add a sensor to the device by device id and sensor id - working
async function addDeviceSensors(deviceId, sensorId) {
  let response;
  try {
    await client.connect();
    const sql =
      "INSERT INTO Sensor (sensor_id, device_id, sensor_mode) VALUES (" +
      sensorId +
      ", " +
      deviceId +
      ", " +
      "'normal'" +
      ")";
    const data = await client.query(sql);

    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "added sensor successfully",
      };
    } else {
      response = {
        state: false,
        message: "failed to add the sensor",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//delete sensor reading data by device id and sensor id - working
async function deleteSensorData(deviceId, sensorId) {
  let response;
  try {
    await client.connect();
    const sql =
      "DELETE FROM sensordata WHERE sensor_id = " +
      sensorId +
      " AND device_id = " +
      deviceId +
      ";";
    const data = await client.query(sql);
    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "deleted sensor data successfully",
      };
    } else {
      response = {
        state: false,
        message: "sensor data unavailable",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//add sensor reading by device id, sensor id, timestamp, reading value - working
async function addSensorData(deviceId, sensorId, timestamp, reading) {
  let response;
  try {
    await client.connect();
    const sql =
      "INSERT INTO sensordata (sensor_id, device_id, timestamp, reading) VALUES (" +
      sensorId +
      ", " +
      deviceId +
      ", " +
      timestamp +
      ", " +
      reading +
      ")";
    const data = await client.query(sql);
    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "added sensor data successfully",
      };
    } else {
      response = {
        state: false,
        message: "sensor data update failed",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//get sensor reading by device id, sensor id - working
async function getSensorReading(deviceId, sensorId) {
  let response;
  try {
    await client.connect();
    const sql =
      "SELECT timestamp, reading FROM sensordata WHERE sensor_id = " +
      sensorId +
      " AND device_id = " +
      deviceId +
      ";";
    const data = await client.query(sql);
    if (data.rows.length > 0) {
      response = {
        state: true,
        message: "received sensor data successfully",
        reading: response,
      };
    } else {
      response = {
        state: false,
        message: "no sensor data in the database",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

//get sensors in device by device id - working
async function getDeviceSensors(deviceId) {
  let response;
  try {
    await client.connect();
    const sql =
      "SELECT sensor_id FROM sensor WHERE device_id = " + deviceId + ";";
    const data = await client.query(sql);
    if (data.rows.length > 0) {
      response = {
        state: true,
        message: "received sensors list successfully",
        sensors: data.rows,
      };
    } else {
      response = {
        state: false,
        message: "no sensors registered for the device in the database",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

// add new device by device id and device url - working
async function addDevice(deviceId, device_url) {
  let response;
  try {
    await client.connect();
    const sql =
      "INSERT INTO device (device_id, device_url) VAUES (" +
      deviceId +
      "," +
      device_url +
      ");";
    const data = await client.query(sql);
    if (data.rows.length == 1) {
      response = {
        state: true,
        message: "added device successfully",
      };
    } else {
      response = {
        state: false,
        message: "failed to add device into the database",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

// update device url by device id and device url - working
async function updateDeviceURL(deviceId, device_url) {
  let response;
  try {
    await client.connect();
    const sql =
      "UPDATE device SET device_url = " +
      device_url +
      " WHERE device_id =" +
      deviceId +
      ";";
    const data = await client.query(sql);
    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "updated device url successfully",
      };
    } else {
      response = {
        state: false,
        message: "failed to update device url",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

// get device url by device id - working
async function getDeviceURL(deviceId) {
  let response;
  try {
    await client.connect();
    const sql =
      "SELECT device_url FROM device WHERE device_id = " + deviceId + ";";
    const data = await client.query(sql);
    if (data.rowCount == 1) {
      response = {
        state: true,
        message: "got device url successfully",
        url: data.rows[0],
      };
    } else {
      response = {
        state: false,
        message: "failed to get device url",
      };
    }
  } catch (err) {
    response = {
      state: false,
      message: "database connection failed",
      code: err,
    };
  } finally {
    await client.end();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response, 1000);
      })
    );
  }
}

module.exports = {
  checkDeviceId,
  checkDeviceIdSensorId,
  updateSensorMode,
  getSensorMode,
  addDeviceSensors,
  deleteSensorData,
  addSensorData,
  getSensorReading,
  getDeviceSensors,
  addDevice,
  updateDeviceURL,
  getDeviceURL,
};
