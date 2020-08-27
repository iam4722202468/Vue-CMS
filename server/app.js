const express = require('express');
const os = require('os');
const cookieParser = require('cookie-parser')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username }));

// app.post('/api/updatePage', (req, res) => {
//   delete req.body._id;
// 
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db('alexpWebsite');
//     dbo.collection('pages')
//       .replaceOne({ pageId: req.body.pageId }, req.body, function(err, result) {
//         if (err) throw err;
// 
//         db.close();
//         res.send(result);
//     });
//   });
// })

app.get('/api/getPage', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('alexpWebsite');
    dbo.collection('pages')
      .findOne({ pageId: req.query.pageId }, function(err, result) {
        if (err) throw err;
        db.close();
        res.send(result);
    });
  }); 
});

app.listen(8081, () => console.log('Listening on port 8081!'));
