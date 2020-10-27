import React from 'react';
import MovieList from './MovieList.jsx';

const App = (props) => (
  <div className="movie-list-container">
    <MovieList movies={props.movies} />
    {/* hello world */}
  </div>
);

export default App;
