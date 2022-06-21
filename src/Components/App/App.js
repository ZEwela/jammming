import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    console.log('AppConstructor')
    this.state = { 
      searchResults: 
      [
        {name: "Heu", artist: "Ewelina", album: "Ow yeee", id:1},
        {name: "Heu2", artist: "Ewelina", album: "Ow yeee", id:2}
      ],
      playlistName: 'Playlist Name',
      playlistTracks: 'Playlist Tracks...'
    };
  }
  render() {
    console.log('App', this.props)
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
