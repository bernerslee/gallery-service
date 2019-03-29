let mysql = require('promise-mysql');
const config = require('./config.js');

let timeBefore = Date.now();
async function getPhotos(id) {
  let connection = await mysql.createConnection(config);
  let q = 'SELECT * FROM photos where id = ?';
  var params = [id]
  connection.query(q, params)
    .then((res) => {
      console.log('these are the results', res);
      let timeAfter = Date.now();
      var result = (timeAfter - timeBefore)/1000;
      console.log('Query took ' + result + 'seconds');
    })
    .catch((err) => {
      console.log('there was an error', err);
    })
}

getPhotos(9896589)