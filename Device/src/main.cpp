#include <Arduino.h>

#include <functions.h>
#include <constants.h>

void setup()
{
  Serial.begin(115200);
  setupWifi();
  setupServer();
  Serial.println("set server !");
  delay(500);
}

void loop()
{
}