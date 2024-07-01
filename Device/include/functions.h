#include <HTTPClient.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// utils
void setupWifi();

// send
void registerDevice();

void sendSensorReading();

// receive
void setupServer();