const mongoose = require('mongoose');
const {db, House} = require('./index.js');


let findHouse = () => {
  House.findOne({houseid: 6}, (err, res) => {
    if (err) {
      console.log('there was error', err);
    } else {
      console.log('res is here', res);
      return res;
    }
  });
};

findHouse();