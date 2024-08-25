# Temperature Monitor App

## Overview

A versatile app for real-time weather monitoring using OpenWeather APIs and IoT devices, featuring temperature, humidity, wind data, air quality, and configurable sensor modes with data visualization.

|------------------------|------------------------|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/loading_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/loading_light.png)|
|------------------------|------------------------|

The Temperature Monitor App is a versatile weather monitoring application that offers two primary functionalities:

### Current Location Weather Monitoring:

Powered by OpenWeather APIs, this feature provides real-time weather data for your current location. It includes:

- Weather Forecasts: Hourly and daily predictions.
- Temperature: Current temperature data.
- Humidity: Real-time humidity levels.
- Wind Speed and Angle: Detailed wind conditions.
- Air Quality: Current air quality index.
- Sunrise and Sunset Times: Accurate daily timings.

### Remote Location Weather Monitoring:

Accessible via the Development tab, this feature enables monitoring of weather conditions at remote locations using an IoT device. The device, connected through Wi-Fi, interacts with the app via backend APIs, offering insights into:

- Sensor Data includes

  - Temperature
  - Humidity
  - Pressure
  - Soil Moisture

- All displayed using gauge indicators and trend charts.

- Trend Charts: Visualize up to 10 data points for each sensor.

- Sensor Modes: Select from three data transmission modes:

  - Every 2 hours
  - Every 1 hour
  - Every 30 minutes

- Sensor Mode Configuration: Users can change sensor modes directly from the app.

## Backend Architecture

The backend for the app is developed using Node.js and Express.js, with the following features:

- Database Management: All sensor data is stored in MySQL databases hosted on Microsoft Azure.

- API Integration: The IoT device communicates with the backend via secure API calls, sending data as per the configured sensor mode. The mobile app retrieves this data using the backend APIs.

### Future Development

    - Additional APIs: Further APIs are planned for enhanced functionality in the next version.
    - Improved Features: Continuous improvements and new features will be introduced based on user feedback and project goals.

## Getting Started

- Prerequisites
  - Node.js
  - MySQL
  - Expo CLI
  - Components for IoT Device (DHT22, BMP280, Capacitive Soil Moisture Sensor)
  - Platform IO
  - Android Studio

### Installation

#### Clone the repository:

```
git clone https://github.com/yourusername/temperature-monitor-app.git
cd temperature-monitor-app
```

#### Install dependencies for backend:

```
cd backend
npm install
```

#### Install dependencies for Mobile Application:

```
cd "Mobile App/weatherMonitor"
npm install
```

#### Configure the database and environment variables.

Create MySQL server using Azure or AWS or any other online database server.
Create `.env` file in backend folder and make following configurations.

```
PORT =
HOST =
USER =
PASSWORD =
DATABASE =
DATABASE_PORT =
```

#### Run backend

```
cd backend
node server.js
```

For development run

```
cd backend
nodemon
```

#### Run Mobile Application

Open weatherMonitor with Android studio and create an emulator with Android 14 (API 34) or USB debug with physical device connected.

Open Components folder and select Weather.tsx file. Update with your OpenWeather APIs and Keys.

Open DevelopmentComponent folder update SensorData.tsx file and DeviceOption.tsx with your deployed backend APIs.

Open terminal and run.

```
npm run android
```

or

```
npm start
```

and select Android

#### Setup IoT device for measuring data.

![Schematic Diagram](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Device/schematics/Temp_Mon_Schematic.png)

Connect all components ass the diagram.

Open Device Folder with VS Code and Platform IO should be installed.

You can also change the pins for data. (GPIO 22 and GPIO 21 are SCL and SDA respectively)
You can configure it and assign any ADC GPIO pins for Soil Moisture Sensor Data and DHT22 Sensor Data.

In src folder, select utils.cpp file and change SSID and Password with your SSID and Password.

Upload code into ESP32 using platform IO.

open Serial Monitor and it prints the local IP Address in Serial Monitor.

For Printed Circuit Board, following PCB can be considered.

![2D PCB View](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Device/schematics/2D%20PCB.png)

![PCB Schematic View](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Device/schematics/PCB_Schematic.png)

## Usage

Launch the app and choose between Current Location Monitoring or Remote Location Monitoring.
For remote monitoring, navigate to the development tab to select sensors and configure settings.

## Mobile UI

|------------------------|------------------------|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/loading_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/loading_light.png)|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_1_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_1_light.png)|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_2_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_2_light.png)|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_3_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/main_3_light.png)|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/dev_1_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/dev_1_light.png)|
|![Dark](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/dev_2_dark.png)|![Light](https://github.com/TharushaDinujaya/Temperature-Monitor-App/blob/main/Docs/UI/dev_2_light.png)|

### In Version 2

Following features are considered.

- Updating Data trends and sensor gauge with more smooth UI components.
- Optimized backend APIs for easy data access.
- Machine Learning Integrated IoT device data prediction integration.
- More sensors to sense.
- More reliable IoT device - Backend communication.
- Authentication with JWT.
