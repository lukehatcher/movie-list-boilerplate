import React from 'react';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import NavButtons from './NavButtons.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      shownMovies: [], // is a temp view for the search movies bassically
      searchValue: '',
      newMovieValue: '',
      toggle: false // toggle the search view on/off, will render
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
      movies: [...this.state.movies, {title: this.state.newMovieValue, watched: false}]
    });
  }

  handleWatchedButton(movieTitle) {
    if (this.state.toggle === true) {
      // need to edit both the visable state and the master
      this.setState({
        shownMovies: [{
          title: this.state.searchValue,
          watched: !this.state.shownMovies[0].watched
        }]
      });
    } else {
      let newMovieTemp = [...this.state.movies];
      for (let i = 0; i < newMovieTemp.length; i++) {
        if (newMovieTemp[i].title === movieTitle) {
          newMovieTemp[i].watched = !newMovieTemp[i].watched;
          break;
        }
      }
      this.setState({
        movies: newMovieTemp
      });
    }
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
        shownMovies: [{title: this.state.searchValue, watched: watchedBool}],
        toggle: true
      })
    } else if (this.state.searchValue === '') {
      alert('Please input a valid search query');
    } else {
      alert('Sorry, no match found');
    }
  }


  handleSearchReset() {
    if (this.state.toggle === true) {
      this.setState({
        toggle: false
      });
    } else {
      alert('you already reset your search results');
    }
  }

  render() {
    console.log('JUST RERENDERED!');
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
          movies={this.state.toggle ? this.state.shownMovies : this.state.movies}
          handleWatchedButton={this.handleWatchedButton}
          />
        </div>
      </div>
    )
  }
}

export default App;

