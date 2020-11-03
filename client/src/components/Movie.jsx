import React from 'react';

const Movie = (props) => {
    return (
        <div>
            {props.movie.title}
            <button onClick={() => {
                props.handleWatchedButton(props.movie.title);
            }}>{props.movie.watched ? 'watched' : 'not watched'}
            </button>
        </div>
    );
};

export default Movie;

// class Movie extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             watchedd: this.props.movie.watched
//         }
//     }

//     render() {
//         return (
//             <div>
//                 {this.props.movie.title}
//                 <button onClick={() => {
//                     this.setState({
//                         watchedd: !this.state.watched
//                     }, this.props.handleWatchedButton(this.props.movie.title))
//                     // this.props.handleWatchedButton(this.props.movie.title);
//                 }}>{this.state.watchedd ? 'watched' : 'not watched'}
//                 </button>
//             </div>
//         );
//     }

// }

// export default Movie;