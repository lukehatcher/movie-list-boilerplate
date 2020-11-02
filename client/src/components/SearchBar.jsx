import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSearchSubmit}>
                <label>
                    <input type="text" onChange={props.handleSearchInput} placeholder="search for a movie" />
                </label>
                <input type="submit" value="Search" />
            </form>
        </div>
        
    );
};

export default SearchBar;
