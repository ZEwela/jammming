import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {PlaylistList} from '../PlaylistList/PlaylistList';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [],
      playlistId: null
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this)
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
    const result =  this.state.playlistTracks.filter(element => element.id !== unwantedTrack.id)
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
    Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.playlistId).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        playlistId: null
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  selectPlaylist(id, name){
    Spotify.getPlaylist(id)
    .then(retrivedPlaylist => {
      this.setState({
        playlistTracks: retrivedPlaylist,
        playlistName: name,
        playlistId: id
      })
    }) 
  }

  tracksToRemove(track){
    this.setState({
      listTracksToRemove: [...this.state.listTracksToRemove, track]
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
            <PlaylistList
              selectPlaylist={this.selectPlaylist}  
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
