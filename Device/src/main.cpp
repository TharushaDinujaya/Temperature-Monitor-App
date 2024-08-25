#include <functions.h>

#define OFFSET 19800

// 30 minutes = 1800000 milliseconds
int counter = 0;
unsigned long previousMillis = 0;       // Stores last time the task was run
const unsigned long interval = 1800000; // 30 minutes in milliseconds (30 * 60 * 1000)

const long gmtOffset_sec = 19800; // GMT offset for Sri Lanka is +5:30 hours (5 * 3600 + 30 * 60 = 19800 seconds)
const int daylightOffset_sec = 0; // No daylight saving time in Sri Lanka

void setup()
{
  // start the Serial communication for debugging
  Serial.begin(9600);

  // setup wifi
  setupWifi();
  delay(500);

  // initiallize sensors
  initializeTempSensor();
  InitializeBMPSensor();

  // Initialize and get the time from the NTP server
  configTime(gmtOffset_sec, daylightOffset_sec, "pool.ntp.org", "time.nist.gov");

  updateDevice();
  delay(500);
}

void loop()
{
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval)
  {
    Serial.println("Adding Sensor Data ....");
    String time = "January 01 2024 00:00:00";
    previousMillis = currentMillis;
    counter++;
    UpdateSensorReading();

    // Wait for time to be set
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
      Serial.println("Failed to obtain time");
    }
    else
    {
      // Format the time as a string
      char timeString[64];
      strftime(timeString, sizeof(timeString), "%B %d %Y %H:%M:%S", &timeinfo);
      time = String(timeString);
    }

    // send sensor data into backend
    for (int i = 0; i < 4; i++)
    {
      // 1 - temp, 2 - humidity, 3 - pressure, 4 - soil moisture
      int mode = getMode(i + 1);
      Serial.println("Sensor : " + String(i + 1) + " - Mode : " + String(mode));
      if (mode == 2)
      {
        sendSensorReading(i + 1, time, getSensorReading(i)); // -1 for invalid sensor id
      }
      else if (mode == 1 && (counter % 2 == 1))
      {
        sendSensorReading(i + 1, time, getSensorReading(i)); // -1 for invalid sensor id
      }
      else if (mode == 0 && counter == 3)
      {
        sendSensorReading(i + 1, time, getSensorReading(i)); // -1 for invalid sensor id
      }
    }
    counter = counter % 4;
  }
  delay(2000);
}