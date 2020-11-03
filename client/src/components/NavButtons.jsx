import React from 'react';

const NavButtons = (props) => {
    return (
        <nav className="button-nav">
          <button onClick={props.showWatched}>
            watched
          </button>
          <button onClick={props.showUnwatched}>
            to watch
          </button>
          <button onClick={props.handleSearchReset}> 
          reset movie list
          </button>
        </nav>
    )
};

export default NavButtons;