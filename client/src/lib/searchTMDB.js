import TMDB_API_KEY from '../config/api.js';
import axios from 'axios';
// had to add "type": "module" in package.json for imports to work
// then had to remove that line cause npm build and start wouldnt work

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

export default searchTMDB;

// searchTMDB('star wars', (movie) => {console.log(movie)});

// what data obj for one movie looks like:
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