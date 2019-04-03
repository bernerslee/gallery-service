var db = require('./config.js').db;

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to Mysql database');
});

let organizeDataForServer = (data) => {
  var cleanData = Object.values(data[0]);
  var finalData = cleanData.slice(2);
  finalData = finalData.map((ele, ind) => {
    return {img_url: ele, img_order: ind};
  });
  return finalData;
};


// eslint-disable-next-line func-style
function getPhotos(id) {
  return new Promise ((resolve, reject) => {
    let q = 'SELECT * FROM photos where house_id = ?';
    var params = [id];
    let timeBefore = Date.now();
    db.query(q, params, (err, res) => {
      if (err) {
        reject(err);
      }
      let timeAfter = Date.now();
      var result = (timeAfter - timeBefore) / 1000;
      console.log('Query took ' + result + 'seconds');
      console.log('this is result withing db getPhotos', res);
      if (res.length) {
        res = organizeDataForServer(res);
      }
      resolve(res);
    });  
  });
}

let insertPhotos = (req) => {
  return new Promise((resolve, reject) => {
    let photos = Object.values(req.body);
    let firstQuery = 'SELECT * FROM photos ORDER BY house_id DESC LIMIT 1';
    db.query(firstQuery, (err, res) => {
      if (err) {
        console.log('there was an error getting the last record from DB');
      } else {
        console.log('this is res', res[0]);
        let lastId = res[0].ID;
        let nextId = lastId + 1;
        // eslint-disable-next-line quotes
        let secondQuery = `INSERT INTO photos (house_id, img_0, img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9)\
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
        photos.unshift(nextId);
        let params = photos;
        db.query(secondQuery, params, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  });
};

let deletePhotos = (id) => {
  return new Promise((resolve, reject) => {
    let q = 'DELETE FROM photos WHERE house_id = ?';
    let params = [id];
    db.query(q, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }    
    }); 
  });
};

let updatePhotos = (req, id) => {
  return new Promise((resolve, reject) => {
    let params = Object.values(req.body);
    params.push(id);
    let q = 'UPDATE photos SET img_0 = ?,  img_1 = ?, img_2 = ?, img_3 = ?, img_4 = ?, img_5 = ?, img_6 = ?, img_7 = ?, img_8 = ?, img_9 = ? WHERE house_id = ?';
    db.query(q, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });  
  });
};


// eslint-disable-next-line func-style

//FUNCTION BELOW WAS USED TO TEST THE SPEED OF QUERIES USING MYSQL DB


// function getPhotos2(id) {
//   mysql.createConnection(config)
//     .then((connection) => {
//       let q = 'SELECT * FROM photos where id = ?';
//       var params = [id];
//       let timeBefore = Date.now();
//       connection.query(q, params)
//         .then((res) => {
//           let timeAfter = Date.now();
//           var result = (timeAfter - timeBefore);
//           console.log('Query took ' + result );
//           let data = organizeDataForServer(res);
//           console.log('data');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log('there was an error ', err);
//     });
// }

// getPhotos2(9000000);

module.exports = {
  getPhotos,
  insertPhotos,
  deletePhotos,
  updatePhotos
};