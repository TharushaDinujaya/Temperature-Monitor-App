#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <DHT22.h>
#include <BMx280I2C.h>
#include <Wire.h>
#include <time.h>
#include <ArduinoJson.h>

#include <Arduino.h>

// utils
void setupWifi();
bool setMode(int sensorId, int mode);
int getMode(int sensorId);
int getDeviceId();
void UpdateSensorReading();
String getSensorReading(int sensorId);
// send
void updateDevice();
void sendSensorReading(int sensorId, String time, String reading);

// soil moisture sensor
float getSoilReading();

// temperature sensor
void initializeTempSensor();
float getTempReading();
float gethumidityReading();

// pressure sensor
void InitializeBMPSensor();
float getPressureData();
