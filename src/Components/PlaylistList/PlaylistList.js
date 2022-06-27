import React, {Component} from 'react';
import './PlaylistList.css';
import { PlaylistListItem } from '../PlaylistListItem/PlaylistListItem';
import Spotify from '../../util/Spotify';

export class PlaylistList extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlists: []
        }
    }
    componentWillMount(){
        Spotify.getUserPlaylists().then(userPlaylists => {
            this.setState({
                playlists: userPlaylists
            })
        })
    }
    
    render(){
        return(
            <div className="PlaylistList">
                <h2>Your Playlists</h2>
                {this.state.playlists.map(playlist => 
                    <PlaylistListItem 
                        key={playlist.playlistId}
                        onSelect={this.props.selectPlaylist}
                        id={playlist.playlistId}
                        name={playlist.playlistName}
                    />

                )}
            </div>
        )
    }
}
