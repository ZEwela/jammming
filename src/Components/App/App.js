import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: 
      [
        {name: "Heu", artist: "Ewelina", album: "Ow yeee", id:1},
        {name: "Heu2", artist: "Ewelina", album: "Ow yeee", id:2}
      ],
      playlistName: 'Playlist Name',
      playlistTracks: [{name: "Heu", artist: "Ewelina", album: "Ow yeee", id:1},
      {name: "Heu2", artist: "Ewelina", album: "Ow yeee", id:2}]
    };
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(newTrack){
    if (this.state.playlistTracks.find(element => element.id === newTrack.id)) {
      return
    } else {
      this.setState(this.state.playlistTracks.push(newTrack));
    }
  }
  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
