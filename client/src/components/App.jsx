import React from 'react';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';
import AddMovieBar from './AddMovieBar.jsx';
import NavButtons from './NavButtons.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      shownMovies: [], // is a temp view for the search movies bassically
      searchValue: '',
      newMovieValue: '',
      toggle: false, // toggle the search view on/off, will render
      toggle2: false, // toggle for the watched/unwatched pages
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleNewMovieChange = this.handleNewMovieChange.bind(this);
    this.handleNewMovieSubmit = this.handleNewMovieSubmit.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.handleWatchedButton = this.handleWatchedButton.bind(this);
    this.showWatched = this.showWatched.bind(this);
    this.showUnwatched = this.showUnwatched.bind(this);
  }

  componentDidMount() {
    this.fetchMoviesFromDB();
  }

  fetchMoviesFromDB() {
    axios.get('/api/movies')
      .then((response) => {
        // create the  moves array
        let temp = [];
        for (let i = 0; i < response.data.length; i++) {
          temp.push({title: response.data[i].title, watched: false});
        };
        // setstate with the new array
        this.setState({
          movies: temp
        })
        console.log('response from get/fetch!!!!! ',response);
        console.log(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleNewMovieChange(e) {
    this.state.newMovieValue = e.target.value;
  }

  handleNewMovieSubmit(e) {
    e.preventDefault();
    // client-server connection
    let url = `api/movies/${encodeURI(this.state.newMovieValue)}`
    axios.post(url)
      .then(() => {
        console.log('axios post worked');
      })
      .catch((err) => {
        console.log(err)
      });
    // this.setState({
    //   movies: [...this.state.movies, {title: this.state.newMovieValue, watched: false}]
    // });
    this.fetchMoviesFromDB();
  }

  handleWatchedButton(movieTitle) {
    if (this.state.toggle === true) {
      // if were in search view and just see one movie
      this.setState({
        shownMovies: [{
          title: this.state.searchValue,
          watched: !this.state.shownMovies[0].watched
        }]
      });
    } 
    // need to update master list everytime
    let newMovieTemp = [...this.state.movies];
    for (let i = 0; i < newMovieTemp.length; i++) {
      if (newMovieTemp[i].title === movieTitle) {
        newMovieTemp[i].watched = !newMovieTemp[i].watched;
        break;
      }
    }
    this.setState({
      movies: newMovieTemp,
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
    if (this.state.toggle || this.state.toggle2) {
      this.setState({
        toggle: false
        // toggle2: false
      });
    } else {
      alert('you already reset your search results');
    }
  }

  showWatched() {
    // create watched array
    let watcheds = this.state.movies.filter(x => x.watched);
    this.setState({
      shownMovies: watcheds,
      // toggle: true,
      toggle2: true
    });
    // toggle on 
    // reset state
  }

  showUnwatched() {
    let unwatcheds = this.state.movies.filter(x => !x.watched);
    this.setState({
      shownMovies: unwatcheds,
      // toggle: true,
      toggle2: true
    });
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
        showUnwatched={this.showUnwatched}
        showWatched={this.showWatched}
        />

        <div className="movie-list-container">
          <MovieList
          movies={(this.state.toggle || this.state.toggle2) ? this.state.shownMovies : this.state.movies}
          handleWatchedButton={this.handleWatchedButton}
          />
        </div>
      </div>
    )
  }
}

export default App;

