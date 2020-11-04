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

app.all('/', (req, res) => {
  res.send('Hello world!');
});

// app.get('/', (req, res) => {
//   res.send('hellow world');
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});