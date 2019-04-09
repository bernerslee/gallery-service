const mongoose = require('mongoose');
var explain = require('mongoose-explain');

mongoose.connect('mongodb://127.0.0.1/zillow', { useNewUrlParser: true });

const db = mongoose.connection;

let houseSchema = new mongoose.Schema({
  houseid: {type: Number, unique: true}, 
  photos: [String]
});
  
houseSchema.plugin(explain);

let House = mongoose.model('House', houseSchema);

module.exports = {
  db,
  House
};