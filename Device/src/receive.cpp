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
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    Serial.println("Message Received");
    request->send_P(200, "text/plain", "Message Received"); });

    // Route to set GPIO to HIGH
    server.on("/get", HTTP_GET, [](AsyncWebServerRequest *request)
              {
    Serial.println("Message Received");
    request->send(200, "text/plain", "Message received"); });

    // Start server
    server.begin();
}