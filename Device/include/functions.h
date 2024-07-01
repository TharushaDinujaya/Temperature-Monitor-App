#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// utils
void setupWifi();

// Serial.end();
void registerDevice();

void sendSensorReading();

void setupServer();