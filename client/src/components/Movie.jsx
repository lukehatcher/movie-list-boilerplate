import React from 'react';

class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.movie.title}
                <button>not watched</button>
            </div>
        );
    }
}

export default Movie;