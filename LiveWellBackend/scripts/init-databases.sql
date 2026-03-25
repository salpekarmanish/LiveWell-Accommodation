-- Create databases for each microservice
CREATE DATABASE IF NOT EXISTS livewell_auth;
CREATE DATABASE IF NOT EXISTS livewell_property;
CREATE DATABASE IF NOT EXISTS livewell_booking;
CREATE DATABASE IF NOT EXISTS livewell_communication;
CREATE DATABASE IF NOT EXISTS livewell_support;
CREATE DATABASE IF NOT EXISTS livewell_admin;

-- Grant privileges
GRANT ALL PRIVILEGES ON livewell_auth.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON livewell_property.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON livewell_booking.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON livewell_communication.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON livewell_support.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON livewell_admin.* TO 'root'@'%';

FLUSH PRIVILEGES;
