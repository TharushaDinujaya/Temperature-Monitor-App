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
    server.on("/requestData-:sensorId", HTTP_GET, [](AsyncWebServerRequest *request)
              {
        Serial.println("Requesting Device details Message Received");
        request->send_P(200, "text/plain", "Message Received"); });

    // Route to set GPIO to HIGH
    server.on("/setSensorMode", HTTP_POST, [](AsyncWebServerRequest *request) { // Handle empty body
        if (request->hasArg("plain") == false)
        {
            request->send(400, "text/plain", "Bad Request: Body not received");
            return;
        }

        // Read the request body
        String body = request->arg("plain");
        Serial.println("Received body: " + body);

        request->send(200, "text/plain", "Message received");
    });

    // Start server
    server.begin();
}