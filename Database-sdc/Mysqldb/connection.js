
// const mysql = require('mysql');

// const mysql = require('mysql2/promise')
const v8 = require('v8')

const mysql = require('promise-mysql');

let config = require('./config.js');

let Promise = require('bluebird');

async function insertHouses(connection, params) {
  var q = 'INSERT INTO houses (id) values ?';
  await connection.query(q, [params]);
}

function createHouses(globalCount) {
  var result = []
  for (let i = globalCount; i <= globalCount + 49999; i++) {
    var hold = [];
    hold.push(i);
    result.push(hold)
  }
  return result;
}



function createPictures() {
  var urlArrays = [
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
  var j = 0;
  var result = [];
  for (let i = 1; i <= 50000; i++) {
    var hold = []
    hold.push(urlArrays[j], j + 1, idTracker);
    j++;
    if (j > 9) {
        j = 0;
    }
    if (i % 10 === 0) {
        idTracker++
    }
    result.push(hold);
  }
    return result;
  
};

async function insertPhotos(connection,params) {
  var q3 = 'INSERT INTO photos (img_url, img_order, house_id) VALUES ?' 
  await connection.query(q3,[params])
}

var idTracker = 1

async function createRecords() {
  var globalCount = 1
  var connection = await mysql.createConnection(config);
  let batchSizeHouses = 0;
  let batchSizePhotos = 0
  let totalTime = 0;
  let totalTime2 = 0;

  for (let i = 0; i < 200; i++) {
    var params1 = createHouses(globalCount);
    globalCount += 50000
    let timeBefore =  Date.now()
    await insertHouses(connection, params1)
    let timeAfter = Date.now()
    let differenceTime = (timeAfter - timeBefore)/1000
    batchSizeHouses += 50000
    totalTime += differenceTime;
    console.log(differenceTime);
    console.log('total time is', totalTime)
    console.log('total batch size for houses is ' , batchSizeHouses);

  }

  for (let i = 0; i < 2000; i++) {
      var params2 = createPictures();
      let timeBefore =  Date.now();
      await insertPhotos(connection, params2);
      let timeAfter = Date.now()
      let differenceTime = (timeAfter - timeBefore)/1000;
      batchSizePhotos += 50000;
      totalTime2 += differenceTime;
      console.log(differenceTime);
      console.log('total time for photo is', totalTime2)
      console.log('total batch size for photos is ' , batchSizePhotos);
  }  

}

createRecords()



