import TMDB_API_KEY from '../config/api.js';
import axios from 'axios';
// had to add "type": "module" in package.json for imports to work

const searchTMDB = (query, cb) => {
    query = encodeURI(query);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`;
    axios.get(url)
        .then((response) => {
            // in axios res.data is the good stuff
            // console.log(response.data.results[0]);
            cb(response.data.results[0]) // gives first search result
        })
        .catch((error) => {
            console.log(error);
        });
};

searchTMDB('star wars', (movie) => {console.log(movie)});

// {
//     popularity: 72.859,
//     vote_count: 14486,
//     video: false,
//     poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
//     id: 11,
//     adult: false,
//     backdrop_path: '/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg',
//     original_language: 'en',
//     original_title: 'Star Wars',
//     genre_ids: [ 28, 12, 878 ],
//     title: 'Star Wars',
//     vote_average: 8.2,
//     overview: 'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
//     release_date: '1977-05-25'
//   }