#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

// utils
void setupWifi();

// send
void updateDevice();

void sendSensorReading();

// receive
void setupServer();