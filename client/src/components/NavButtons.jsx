import React from 'react';

const NavButtons = (props) => {
    return (
        <nav className="button-nav">
          <button>
            show watched
          </button>
          <button>
            show unwatched
          </button>
          <button onClick={props.handleSearchReset}> 
          reset movie list
          </button>
        </nav>
    )
};

export default NavButtons;