#include <Arduino.h>

#include <functions.h>
#include <constants.h>

void setup()
{
  Serial.begin(115200);
  setupWifi();
  setupServer();
}

void loop()
{
}