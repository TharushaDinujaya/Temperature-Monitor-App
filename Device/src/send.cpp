#include <functions.h>

const char *updateDeviceURL = "https://backend-testing-node.vercel.app/api/v1/deviceData/updateDeviceData";
const char *sendSensorReadingURL = "https://backend-testing-node.vercel.app/api/v1/deviceData/addSensorData";

void updateDevice()
{
    if (WiFi.status() == WL_CONNECTED) // Check Wi-Fi connection
    {
        HTTPClient http;

        http.begin(updateDeviceURL);                        // Specify destination for HTTP request
        http.addHeader("Content-Type", "application/json"); // Specify content-type header

        // Prepare the JSON data to send
        String deviceId = String(getDeviceId());
        String device_url = WiFi.localIP().toString();
        String httpRequestData = "{\"deviceId\" : " + deviceId + " , \"device_url\" : \"" + device_url + "\" }";

        // Debug: Print the HTTP request data
        Serial.println("HTTP Request Data: " + httpRequestData);

        // Send HTTP POST request
        int httpResponseCode = http.POST(httpRequestData);

        // If the response code is greater than 0, the request was successful
        if (httpResponseCode > 0)
        {
            String response = http.getString(); // Get the response payload
            Serial.println("HTTP Response code: " + String(httpResponseCode));
            Serial.println("Response: " + response); // Print response payload
        }
        else
        {
            Serial.println("Error on sending POST: " + String(httpResponseCode));
        }

        http.end(); // Free resources
    }
    else
    {
        Serial.println("WiFi Disconnected");
    }
}

void sendSensorReading(int sensorId, String time, String reading)
{
    if (WiFi.status() == WL_CONNECTED) // Check Wi-Fi connection
    {
        HTTPClient http;

        http.begin(sendSensorReadingURL);                   // Specify destination for HTTP request
        http.addHeader("Content-Type", "application/json"); // Specify content-type header

        // Prepare the JSON data to send
        String deviceId = String(getDeviceId());
        String httpRequestData = "{ \"deviceId\" : " + deviceId + " , \"sensorId\" : \"" + String(sensorId) + "\" , \"timestamp\" : \"" + time + "\", \"reading\" : \"" + reading + "\"}";

        // Debug: Print the HTTP request data
        Serial.println("HTTP Request Data: " + httpRequestData);

        // Send HTTP POST request
        int httpResponseCode = http.POST(httpRequestData);

        // If the response code is greater than 0, the request was successful
        if (httpResponseCode > 0)
        {
            String response = http.getString(); // Get the response payload
            Serial.println("HTTP Response code: " + String(httpResponseCode));
            Serial.println("Response: " + response); // Print response payload

            // Parse the JSON response
            StaticJsonDocument<200> doc;
            DeserializationError error = deserializeJson(doc, response);

            if (!error)
            {
                int mode = doc["mode"]; // Extract the 'mode' value from the response
                if (getMode(sensorId) != mode)
                {
                    setMode(sensorId, mode);
                }
            }
        }
        else
        {
            Serial.println("Error on sending POST: " + String(httpResponseCode));
        }

        http.end(); // Free resources
    }
    else
    {
        Serial.println("WiFi Disconnected");
    }
}