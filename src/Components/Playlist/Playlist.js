import React, { Component } from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e){
        const newName = e.target.value;
        this.props.onChangeName(newName)
    }
    render() {
        return(
            <div className="Playlist">
                <input 
                    type='text' 
                    value={this.props.playlistName}
                    onChange={this.handleNameChange}
                />
                <TrackList 
                    tracks={this.props.playlistTracks} 
                    onRemove={this.props.onRemove} 
                    isRemoval={true}
                />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}