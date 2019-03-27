const mongoose = require('mongoose');
const {db, House} = require('./index.js');


let findHouse = (id) => {
  return new Promise((resolve, reject) => {
    House.findOne({houseid: id}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
        
      }
    });
  });
};

module.exports = findHouse;