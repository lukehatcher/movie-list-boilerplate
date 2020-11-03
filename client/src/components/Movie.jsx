import React from 'react';

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showInfo: false
        }
        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleNameClick() {
        this.setState({
            showInfo: !this.state.showInfo
        });
    }

    render() {
        if (this.state.showInfo) {
            return (
                <div>
                    <span onClick={this.handleNameClick}>{this.props.movie.title}</span>
                    <button onClick={() => {
                        this.props.handleWatchedButton(this.props.movie.title);
                    }}>{this.props.movie.watched ? 'watched' : 'not watched'}
                    </button>
                    <p>info and stuff</p>
                    <p>more info and stuff</p>
                </div>
            );
        }
        return (
            <div>
                <span onClick={this.handleNameClick}>{this.props.movie.title}</span>
                <button onClick={() => {
                    this.props.handleWatchedButton(this.props.movie.title);
                }}>{this.props.movie.watched ? 'watched' : 'not watched'}
                </button>
            </div>
        );
    }
}



// const Movie = (props) => {
//     if (props.showInfo) {

//         return (
//             // with info
//             <div>
//                 <p onClick={props.handleNameclick}>{props.movie.title}</p>
//                 <button onClick={() => {
//                     props.handleWatchedButton(props.movie.title);
//                 }}>
//                     {props.movie.watched ? 'watched' : 'not watched'}
//                 </button>
//                 <p>info and stuff</p>
//                 <p>more info and stuff</p>
//             </div>
//         );
//     }
//     return (
//         <div>
//             <h1 onClick={props.handleNameclick}>{props.movie.title}</h1>
//             <button onClick={() => {
//                 props.handleWatchedButton(props.movie.title);
//             }}>{props.movie.watched ? 'watched' : 'not watched'}
//             </button>
//         </div>
//     );
// };

export default Movie;

// on click, toggle info state of app
// send down toggle state