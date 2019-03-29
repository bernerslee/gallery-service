const mongoose = require('mongoose');
const {db, House} = require('./index.js');


// let findHouse = (id) => {
//   return new Promise((resolve, reject) => {
//     House.findOne({houseid: id}, (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   });
// };

let timeBefore = Date.now();
House.findOne({houseid: 9999999}, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);  
    let timeAfter = Date.now();
    let totalTime = (timeAfter - timeBefore) / 1000;
    console.log('Query took ' + totalTime + ' seconds');
  }
});

