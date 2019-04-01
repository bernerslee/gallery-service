var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var findHouse = require('../Database-sdc/Mongodb/query-mongodb.js'); //pulling from mongo database
var cors = require('cors');    
var port = 3002;
var db = require('../Database-sdc/Mysqldb/query-mysqldb');

app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/gallery/:id', (req, res) => {
  var id = Number(req.params.id);
  db.getPhotos(id)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send('unable to retrieve from database', err);
    });
});

app.post('/gallery', (req, res) => {
  db.insertPhotos(req)
    .then(() => {
      res.json('Photos added successfully');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database', err);
    });
});

app.delete('/gallery/:id', (req, res) => {
  let id = Number(req.params.id);
  db.deletePhotos(id)
    .then(() => {
      res.json('Record deleted successfully');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database', err);
    });
});

app.put('/gallery/:id', (req, res) => {
  let id = Number(req.params.id); 
  db.updatePhotos(req, id) 
    .then(() => {
      res.json('Record updated successfully');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database', err);
    });
}); 
  
app.listen(port, (req, res)=>{
  console.log(`Listening on Port: ${port}`);
});
  