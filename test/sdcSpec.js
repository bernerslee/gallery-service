/* Make sure node server is running */
let mysql = require('mysql');
var expect = require('chai').expect;
var config = require('../Database-sdc/Mysqldb/configTestDB.js');
var urlsArray = require('../Database-sdc/Mysqldb/urlsArray.js');

let connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log('there was an error connecting to mysqldb');
  } else {
    console.log('connected');
  }
});

describe('Seeding 10 million records on zillow test database', () => {

  it('Should insert 10 million  records in under an hour', (done) => {

    async function insertPhotos(connection) {
      var q = "load data infile 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv' into table photos fields terminated by ',' lines terminated by '\n' \
      (id, house_id, img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9)"
      await connection.query(q)
      fs.unlink('C:/ProgramData/MySQL/MySQL Server 5.7/Uploads/photo.csv')
    }

    async function createPhotos(houseIdTracker, startingId) {
      let string = '';
      for (let i = startingId + 1; i <= startingId + 1000; i++) {
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
        for (let i = 0; i < 10; i++) {
            let timeBefore = Date.now()
            await createPhotos(houseIdTracker, startingId)
            await insertPhotos(connection)
            let timeAfter = Date.now()
            startingId += 1000
            houseIdTracker += 1000
            let timeOfInclusion = (timeAfter - timeBefore) / 1000;
            console.log(timeOfInclusion);
            totalTime += timeOfInclusion;
            console.log(totalTime);
            totalBatch += 1000;
            console.log(totalBatch);
        }     
        console.log(totalBatch)
        console.log(totalTime)
        expect(totalBatch).to.equal(10000);
        expect(totalTime).to.be.at.most(59)
       
    
    }

    done();


  //   dbConnect.query('SELECT * FROM houses')
  //     .then((result)=>{
  //       expect(result.rowCount).to.equal(100);
  //       done();
  //     });
  // });

  });
});
   


//   it('Should have 600 records in photos table', (done) => {
//     dbConnect.query('SELECT * FROM photos')
//       .then((result)=>{
//         expect(result.rowCount).to.equal(600);
//         done();
//       });
//   });

//   it('Should have the correct record types/columns in Houses table', (done) => {
//     dbConnect.query('SELECT * FROM houses limit 1')
//       .then((result)=>{
//         expect(result.rows[0]).to.have.all.keys('house_id', 'name');
//         expect(result.rows[0].house_id).to.be.a('number');
//         expect(result.rows[0].name).to.be.a('string');
//         done();
//       });
        
//   });

//   it('Should have the correct record types/columns in photos table', (done) => {
//     dbConnect.query('SELECT * FROM photos limit 1')
//       .then((result)=>{
//         expect(result.rows[0]).to.have.all.keys('photo_id', 'img_url', 'img_order', 'house_id');
//         expect(result.rows[0].photo_id).to.be.a('number');
//         expect(result.rows[0].img_url).to.be.a('string');
//         expect(result.rows[0].img_order).to.be.a('number'); //maybe string is better??
//         expect(result.rows[0].house_id).to.be.a('number');
//         done();
//       });
//   });

//   afterEach(function() {
//     dbConnect.end();
//   }); 

// });