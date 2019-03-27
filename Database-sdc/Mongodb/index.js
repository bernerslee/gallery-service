const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/zillow', { useNewUrlParser: true });


const db = mongoose.connection;

let houseSchema = new mongoose.Schema({
  houseid: Number,
  photos: [String]
});
  
let House = mongoose.model('House', houseSchema);
  

module.exports = {
  db,
  House
};