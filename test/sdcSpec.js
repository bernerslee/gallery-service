/* Make sure node server is running */
let mysql = require('mysql');
var expect = require('chai').expect;
var config = require('../Database-sdc/Mysqldb/config.js');
var urlsArray = require('../Database-sdc/Mysqldb/urlsArray.js');

let connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log('there was an error connecting to mysqldb');
  } else {
    console.log('connected');
  }
});

describe('database', () => {

  it('Should retrieve data from Mysql db in under 50 miliseconds', (done) => {
    let q = 'SELECT * FROM photos WHERE ID = ?';
    let params = [9999999];
    let timeBeforeQuery = Date.now();
    connection.query(q, params, (err, res) => {
      if (err) {
        console.log('There was an error retrieving from Database', err);
      } else {
        let timeAfterQuery = Date.now();
        let timeTakenByQuery = timeAfterQuery - timeBeforeQuery;
        expect(timeTakenByQuery).to.be.at.most(50);
        done();
      }
    });
  });

  // it('Should have 10.000.000 records on the photos table', function () {
  //   this.timeout(40000);
  //   let q = 'SELECT COUNT(*) FROM photos';
  //   connection.query(q, (err, res) => {
  //     if (err) {
  //       console.log('There was an error counting the number of records in the database', err);
  //     } else {
  //       console.log('whaaaaaaaaaaaaaaaaaaaaaaaaaat');
  //       let count = res[0]['COUNT(*)'];
  //       expect(count).to.be(10000000);
  //       done();
  //     }
  //   });      
  // });

  
});
   
//   dbConnect.query('SELECT * FROM houses')
//     .then((result)=>{
//       expect(result.rowCount).to.equal(100);
//       done();
//     });
// });

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