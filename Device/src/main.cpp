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

// Variables to store sensor data and device status
float temperature = 25.0; // Simulated temperature value
float humidity = 60.0;    // Simulated humidity value
bool ledStatus = false;   // Simulated LED status

// Function to handle the /api/sensor endpoint
void handleSensorAPI(AsyncWebServerRequest *request)
{
  String jsonResponse = "{";
  jsonResponse += "\"temperature\":" + String(temperature) + ",";
  jsonResponse += "\"humidity\":" + String(humidity);
  jsonResponse += "}";
  request->send(200, "application/json", jsonResponse);
}

// Function to handle the /api/status endpoint
void handleStatusAPI(AsyncWebServerRequest *request)
{
  String jsonResponse = "{";
  jsonResponse += "\"ledStatus\":" + String(ledStatus ? "true" : "false");
  jsonResponse += "}";
  request->send(200, "application/json", jsonResponse);
}

void setup()
{
  // start the Serial communication for debugging
  Serial.begin(9600);

  // setup wifi
  setupWifi();
  delay(500);

  // Define routes and handlers
  server.on("/api/sensor", HTTP_GET, handleSensorAPI);
  server.on("/api/status", HTTP_GET, handleStatusAPI);

  // Start the server
  server.begin();

  Serial.println("Server is running !");

  // initiallize sensors
  // initializeTempSensor();
  // InitializeBMPSensor();

  // Initialize NTP Client
  // timeClient.begin();

  // updateDevice();

  delay(500);
}

void loop()
{
  // Handle client requests
  // server.handleClient();
  // counter++;
  // unsigned long currentMillis = millis(); // Get the current time

  // // Check if 30 minutes have passed
  // if (currentMillis - previousMillis >= interval_30)
  // {
  //   previousMillis = currentMillis; // Update the last time function was called
  //   timeClient.update();            // Update the NTP client
  //   String time = timeClient.getFormattedTime();

  //   for (int i = 0; i < 4; i++)
  //   {
  //     int mode = getMode(i);
  //     if (mode == 2)
  //     {
  //       float reading = getSensorReading(i);
  //       sendSensorReading(i, time, reading); // -1 for invalid sensor id
  //     }
  //     else if (mode == 1 && counter == 0)
  //     {
  //       float reading = getSensorReading(i);
  //       sendSensorReading(i, time, reading); // -1 for invalid sensor id
  //     }
  //     counter = counter % 2;
  //   }
  // }
  // delay(2000);
}