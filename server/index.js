const express = require('express');
const path = require('path');
const db = require('../database');

const app = express();
const PORT = 3000 || process.env.PORT;
const publicPath = path.resolve('_dirname','..', 'public' );

app.use(express.static(publicPath));

app.post('/api/movies/:movieTitle', (req, res) => {
  let queryString = 'insert into movies (title) values (?)';
  let queryArgs = req.params.movieTitle;
  db.query(queryString, queryArgs, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.get('/api/movies', (req, res) => {
  // can't call it '/' beccause of the insert
  let queryString = 'select * from movies';
  db.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});