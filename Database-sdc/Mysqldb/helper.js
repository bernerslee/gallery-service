let mysql = require('promise-mysql');
let config = require('./config.js');
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'zillow', Promise: bluebird});

mysql.createConnection(config)
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log('could noterr');
  });
