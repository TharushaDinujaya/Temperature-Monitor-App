#include <functions.h>

const char *registerDeviceServer = "https://backend-testing-node-lbx7.vercel.app/home";
const char *sendSensorReadingServer = "https://backend-testing-node-lbx7.vercel.app/home";

void registerDevice()
{
    HTTPClient http;
    // Perform POST request
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(registerDeviceServer);
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"key1\":\"value1\", \"key2\":\"value2\"}";
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

void sendSensorReading()
{
    // Perform POST request
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;
        http.begin(sendSensorReadingServer);
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"key1\":\"value1\", \"key2\":\"value2\"}";
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