import React from 'react';

const Movie = (props) => {
    return (
        <div>
            {props.movie.title}
            <button onClick={() => {
                props.handleWatchedButton(props.movie.title);
                console.log('func ran');
            }}>{props.movie.watched ? 'watched' : 'not watched'}
            </button>
        </div>
    );
};

export default Movie;
