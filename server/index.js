const express = require('express');
const path = require('path');
const db = require('../database');

const app = express();
const PORT = 3000 || process.env.PORT;
const publicPath = path.resolve('_dirname','..', 'public' );

app.use(express.static(publicPath));

app.get('/api/movies', (req, res) => {
  let exampleData = [
    {
      title: 'star wars', 
      watched: false
    },
    {
      title: 'star trek',
      watched: false
    }];
  res.send(exampleData);
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