let mysql = require('promise-mysql');
const config = require('./config.js');


let organizeDataForServer = (data) => {
  var cleanData = Object.values(data[0]);
  var finalData = cleanData.slice(2);
  finalData = finalData.map((ele, ind) => {
    return {img_url: ele, img_order: ind};
  });
  return finalData;
};


// eslint-disable-next-line func-style
function getPhotos(id) {
  return new Promise ((resolve, reject) => {
    mysql.createConnection(config)
      .then((connection) => {
        let q = 'SELECT * FROM photos where id = ?';
        var params = [id];
        let timeBefore = Date.now();
        connection.query(q, params)
          .then((res) => {
            let timeAfter = Date.now();
            var result = (timeAfter - timeBefore) / 1000;
            console.log('Query took ' + result + 'seconds');
            let data = organizeDataForServer(res);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        console.log('there was an error ', err);
      });
  });
}


// eslint-disable-next-line func-style

//FUNCTION BELOW WAS USED TO TEST THE SPEED OF QUERIES USING MYSQL DB


// function getPhotos2(id) {
//   mysql.createConnection(config)
//     .then((connection) => {
//       let q = 'SELECT * FROM photos where id = ?';
//       var params = [id];
//       let timeBefore = Date.now();
//       connection.query(q, params)
//         .then((res) => {
//           let timeAfter = Date.now();
//           var result = (timeAfter - timeBefore);
//           console.log('Query took ' + result );
//           let data = organizeDataForServer(res);
//           console.log('data');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log('there was an error ', err);
//     });
// }

// getPhotos2(9000000);

module.exports = getPhotos;