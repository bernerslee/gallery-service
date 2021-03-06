const {db, House} = require('./index.js')


let createInputArray = (idTracker) => {

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

  let container = [];
  for (let i = 0; i < 20000; i++) {
    let house = new House({
      houseid: idTracker + 1,
      photos: urlArray
    });
    idTracker ++;
    container.push(house);
  }
  return container;
}


async function insertHouses() {
  let totalTime = 0
  let totalBatch = 0;
  var idTracker = 0;
  for (let i = 0; i < 500; i++) {
    let timeBefore = Date.now();
    var params = createInputArray(idTracker)
    idTracker += 20000
    await House.insertMany(params)
    let timeAfter = Date.now();
    let timeByIteration = (timeAfter - timeBefore)/1000;
    totalTime += timeByIteration
    totalBatch += 20000
    console.log('inclusion time is ', timeByIteration);
    console.log('total batch is ', totalBatch);
    console.log('totalTime is ', totalTime);
  }
  console.log('total number or records is ', totalBatch);
  console.log('total seeding time is ' + totalTime/60 + ' minutes' )
}

insertHouses();

