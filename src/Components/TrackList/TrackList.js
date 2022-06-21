import React, { Component } from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends Component {
    render(){
        console.log('TrackList',this.props)
        return(
            <div className="TrackList">
                {this.props.tracks.map(track => 
                    <Track key={track.id} track={track}/>
                )}
            </div>          
        );
    }
}