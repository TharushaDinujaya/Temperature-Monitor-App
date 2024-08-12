#include <functions.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>

// Create an instance of the sensor
Adafruit_BMP280 bmp; // I2C interface

void InitializeBMPSensor()
{
    // Initialize the BMP280 sensor
    if (!bmp.begin(0x76))
    { // Use 0x76 for I2C address
        Serial.println("Could not find a valid BMP280 sensor, check wiring!");
        while (1)
            ;
    }
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL);
}

float getPressureData()
{
    // Read pressure as hPa
    float pressure = bmp.readPressure() / 100.0F;

    return pressure;
}
