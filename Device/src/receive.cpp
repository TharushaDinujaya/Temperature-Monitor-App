#include <functions.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

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
        StaticJsonDocument<200> doc;
        // Check if the sensorId parameter is available
        if (request->hasParam("sensorId")) {
            String sensorId = request->getParam("sensorId")->value();
            Serial.println("Sensor ID: " + sensorId);


            doc["sensorId"] = sensorId;
            // Call the appropriate function based on the sensorId
            if (sensorId == "1") {
                float temp = getTempReading();
                doc["data"] = temp;
            } else if (sensorId == "2") {
                int humidity = gethumidityReading();
                doc["data"] = humidity;
            } else if (sensorId == "3"){
                float moisture = getSoilReading();
                doc["data"] = moisture;
            } else if (sensorId == "4"){
                float pressure = getPressureData();
                doc["data"] = pressure;
            }else {
                doc["data"] = "empty";
            }
        }
        String jsonString;
        serializeJson(doc, jsonString);
        request->send(200, "application/json", jsonString); });

    // Route to set GPIO to HIGH
    server.on("/setSensorMode-:sensorId-:mode", HTTP_POST, [](AsyncWebServerRequest *request) { // Handle empty body
        bool status = false;
        if (request->hasParam("sensorId") && request->hasParam("mode"))
        {
            String sensorId = request->getParam("sensorId")->value();
            String mode = request->getParam("mode")->value();
            Serial.println("Sensor ID: " + sensorId);
            Serial.println("Sensor mode: " + mode);

            int sensor_id = sensorId.toInt();
            int sensor_mode = mode.toInt();

            status = setMode(sensor_id, sensor_mode);
        }

        // Read the request body
        String text = status ? "success !" : "falied !";

        request->send(200, "text/plain", text);
    });

    // Start server
    server.begin();
}