#include <functions.h>

const char *SSID = "Dialog 4G 093";
const char *PASSWORD = "f4331217";

void setupWifi()
{
    // Connect to Wi-Fi network with SSID and password
    Serial.print("Connecting to ");
    Serial.println(SSID);
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}
