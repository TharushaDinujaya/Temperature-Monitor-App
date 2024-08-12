#include <functions.h>

const char *updateDeviceURL = "https://backend-testing-node-lbx7.vercel.app/registerDevice";
const char *sendSensorReadingURL = "https://backend-testing-node-lbx7.vercel.app//senserData";

void updateDevice()
{
    HTTPClient http;
    // Perform POST request
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(updateDeviceURL);
        http.addHeader("Content-Type", "application/json");

        // Create the JSON object
        const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(5) + 5 * JSON_OBJECT_SIZE(2) + 200;
        DynamicJsonDocument doc(capacity);

        doc["deviceId"] = getDeviceId();
        doc["device_url"] = WiFi.localIP().toString();

        JsonArray sensors = doc.createNestedArray("sensors");

        JsonObject sensor1 = sensors.createNestedObject();
        sensor1["sensor_id"] = 1;
        sensor1["sensor_mode"] = getMode(1);

        JsonObject sensor2 = sensors.createNestedObject();
        sensor2["sensor_id"] = 2;
        sensor2["sensor_mode"] = getMode(2);

        JsonObject sensor3 = sensors.createNestedObject();
        sensor3["sensor_id"] = 3;
        sensor3["sensor_mode"] = getMode(3);

        JsonObject sensor4 = sensors.createNestedObject();
        sensor4["sensor_id"] = 4;
        sensor4["sensor_mode"] = getMode(4);

        // Convert JSON document to string
        String jsonData;
        serializeJson(doc, jsonData);

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        }
        else
        {
            Serial.println("Error on HTTP request");
        }
        http.end();
    }
}

void sendSensorReading(int sensorId, String time, float reading)
{
    // Perform POST request
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(sendSensorReadingURL);
        http.addHeader("Content-Type", "application/json");

        // Prepare JSON data
        DynamicJsonDocument doc(200);
        doc["deviceId"] = getDeviceId(); // Replace with your actual data
        doc["sensorId"] = sensorId;      // Replace with your actual data
        doc["timestamp"] = time;         // Replace with your actual timestamp
        doc["reading"] = reading;        // Replace with your actual reading

        // Convert JSON document to string
        String jsonData;
        serializeJson(doc, jsonData);

        int httpResponseCode = http.POST(jsonData);

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        }
        else
        {
            Serial.println("Error on HTTP request");
        }
        http.end();
    }
}