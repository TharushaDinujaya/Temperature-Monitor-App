#include <functions.h>

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Variable to store the HTTP request
String header;

// Variables to store the values of the input fields
String inputMessage = "hello";
String inputParam = "message";

void setupServer()
{
    // Route for root / web page
    server.on("/requestDeviceDetails", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    Serial.println("Requesting Device details Message Received");
    request->send_P(200, "text/plain", "Message Received"); });

    // Route to set GPIO to HIGH
    server.on("/requestSensorMode", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    Serial.println("Requesting Sensor mode Message Received");
    request->send(200, "text/plain", "Message received"); });

    server.on("/setSensorMode", HTTP_PUT, [](AsyncWebServerRequest *request)
              {
    Serial.println("Setting Sensor mode Message Received");
    request->send(200, "text/plain", "Message received"); });

    // Start server
    server.begin();
}