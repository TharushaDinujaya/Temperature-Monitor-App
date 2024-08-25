#include <functions.h>

const char *SSID = "Your SSID";
const char *PASSWORD = "Your Password";

int sensors[4] = {0, 0, 0, 0};
/*
Sensor
 1 - Temperature
 2 - Humidity
 3 - Pressure
 4 - Soil Moisture

Mode
 0 - Normal - every 2 hours
 1 - auto send - every one hour
 2 - fast send - every 30 minutes
*/

int deviceId = 1;
float sensorData[4] = {0, 0, 0, 0};

bool setMode(int sensorId, int mode)
{
    if (sensorId < 1 || sensorId > 4 || mode > 2 || mode < 0)
    {
        return false;
    }
    sensors[sensorId - 1] = mode;
    Serial.println("Updated the Sensor Mode !");
    return true;
}

int getMode(int sensorId)
{
    if (sensorId < 1 || sensorId > 4)
    {
        return -1;
    }
    return sensors[sensorId - 1];
}

void setupWifi()
{
    // Connect to Wi-Fi network with SSID and password
    Serial.print("Connecting to ");
    Serial.println(SSID);
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

int getDeviceId()
{
    return deviceId;
}

void UpdateSensorReading()
{
    sensorData[0] = getTempReading();
    sensorData[1] = gethumidityReading();
    sensorData[2] = getPressureData();
    sensorData[3] = getSoilReading();
}

String getSensorReading(int sensorId)
{
    // Serial.println(sensorData[0]);
    // Serial.println(sensorData[1]);
    // Serial.println(sensorData[2]);
    // Serial.println(sensorData[3]);
    return String(sensorData[sensorId]);
}