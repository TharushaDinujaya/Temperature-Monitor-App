#include <Arduino.h>

#include <functions.h>
#include <constants.h>

void setup()
{
  Serial.begin(115200);
  setupWifi();
  setupServer();
  Serial.println("set server !");
  registerDevice();
  Serial.println("registered!");
  delay(500);
  sendSensorReading();
  Serial.println("send sensor data !");
}

void loop()
{
}