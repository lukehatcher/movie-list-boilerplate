const express = require('express');
const path = require('path');
const db = require('../database');
const axios = require('axios');
const TMDB_API_KEY = require('./config.js');
// console.log(TMDB_API_KEY);
// const TMDB_API_KEY = 'ffe9a288f0ee8c512994c1328e56e7ef';

const app = express();
const PORT = 3000 || process.env.PORT;
const publicPath = path.resolve(__dirname,'..', 'public' );

app.use(express.static(publicPath));

const searchTMDB = (query, cb) => {
  query = encodeURI(query);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`;
  axios.get(url)
      .then((response) => {

          if (response.data.results.length > 0) {
              cb(response);
          } else {
              alert('could not find your movie, try again');
          }
      })
      .catch((error) => {
          console.log(error);
      });
};

app.post('/api/movies/:movieTitle', (req, ress) => {
  searchTMDB(req.params.movieTitle, (res) => {
    // if sucessfull response from tmdb api
    let queryString = 'insert into movies (title, popularity, overview, releaseDate) values (?, ?, ?, ?)';
    let queryArgs = [
      res.data.results[0].title,
      res.data.results[0].popularity,
      res.data.results[0].overview,
      res.data.results[0].release_date
    ];
    console.log('!!!!!!!!KHKJHVKYTCGKVHJBKBGFDTRHFJGHKB', res.data.results[0]);
    db.query(queryString, queryArgs, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        ress.sendStatus(201);
      }
    })
  })
});

app.get('/api/movies', (req, res) => {
  // can't call it '/' beccause of the insert
  let queryString = 'select * from movies';
  db.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // make array of data
      // send back to user
      let movies = [];
      for (let i = 0; i < data.length; i++) {
        movies.push({
          title: data[i].title,
          popularity: data[i].popularity,
          overview: data[i].overview,
          release_date: data[i].releaseDate,
          watched: false
        })
      }
      res.send(movies);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});