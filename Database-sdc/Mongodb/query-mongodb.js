const mongoose = require('mongoose');
const {db, House} = require('./index.js');
var explain = require('mongoose-explain');


let organizeDataForServer = (data) => {
  return data.photos.map((ele, ind) => {
    // eslint-disable-next-line camelcase
    return {img_url: ele, img_order: ind};
  });
};

let findHouse = (id) => {
  return new Promise((resolve, reject) => {
    House.findOne({houseid: id})
      .then((res) => {
        let data = organizeDataForServer(res);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
};

//FUNCTION BELOW WAS USED TO TEST THE SPEED OF QUERIES USING MONGO DB

let findHouse2 = (id) => {
  let timeBefore = Date.now();
  House.find({houseid: id}).explain().then(data=>console.log(data));
  // House.findOne({houseid: id})
  //   .then((res) => {
  //     let data = organizeDataForServer(res);
  //     let timeAfter = Date.now();
  //     var totalTime = (timeAfter - timeBefore);
  //     console.log('query took ' + totalTime + ' miliseconds');
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });  
};

findHouse2(9999999);


module.exports = findHouse;
