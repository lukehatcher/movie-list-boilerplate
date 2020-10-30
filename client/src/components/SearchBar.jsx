import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="searchBarContainer">
                <input type="text" onChange={this.props.handleSearchInput} placeholder="Search for a movie!"></input>
            </div>
        );
    }
}

export default SearchBar;