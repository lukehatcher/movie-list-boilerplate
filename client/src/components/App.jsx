import React from 'react';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [{title: 'Initial Movie Name lol'}, {title: 'star warss'}],
      searchValue: '',
      newMovieValue: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this); // might not need
    this.handleNewMovieChange = this.handleNewMovieChange.bind(this);
    this.handleNewMovieSubmit = this.handleNewMovieSubmit.bind(this);
  }



  handleSearchInput(e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSearchSubmit() {
    let titles = this.state.movies.map(x => x.title);
    console.log(this.state.searchValue);
    console.log(titles);
    if (titles.indexOf(this.state.searchValue) >= 0) {
      this.setState({
        movies: [{title: this.state.searchValue}]
      })
    } else {
      alert('Sorry, no match found...')
    }
  }

  handleNewMovieChange(e) {
    this.state.newMovieValue = e.target.value;
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

        <SearchBar handleSearchInput={this.handleSearchInput}/>

        <button onClick={this.handleSearchSubmit}></button>
        <div className="movie-list-container">
          <MovieList movies={this.state.movies}/>
        </div>
      </div>
    )
  }
}

export default App;
