#include <Arduino.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#include <functions.h>
#include <constants.h>

// 30 minutes = 1800000 milliseconds
const unsigned long interval_30 = 1800000;
unsigned long previousMillis = 0; // Stores last time function was called
int counter = 0;

// Set up the NTP Client to get time
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 19800); // NTP server, time offset (seconds), update interval

void setup()
{
  // start the Serial communication for debugging
  Serial.begin(9600);

  // setup wifi
  setupWifi();

  // setup request APIs
  setupServer();
  Serial.println("Server is running !");

  // initiallize sensors
  initializeTempSensor();
  InitializeBMPSensor();

  // Initialize NTP Client
  timeClient.begin();

  updateDevice();

  delay(500);
}

void loop()
{
  counter++;
  unsigned long currentMillis = millis(); // Get the current time

  // Check if 30 minutes have passed
  if (currentMillis - previousMillis >= interval_30)
  {
    previousMillis = currentMillis; // Update the last time function was called
    timeClient.update();            // Update the NTP client
    String time = timeClient.getFormattedTime();

    for (int i = 0; i < 4; i++)
    {
      int mode = getMode(i);
      if (mode == 2)
      {
        float reading = getSensorReading(i);
        sendSensorReading(i, time, reading); // -1 for invalid sensor id
      }
      else if (mode == 1 && counter == 0)
      {
        float reading = getSensorReading(i);
        sendSensorReading(i, time, reading); // -1 for invalid sensor id
      }
      counter = counter % 2;
    }
  }
}