#include <Bonezegei_DHT22.h>
#include <functions.h>

#define DHT_SENSOR_PIN 19

Bonezegei_DHT22 dht(DHT_SENSOR_PIN);

void initializeTempSensor()
{
    dht.begin();
}

float getTempReading()
{
    if (dht.getData())
    {                                         // get All data from DHT22
        float tempDeg = dht.getTemperature(); // return temperature in celsius
        Serial.printf("Temperature: %0.1lf°C \n", tempDeg);
        return tempDeg;
    }
    Serial.println("Error in data reading DHT Sensor Temperature");
    return 0;
}

int gethumidityReading()
{
    if (dht.getData())
    {                                // get All data from DHT22
        int hum = dht.getHumidity(); // return humidity
        Serial.printf("Humidity:%d \n", hum);
        return hum;
    }
    Serial.println("Error in data reading DHT Sensor Humidity");
    return 0;
}