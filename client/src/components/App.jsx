import React from 'react';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [], // {title: 'movie'}, {title: 'star wars'}, {title: 'star trek'}
      searchValue: '',
      newMovieValue: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleNewMovieChange = this.handleNewMovieChange.bind(this);
    this.handleNewMovieSubmit = this.handleNewMovieSubmit.bind(this);
  }



  handleSearchInput(e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    let titles = this.state.movies.map(x => x.title);
    // if the text input matches...
    if (titles.indexOf(this.state.searchValue) >= 0) {
      this.setState({
        movies: [{title: this.state.searchValue}]
      })
    } else {
      alert('Sorry, no match found...')
    }
    // e.target.value = ''; // clear text box?
  }

  handleNewMovieChange(e) {
    this.state.newMovieValue = e.target.value;
    // e.target.value = ''; // clear text box?
  }

  handleNewMovieSubmit(e) {
    e.preventDefault();
    this.setState({
      movies: [...this.state.movies, {title: this.state.newMovieValue}]
    })
  }

  render() {
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

        <div className="movie-list-container">
          <MovieList movies={this.state.movies}/>
        </div>
      </div>
    )
  }
}

export default App;

