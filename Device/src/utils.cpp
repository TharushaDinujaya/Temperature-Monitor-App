#include <functions.h>

const char *SSID = "Galaxy";
const char *PASSWORD = "HelloWorld";

int sensors[4] = {0, 0, 0, 0};
/*
Sensor
 1 - Temperature
 2 - Humidity
 3 - Pressure
 4 - Soil Moisture

Mode
 0 - Normal - on request
 1 - auto send - every one hour
 2 - fast send - every 30 minutes
*/

int deviceId = 10;

bool setMode(int sensorId, int mode)
{
    if (sensorId < 1 || sensorId > 4 || mode > 2 || mode < 0)
    {
        return false;
    }
    sensors[sensorId] = mode;
    return true;
}

int getMode(int sensorId)
{
    if (sensorId < 1 || sensorId > 4)
    {
        return -1;
    }
    return sensors[sensorId];
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

float getSensorReading(int sensorId)
{
    if (sensorId == 1)
    {
        return getTempReading();
    }
    else if (sensorId == 2)
    {
        return gethumidityReading();
    }
    else if (sensorId == 3)
    {
        return getPressureData();
    }
    else if (sensorId == 4)
    {
        return getSoilReading();
    }
    else
    {
        return -1;
    }
}