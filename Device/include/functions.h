#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ArduinoJson.h>

#include <ESPAsyncWebServer.h>

#include <Arduino.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

// utils
void setupWifi();
bool setMode(int sensorId, int mode);
int getMode(int sensorId);
int getDeviceId();
String getSensorReading(int sensorid);

// send
void updateDevice();
void sendSensorReading(int sensorId, String time, float reading);

// soil moisture sensor
float getSoilReading();

// temperature sensor
void initializeTempSensor();
float getTempReading();
int gethumidityReading();

// pressure sensor
void InitializeBMPSensor();
float getPressureData();
