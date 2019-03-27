CREATE DATABASE IF NOT EXISTS ZILLOW;

USE ZILLOW;

DROP TABLE IF EXISTS photos; 
DROP TABLE IF EXISTS houses;


/* we want to create tables: homes, photos */

CREATE TABLE IF NOT EXISTS houses (
    ID int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID)
);


CREATE TABLE IF NOT EXISTS photos (
    ID int NOT NULL AUTO_INCREMENT,
    img_url varchar(150),
    img_order INTEGER,
    house_id INTEGER, 
    PRIMARY KEY (ID),
    FOREIGN KEY (house_id) REFERENCES houses(ID)
);
