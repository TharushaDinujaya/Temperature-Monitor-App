#include <functions.h>

#define DHT_SENSOR_PIN 19

DHT22 dht22(DHT_SENSOR_PIN);

void initializeTempSensor()
{
    if (dht22.getLastError() != dht22.OK)
    {
        Serial.print("last error :");
        Serial.println(dht22.getLastError());
    }
}

float getTempReading()
{
    if (dht22.getLastError() == dht22.OK)
    {
        float tempDeg = dht22.getTemperature(); // return temperature in celsius
        // Serial.printf("Temperature: %0.1lf°C \n", tempDeg);
        return tempDeg;
    }
    Serial.println("Error in data reading DHT Sensor Temperature");
    return 0;
}

float gethumidityReading()
{
    if (dht22.getLastError() == dht22.OK)
    {                                    // get All data from DHT22
        float hum = dht22.getHumidity(); // return humidity
        // Serial.printf("Humidity:%f \n", hum);
        return hum;
    }
    Serial.println("Error in data reading DHT Sensor Humidity");
    return 0;
}