let fs = require('promise-fs');
let mysql = require('promise-mysql');
let config = require('./config.js');
var urlsArray = require('./urlsArray.js');


async function insertPhotos(connection) {
    var q = "load data infile 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv' into table photos fields terminated by ',' lines terminated by '\n' \
    (id, house_id, img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9)"
    await connection.query(q)
    fs.unlink('C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv')
}

async function createPhotos(houseIdTracker, startingId) {
    let string = '';
    for (let i = startingId + 1; i <= startingId + 50000; i++) {
        string += houseIdTracker + 1 + ',' + (houseIdTracker + 1) + ',' + urlsArray[0] + ',' + urlsArray[1] + ',' + urlsArray[2] + ',' + urlsArray[3] + ',' + urlsArray[4] + ',' + urlsArray[5] + ',' + urlsArray[6] + ',' + urlsArray[7] + ',' + urlsArray[8] + ',' + urlsArray[9] + '\n';
        houseIdTracker++
    };
    let dir = 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv';
    await fs.appendFile(dir, string)
}

async function test() {
    var connection = await mysql.createConnection(config)
    let startingId = 0;
    let houseIdTracker = 0;
    let totalTime = 0;
    let totalBatch = 0;
    for (let i = 0; i < 200; i++) {
        let timeBefore = Date.now()
        await createPhotos(houseIdTracker, startingId)
        await insertPhotos(connection)
        let timeAfter = Date.now()
        startingId += 50000
        houseIdTracker += 50000
        let timeOfInclusion = (timeAfter - timeBefore) / 1000;
        console.log(timeOfInclusion);
        totalTime += timeOfInclusion;
        console.log(totalTime);
        totalBatch += 50000;
        console.log(totalBatch);
    }     
    
    console.log('total number or records is ', totalBatch);
    console.log('total seeding time is ' + totalTime/60 + ' minutes' )
}

test();