const axios = require("axios");

async function getSensorData(device_url, sensorId) {
  try {
    const response = await axios.get(
      "https://" + device_url + "/requestData-" + sensorId
    );
    return res.json(response.data);
  } catch (error) {
    return null;
  }
}

async function setSensorMode(device_url, sensorId, mode) {
  try {
    const data = {
      sensor_id: sensorId,
      sensor_mode: mode,
    };
    const response = await axios.post(
      "https://" + device_url + "/setSensorMode",
      data
    );

    if (res.json(response.data).state) {
      return { state: true, message: "chnaged the sensor mode successfully" };
    } else {
      return { state: false, message: "failed to change the device mode" };
    }
  } catch (error) {
    return { state: false, message: "failed to change the device mode" };
  }
}

module.exports = {
  getSensorData,
  setSensorMode,
};
