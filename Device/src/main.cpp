#include <functions.h>
#include <constants.h>

// 30 minutes = 1800000 milliseconds
const unsigned long interval_30 = 1800000;
unsigned long previousMillis = 0; // Stores last time function was called
int counter = 0;

// Set up the NTP Client to get time
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 19800); // NTP server, time offset (seconds), update interval

// Create a WebServer object on port 80
AsyncWebServer server(80);

// Function to handle the get sensor Reading endpoint
void handleSensorData(AsyncWebServerRequest *request)
{
  if (request->hasParam("sensorId", true))
  { // Check for 'value' parameter in the request body
    String sensorId = request->getParam("sensorId", true)->value();
    Serial.println("Received sensor: " + sensorId);

    String jsonResponse = "{";
    jsonResponse += "\"mode\":" + String(getMode(sensorId.toInt())) + ",";
    jsonResponse += "\"sensor\":" + String(sensorId) + ",";
    jsonResponse += "\"message\":" + String("success") + ",";
    jsonResponse += "\"reading\":" + getSensorReading(sensorId.toInt());
    jsonResponse += "}";

    // Process the value as needed
    request->send(200, "application/json", jsonResponse);
  }
  else
  {
    request->send(400, "application/json", "{\"message\":\"Bad Request - Missing sensorId \"}");
  }
}

// Function to handle the setMode endpoint
void handleSensorMode(AsyncWebServerRequest *request)
{
  if (request->hasParam("sensorId", true) & request->hasParam("mode", true))
  { // Check for 'value' parameter in the request body
    String sensorId = request->getParam("sensorId", true)->value();
    String mode = request->getParam("mode", true)->value();
    Serial.println("Received sensor: " + sensorId);
    Serial.println("Received mode: " + mode);

    String jsonResponse = "{";
    jsonResponse += "\"mode\":" + String(mode) + ",";
    jsonResponse += "\"sensor\":" + String(sensorId) + ",";
    jsonResponse += "\"message\":" + String(setMode(sensorId.toInt(), mode.toInt()) ? "success" : "failed") + ",";
    jsonResponse += "}";

    // Process the value as needed
    request->send(200, "application/json", jsonResponse);
  }
  else
  {
    request->send(400, "application/json", "{\"message\":\"Bad Request - Missing 'value' parameter\"}");
  }
}

void setup()
{
  // start the Serial communication for debugging
  Serial.begin(9600);

  // setup wifi
  setupWifi();
  delay(500);

  // Define routes and handlers
  server.on("/api/sensorReading", HTTP_GET, handleSensorData);
  server.on("/api/setMode", HTTP_PUT, handleSensorMode);

  // Start the server
  server.begin();

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
        sendSensorReading(i, time, getSensorReading(i)); // -1 for invalid sensor id
      }
      else if (mode == 1 && counter == 0)
      {
        sendSensorReading(i, time, getSensorReading(i)); // -1 for invalid sensor id
      }
      counter = counter % 2;
    }
  }
  delay(2000);
}