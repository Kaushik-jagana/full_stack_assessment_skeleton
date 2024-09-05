-- Create Users Table
CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);

-- Create Homes Table
CREATE TABLE IF NOT EXISTS home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft DECIMAL(10, 2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15, 2) NOT NULL,
    UNIQUE(street_address, state, zip)
);

-- Create UserHome Table
CREATE TABLE IF NOT EXISTS user_home_relation (
    username VARCHAR(255),
    home_id INT,
    PRIMARY KEY(username, home_id),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (home_id) REFERENCES home(home_id)
);

-- Insert Data into User Table
INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;

-- Insert Data into Home Table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;

-- Insert Data into UserHome Table
INSERT INTO user_home_relation (username, home_id)
SELECT uh.username, h.home_id
FROM user_home uh
JOIN home h ON uh.street_address = h.street_address 
             AND uh.state = h.state 
             AND uh.zip = h.zip;

-- Drop the original user_home table if no longer needed
DROP TABLE IF EXISTS user_home;
