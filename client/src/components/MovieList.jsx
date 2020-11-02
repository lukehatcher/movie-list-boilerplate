import Movie from './Movie.jsx';
import React from 'react';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    randomKey() {
        return Math.random() * Math.random() * Math.random();
    }

    render() {
        return (
        <div>{this.props.movies.map(movie => <Movie 
            movie={movie} 
            handleWatchedButton={this.props.handleWatchedButton} 
            key={this.randomKey()} 
            />)}
        </div>
        );
    }
}

export default MovieList;