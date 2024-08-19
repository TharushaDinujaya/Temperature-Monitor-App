#include <functions.h>

#define SOIL_MOISTURE_SENSOR_PIN 35

float getSoilReading()
{
    // Read the analog value from the sensor
    float sensorValue = analogRead(SOIL_MOISTURE_SENSOR_PIN);

    // Print the raw sensor value for debugging
    // Serial.print("Soil Moisture Sensor Value: ");
    // Serial.println(sensorValue);

    return sensorValue;
}