let fs = require('promise-fs');
var exporter = require('csv-to-mysql');
let mysql = require('promise-mysql');
let config = require('./config.js');


 
var Promise = require('bluebird');

var urlArray = [
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg',
    'https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg'
];

async function createRecords (input) {
    for (let i = 1; i <= input + 500; i++) {
       await writeId(i)
    }
};

async function insertHouses(connection) {
    var q = "load data infile 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/house.csv' into table houses fields terminated by ',' lines terminated by '\n' \
    (id)"
    await connection.query(q);
    var dir = 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/house.csv';
    await fs.unlink(dir);
}

async function insertPhotos(connection) {
    var q = "load data infile 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv' into table photos fields terminated by ',' lines terminated by '\n' \
    (img_url, img_order, house_id)"
    await connection.query(q)
    await fs.unlink('C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv')
}

async function createPhotos(houseIdTracker, startingId2) {
    let string = '';
    let j = 0
    for (let i = startingId2 + 1; i <= startingId2 + 100000; i++) {
        string += urlArray[j] + ',' + (j + 1) + ',' + (houseIdTracker + 1) + '\n';
        j++;
        if (j > 9) {
            j = 0;
        }
        if (i % 10 === 0) {
            houseIdTracker++
        }
        
    };
    let dir = 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv';
    await fs.appendFile(dir, string)
}

async function createHouses(startingId) {
    let string = '';
    for (let i = startingId + 1; i <= startingId + 10000; i++) {
        string += i + '\n'
    }
    var dir = 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/house.csv'
    await fs.appendFile(dir, string)
}

async function test() {
    var connection = await mysql.createConnection(config)
    let startingId = 0;
    let totalTime = 0;
    
    // for (let i = 0; i < 20; i++) {
    //     let timeBefore = Date.now()
    //     await createHouses(startingId)
    //     await insertHouses(connection)
    //     startingId += 500000;
    //     let timeAfter = Date.now()
    //     let timeOfInclusion = (timeAfter - timeBefore) / 1000;
    //     console.log(timeOfInclusion);
    //     // totalTime += timeOfInclusion;
    //     // console.log(totalTime);
    // }

    let startingId2 = 0;
    let houseIdTracker = 0;
    let totalBatch = 0;
    for (let i = 0; i < 1000; i++) {
        let timeBefore = Date.now()
        await createPhotos(houseIdTracker, startingId2)
        await insertPhotos(connection)
        startingId2 += 100000
        houseIdTracker += 10000
        let timeAfter = Date.now()
        let timeOfInclusion = (timeAfter - timeBefore) / 1000;
        console.log(timeOfInclusion);
        totalTime += timeOfInclusion;
        console.log(totalTime);
        totalBatch += 100000;
        console.log(totalBatch);
    }     
    

}

test();