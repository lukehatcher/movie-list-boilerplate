import React from 'react';

class AddMovieBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.props.handleNewMovieSubmit}>
                <label>
                    <input type="text" onChange={this.props.handleNewMovieChange} placeholder="add a movie" />
                </label>
                <input type="submit" value="Add" />
            </form>
        )
    }
}

export default AddMovieBar;