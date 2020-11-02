import React from 'react';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import NavButtons from './NavButtons.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [], // [{title: 'star wars'}, {title: 'star trek'}...]
      shownMovies: [],
      searchValue: '',
      newMovieValue: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleNewMovieChange = this.handleNewMovieChange.bind(this);
    this.handleNewMovieSubmit = this.handleNewMovieSubmit.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.handleWatchedButton = this.handleWatchedButton.bind(this);
  }

  handleNewMovieChange(e) {
    this.state.newMovieValue = e.target.value;
  }

  handleNewMovieSubmit(e) {
    e.preventDefault();
    this.setState({
      movies: [...this.state.movies, {title: this.state.newMovieValue, watched: false}],
      shownMovies: [...this.state.shownMovies, {title: this.state.newMovieValue, watched: false}]
    })
  }

  handleWatchedButton(movieTitle) {
    // update the bool in both the shown movies and the master movies list
    let newMovieTemp = this.state.movies;
    for (let i = 0; i < newMovieTemp.length; i++) {
      if (newMovieTemp[i].title === movieTitle) {
        newMovieTemp[i].watched = !newMovieTemp[i].watched;
        // console.log('changed on click1');
        break;
      }
    }

    let newShownTemp = this.state.shownMovies;
    for (let i = 0; i < newShownTemp.length; i++) {
      if (newShownTemp[i].title === movieTitle) {
        console.log('flip?', newShownTemp[i].watched);
        newShownTemp[i].watched = !newShownTemp[i].watched;
        console.log('flip?', newShownTemp[i].watched);
        // console.log('changed on click2', newShownTemp[i].watched);
        break;
      }
    }

    this.setState({
      movies: newMovieTemp,
      shownMovies: newShownTemp
    });
  }

  handleSearchInput(e) {
    // onChange when text is typed
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSearchSubmit(e) {
    // when search button is clicked
    e.preventDefault();
    let titles = this.state.movies.map(x => x.title);
    // if the text input matches...
    if (titles.indexOf(this.state.searchValue) >= 0) {
      // find if that video was watched or not inorder to maintain state
      let idx = titles.indexOf(this.state.searchValue);
      let watchedBool = this.state.movies[idx].watched;
      this.setState({
        shownMovies: [{title: this.state.searchValue, watched: watchedBool}]
      })
    } else if (this.state.searchValue === '') {
      alert('Please input a valid search query');
    } else {
      alert('Sorry, no match found');
    }
  }

  handleSearchReset() {
    // show movies should equal movies masterlist
    // console.log('before error: ', this.state.movies);
    console.log('inside reset', this.state.movies);
    let temp = this.state.movies;
    this.setState({
      shownMovies: temp
    });
  }

  render() {
    console.log('JUST RERENDERED!!!');
    return (
      <div className="main-container">
        <AddMovieBar 
        handleNewMovieChange={this.handleNewMovieChange} 
        handleNewMovieSubmit={this.handleNewMovieSubmit} 
        />

        <SearchBar 
        handleSearchInput={this.handleSearchInput}
        handleSearchSubmit={this.handleSearchSubmit}
        />

        <NavButtons 
        handleSearchReset={this.handleSearchReset}
        />

        <div className="movie-list-container">
          <MovieList
          movies={this.state.shownMovies}
          handleWatchedButton={this.handleWatchedButton}
          />
        </div>
      </div>
    )
  }
}

export default App;

