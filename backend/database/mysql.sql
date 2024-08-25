-- Create the database
CREATE DATABASE test;

-- Use the database
USE test;

-- Create the Device table
CREATE TABLE Device (
    device_id INT PRIMARY KEY, 
    device_url varchar(15) 
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
    timestamp varchar(64),
    reading FLOAT,
    PRIMARY KEY (sensor_id, device_id, timestamp),
    FOREIGN KEY (sensor_id, device_id) REFERENCES Sensor(sensor_id, device_id)
);


-- Create trigger for updating sensor device_id
ALTER TABLE Sensor DROP FOREIGN KEY Sensor_ibfk_1;
ALTER TABLE SensorData DROP FOREIGN KEY SensorData_ibfk_1;

DELIMITER $$
CREATE TRIGGER before_device_update
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
END$$

DELIMITER ;

ALTER TABLE Sensor ADD CONSTRAINT Sensor_ibfk_1 FOREIGN KEY (device_id) REFERENCES Device(device_id);
ALTER TABLE SensorData ADD CONSTRAINT SensorData_ibfk_1 FOREIGN KEY (sensor_id, device_id) REFERENCES Sensor(sensor_id, device_id);






INSERT INTO Device (device_id, device_url) VALUES
(1, '192.168.0.0'),
(2, '192.168.0.0'),
(3, '192.168.0.0'),
(4, '192.168.0.0'),
(5, '192.168.0.0'),
(6, '192.168.0.0'),
(7, '192.168.0.0'),
(8, '192.168.0.0'),
(9, '192.168.0.0'),
(10, '192.168.0.0'),
(11, '192.168.0.0'),
(12, '192.168.0.0'),
(13, '192.168.0.0'),
(14, '192.168.0.0'),
(15, '192.168.0.0'),
(16, '192.168.0.0'),
(17, '192.168.0.0'),
(18, '192.168.0.0'),
(19, '192.168.0.0'),
(20, '192.168.0.0');

INSERT INTO Sensor (sensor_id, device_id, sensor_mode) VALUES
(0, 1, 'Active'),
(1, 1, 'Inactive'),
(2, 1, 'Active'),
(3, 1, 'Inactive'),
(4, 1, 'Active'),
(5, 1, 'Inactive'),
(0, 2, 'Active'),
(1, 2, 'Inactive'),
(2, 2, 'Active'),
(3, 2, 'Inactive'),
(4, 2, 'Active'),
(5, 2, 'Inactive'),
(0, 3, 'Active'),
(1, 3, 'Inactive'),
(2, 3, 'Active'),
(3, 3, 'Inactive'),
(4, 3, 'Active'),
(5, 3, 'Inactive'),
(0, 4, 'Active'),
(1, 4, 'Inactive'),
(2, 4, 'Active'),
(3, 4, 'Inactive'),
(4, 4, 'Active'),
(5, 4, 'Inactive'),
(0, 5, 'Active'),
(1, 5, 'Inactive'),
(2, 5, 'Active'),
(3, 5, 'Inactive'),
(4, 5, 'Active'),
(5, 5, 'Inactive'),
(0, 6, 'Active'),
(1, 6, 'Inactive'),
(2, 6, 'Active'),
(3, 6, 'Inactive'),
(4, 6, 'Active'),
(5, 6, 'Inactive'),
(0, 7, 'Active'),
(1, 7, 'Inactive'),
(2, 7, 'Active'),
(3, 7, 'Inactive'),
(4, 7, 'Active'),
(5, 7, 'Inactive'),
(0, 8, 'Active'),
(1, 8, 'Inactive'),
(2, 8, 'Active'),
(3, 8, 'Inactive');

INSERT INTO SensorData (sensor_id, device_id, timestamp, reading) VALUES
(0, 1, '20240101000000', 23.5),
(0, 1, '20240101001000', 24.1),
(0, 1, '20240101002000', 23.9),
(0, 1, '20240101003000', 24.0),
(0, 1, '20240101004000', 23.8),
(1, 1, '20240101000000', 22.5),
(1, 1, '20240101001000', 22.1),
(1, 1, '20240101002000', 22.9),
(1, 1, '20240101003000', 22.0),
(1, 1, '20240101004000', 22.8),
(2, 1, '20240101000000', 21.5),
(2, 1, '20240101001000', 21.1),
(2, 1, '20240101002000', 21.9),
(2, 1, '20240101003000', 21.0),
(2, 1, '20240101004000', 21.8),
(0, 2, '20240101000000', 25.5),
(0, 2, '20240101001000', 25.1),
(0, 2, '20240101002000', 25.9),
(0, 2, '20240101003000', 25.0),
(0, 2, '20240101004000', 25.8),
(1, 2, '20240101000000', 26.5),
(1, 2, '20240101001000', 26.1),
(1, 2, '20240101002000', 26.9),
(1, 2, '20240101003000', 26.0),
(1, 2, '20240101004000', 26.8),
(2, 2, '20240101000000', 27.5),
(2, 2, '20240101001000', 27.1),
(2, 2, '20240101002000', 27.9),
(2, 2, '20240101003000', 27.0),
(2, 2, '20240101004000', 27.8),
(3, 2, '20240101000000', 28.5),
(3, 2, '20240101001000', 28.1),
(3, 2, '20240101002000', 28.9),
(3, 2, '20240101003000', 28.0),
(3, 2, '20240101004000', 28.8),
(0, 3, '20240101000000', 29.5),
(0, 3, '20240101001000', 29.1),
(0, 3, '20240101002000', 29.9),
(0, 3, '20240101003000', 29.0),
(0, 3, '20240101004000', 29.8),
(1, 3, '20240101000000', 30.5),
(1, 3, '20240101001000', 30.1),
(1, 3, '20240101002000', 30.9),
(1, 3, '20240101003000', 30.0),
(1, 3, '20240101004000', 30.8),
(2, 3, '20240101000000', 31.5),
(2, 3, '20240101001000', 31.1),
(2, 3, '20240101002000', 31.9),
(2, 3, '20240101003000', 31.0),
(2, 3, '20240101004000', 31.8),
(3, 3, '20240101000000', 32.5),
(3, 3, '20240101001000', 32.1),
(3, 3, '20240101002000', 32.9),
(3, 3, '20240101003000', 32.0),
(3, 3, '20240101004000', 32.8),
(4, 3, '20240101000000', 33.5),
(4, 3, '20240101001000', 33.1),
(4, 3, '20240101002000', 33.9),
(4, 3, '20240101003000', 33.0),
(4, 3, '20240101004000', 33.8),
(5, 3, '20240101000000', 34.5),
(5, 3, '20240101001000', 34.1),
(5, 3, '20240101002000', 34.9),
(5, 3, '20240101003000', 34.0),
(5, 3, '20240101004000', 34.8);
