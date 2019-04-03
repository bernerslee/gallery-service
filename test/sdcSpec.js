// let db = require('../Database-sdc/Mysqldb/config').db;
let request = require('request-promise');
var expect = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
// let app = require('../server/sdcIndex.js');

chai.use(chaiHttp);

describe('GET/gallery/some_id', function () {

  it('should respond with json containing 10 elements', (done) => {
    request('http://localhost:3002/gallery/400')
      .then((res) => {
        let responseFromServer = JSON.parse(res);
        expect(responseFromServer.length).to.equal(10);  
        expect(responseFromServer[0]).to.be.an('object'); 
        done();
      })
      .catch((err) => {
        console.log('there is an error test_urling the GET request', err);
      });
  });

  it('should respond with objects that have 2 properties: img_url and img_order', (done) => {
    request('http://localhost:3002/gallery/400')
      .then((res) => {
        let responseFromServer = JSON.parse(res);
        let properties = Object.keys(responseFromServer[0]);
        expect(properties[0]).to.equal('img_url');
        expect(properties[1]).to.equal('img_order');
        done();
      })
      .catch((err) => {
        console.log('there is an error test_urling the GET request', err);
      });
  });

  it('should respond with a 404 if input ID does not exist on database', (done) => {
    chai.request('http://localhost:3002')
      .get('/gallery/20000000')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done(); // <= Call done to signal callback end
      });
  });

});



describe('POST/gallery/', () => {
    
  it('should post correctly', (done) => {
    let recordToBeInserted = {
      'img_0': 'test_url',
      'img_1': 'test_url',
      'img_2': 'test_url',
      'img_3': 'test_url',
      'img_4': 'test_url',
      'img_5': 'test_url',
      'img_6': 'test_url',
      'img_7': 'test_url',
      'img_8': 'test_url',
      'img_9': 'test_url'
    };

    var options = {
      method: 'POST',
      uri: 'http://localhost:3002/gallery/',
      body: recordToBeInserted,
      json: true // Automatically stringifies the body to JSON
    };
    request(options)
      .then((res) => {
        console.log('this is here===================');
        expect(res.statusCode).to.equal(200);
        done();
      });
            
  });
}); 


// it('should respond with redirect on post', function(done) {
//   request(app)
//     .post('/api/members')
//     .send({"participant":{"nuid":"98ASDF988SDF89SDF89989SDF9898"}})
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err, res) {
//       if (err) done(err);
//       res.body.should.have.property('participant');
//       res.body.participant.should.have.property('nuid', '98ASDF988SDF89SDF89989SDF9898');

//        });
//     done();
// });

// it('respond with json containing a list of all users', function (done) {
//   request(app)
//     .get('/users')
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200, done);
// });

// it('should properly decorate the fullName', async () => {
//   nock('http://localhost/3002')
//     .get('/api/users/123')
//     .reply(200, { firstName: 'John', lastName: 'Doe' });
    
//   const user = await getUser(123);
//   expect(user).toEqual({
//     firstName: 'John',
//     lastName: 'Doe',
//     fullName: 'John Doe'
//   });
// });


// });