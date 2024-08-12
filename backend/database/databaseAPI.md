---

function : checkDeviceId
params : deviceId
return : { state, message, /code }
state: true
message: "device is available"
responses types:
{
    state: false
    message: "device is unavailable"
}

{
    state: false
    message: "database connection failed"
    code: err.code
}


function : checkDeviceIdSensorId
params : deviceId, sensorId
return : { state, message, /code }
responses types:
{state: true
message: "sensor is available"}

{
state: false
message: "sensor is unavailable"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : updateDeviceId
params : currentId, newId
return : { state, message, /code }
responses types:
{
state: true
message: "updated device id successful"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : updateSensorMode
params : deviceId, sensorId, mode
return : { state, message, /code }
responses types:
{
state: true
message: "updated sensor mode successfully"
}

{
state: false
message: "sensor mode update failed"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : getSensorMode
params : deviceId, sensorId
return : { state, message, mode, /code}
responses types:
{
state: true
message: "sensor is available"
mode: response[0].sensor_mode
}

{
state: false
message: "sensor is unavailable"
mode: "unable find the mode"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : addDeviceSensors
params : deviceId, sensorId
return : { state, message, /code}
responses types:
{
state: true
message: "added sensor successfully"
}

{
state: false
message: "failed to add the sensor"
}

{
state: false
message: "sensor is added already"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : deleteSensorData
params : deviceId, sensorId
return : { state, message, /code }
responses types:
{
state: true
message: "deleted sensor data successfully"
}

{
state: false
message: "sensor data unavailable"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : addSensorData
params : deviceId, sensorId, timestamp, reading
return : { state, message, /code }
responses types:
{
state: true
message: "added sensor data successfully"
}

{
state: false
message: "sensor data update failed"
}

{
state: false
message: "same sensor data already in the database"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : getSensorReading
params : deviceId, sensorId
return : { state, message, /reading, /code }
responses types:
{
state: true
message: "received sensor data successfully",
reading: response
}

{
state: false
message: "no sensor data in the database"
}

{
state: false
message: "database connection failed"
code: err.code
}


function : getDeviceSensors
params : deviceId
return : { state, message, /sensors, /code }
responses types:
{
state: true
message: "received sensors list successfully"
sensors: response
}

{
state: false
message: "no sensors registered for the device in the database"
}

{
state: false
message: "database connection failed"
code: err.code
}

---
