var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var findHouse = require('../Database-sdc/Mongodb/query-mongodb.js'); //pulling from mongo database
var getPhotos = require('../Database-sdc/Mysqldb/query-mysqldb.js'); //pulling from mysql database
var cors = require('cors');    
var port = 3002;

app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.get for Mongo
app.get('/gallerymongodb/:id', (req, res) => {
  var id = Number(req.params.id);
  console.log(id);
  findHouse(id)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send();
    });

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

app.listen(port, ()=>{
  console.log(`Listening on Port: ${port}`);
});
