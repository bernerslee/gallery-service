var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var findHouse = require('../Database-sdc/Mongodb/query-mongodb.js'); //pulling from mongo database
var getPhotos = require('../Database-sdc/Mysqldb/query-mysqldb.js'); //pulling from mysql database
var cors = require('cors');    
var port = 3002;
var db = require('../Database-sdc/Mysqldb/config').db;

app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to Mysql database');

});

app.get('/gallery/:id', (req, res) => {
  var id = Number(req.params.id);
  console.log(id);
  getPhotos(id)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send();
    });
  
});


app.post('/gallery', (req, res) => {
  let photos = Object.values(req.body);
  console.log(photos);
  let firstQuery = 'SELECT * FROM photos ORDER BY id DESC LIMIT 1';
  db.query(firstQuery, (err, res) => {
    if (err) {
      console.log('there was an error getting the last record from DB');
    } else {
      let lastId = res[0].house_id;
      let nextId = lastId + 1;
      // eslint-disable-next-line quotes
      let secondQuery = `INSERT INTO photos (house_id, img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9)\
      VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
      photos.unshift(nextId);
      let params = photos;
      db.query(secondQuery, params, (err, res) => {
        if (err) {
          console.log('Unable to insert into DB', err);
        } else {
          console.log('Data inserted into DB');
        }
      });
    }
  });
});

app.delete('/gallery/:id', (req, res) => {
  let id = Number(req.params.id);
  console.log(typeof id );
  let q = 'DELETE FROM photos WHERE id = ?';
  let params = [id];
  console.log(params);
  db.query(q, params, (err, res) => {
    if (err) {
      console.log('there was an error deleting record', err);
    } else {
      console.log('record deleted');
    }    
  }); 
});
  
app.listen(port, (req, res)=>{
  console.log(`Listening on Port: ${port}`);
});
  