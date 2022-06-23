import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(newTrack){
    if (this.state.playlistTracks.find(element => element.id === newTrack.id)) {
      return
    } else {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, newTrack]
      });
    }
  }

  removeTrack(unwantedTrack){
    const result =  this.state.playlistTracks.filter(element => element.id !== unwantedTrack.id);
    this.setState({
      playlistTracks: result
    });
  }

  updatePlaylistName(newName){
    this.setState({
      playlistName: newName
    })
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(item => item.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    console.log(term)
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

 
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onChangeName={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
