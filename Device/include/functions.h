#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

// utils
void setupWifi();
bool setMode(int sensorId, int mode);
int getMode(int sensorId);
int getDeviceId();
float getSensorReading(int sensorid);
// send
void updateDevice();
void sendSensorReading(int sensorId, String time, float reading);

// receive
void setupServer();

// soil moisture sensor
float getSoilReading();

// temperature sensor
void initializeTempSensor();
float getTempReading();
int gethumidityReading();

// pressure sensor
void InitializeBMPSensor();
float getPressureData();
