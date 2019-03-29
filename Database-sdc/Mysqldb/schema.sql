CREATE DATABASE IF NOT EXISTS ZILLOW;

USE ZILLOW;

DROP TABLE IF EXISTS photos; 

/* we want to create tables: homes, photos */

CREATE TABLE IF NOT EXISTS photos (
    ID int NOT NULL AUTO_INCREMENT,
    house_id INTEGER,
    img_0 varchar(150),
    img_1 varchar(150),
    img_2 varchar(150),
    img_3 varchar(150),
    img_4 varchar(150),
    img_5 varchar(150),
    img_6 varchar(150),
    img_7 varchar(150),
    img_8 varchar(150),
    img_9 varchar(150),
    PRIMARY KEY (ID)
);
