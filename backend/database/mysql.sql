-- Create the database
CREATE DATABASE test;

-- Use the database
USE test;

-- Create the Device table
CREATE TABLE Device (
    device_id INT PRIMARY KEY    
);

-- Create the Sensors table
CREATE TABLE Sensor (
    sensor_id INT,
    device_id INT,
    sensor_mode VARCHAR(10),
    PRIMARY KEY (sensor_id, device_id),
    FOREIGN KEY (device_id) REFERENCES Device(device_id)
);

-- Create the DeviceSensors junction table
CREATE TABLE SensorData (
    sensor_id INT,
    device_id INT,
    timestamp DATETIME,
    reading FLOAT,
    PRIMARY KEY (sensor_id, device_id, timestamp),
    FOREIGN KEY (sensor_id, device_id) REFERENCES Sensor(sensor_id, device_id)
);


-- Create trigger for updating sensor device_id
CREATE TRIGGER update_device_id
BEFORE UPDATE ON Device
FOR EACH ROW
BEGIN
    -- Update device_id in Sensor table
    UPDATE Sensor
    SET device_id = NEW.device_id
    WHERE device_id = OLD.device_id;

    -- Update device_id in SensorData table
    UPDATE SensorData
    SET device_id = NEW.device_id
    WHERE device_id = OLD.device_id;
END;

UPDATE Device SET device_id = 1330 WHERE device_id = 1;

 ALTER TABLE Sensor DROP FOREIGN KEY Sensor_ibfk_1;
 ALTER TABLE SensorData DROP FOREIGN KEY SensorData_ibfk_1;

UPDATE Device SET device_id = 100 WHERE device_id = 1;
ALTER TABLE Sensor ADD CONSTRAINT Sensor_ibfk_1 FOREIGN KEY (device_id) REFERENCES Device(device_id);
ALTER TABLE SensorData ADD CONSTRAINT SensorData_ibfk_1 FOREIGN KEY (sensor_id, device_id) REFERENCES Sensor(sensor_id, device_id);
