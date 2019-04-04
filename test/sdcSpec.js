//Before running this file, the server must be stoped;
var expect = require('chai').expect;
var chai = require('chai');
var newRequest = require('supertest');
var app = require('../server/sdcIndex.js');


describe('GET/gallery/some_id', function () {

  it('should respond with a 200 status code', (done) => {
    newRequest(app)
      .get('/gallery/9')
      .expect(200, done);
  });

  it('should respond with an array of 10 objects', (done) => {
    newRequest(app)
      .get('/gallery/9')
      .end((err, res) => {
        expect(res.body.length).to.be.equal(10);
        expect(res.body[0]).to.be.an('object');
        done();
      });
  });

  it('should respond with objects that have 2 properties: img_url and img_order', (done) => {
    newRequest(app)
      .get('/gallery/9')
      .end((err, res) => {
        let properties = Object.keys(res.body[0]);
        expect(properties[0]).to.equal('img_url');
        expect(properties[1]).to.equal('img_order');
        done();
      });
  });

  
  it('should respond with a 404 if input ID does not exist on database', (done) => {
    newRequest(app)
      .get('/gallery/20000000')
      .expect(404, done);
  });
});



describe('POST/gallery/', () => {
    
  it('should post correctly', (done) => {

    let recordToBeInserted = {
      'img_0': 'test_put',
      'img_1': 'test_put',
      'img_2': 'test_put',
      'img_3': 'test_put',
      'img_4': 'test_put',
      'img_5': 'test_put',
      'img_6': 'test_put',
      'img_7': 'test_put',
      'img_8': 'test_put',
      'img_9': 'test_put'
    };

    let options = {
      method: 'POST',
      uri: 'http://localhost:3002/gallery',
      body: recordToBeInserted,
      json: true // Automatically stringifies the body to JSON
    };

    newRequest(app)
      .post('/gallery')
      .send(recordToBeInserted)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

}); 

describe('DELETE/gallery/id', function() {
  it('Should delete correctly', (done) => {

    newRequest(app)
      .delete('/gallery/10000080')
      .expect(200, done);
  });
});


describe('put/gallery/id', function() {
  it('Should delete correctly', (done) => {

    let recordToBeInserted = {
      'img_0': 'test_put',
      'img_1': 'test_put',
      'img_2': 'test_put',
      'img_3': 'test_put',
      'img_4': 'test_put',
      'img_5': 'test_put',
      'img_6': 'test_put',
      'img_7': 'test_put',
      'img_8': 'test_put',
      'img_9': 'test_put'
    };

    newRequest(app)
      .put('/gallery/9999997')
      .send(recordToBeInserted)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should contain the values updated using the previous function', (done) => {
    newRequest(app)
      .get('/gallery/9999997')
      .end((err, res) => {
        let value = res.body[0].img_url;
        expect(value).to.equal('test_put');
        done();
      });
  });
});

