import React, { Component } from 'react';
import './Track.css';

export class Track extends Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderElement = this.renderElement.bind(this);
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    renderElement(){
        if (this.props.track.preview) {
            return(
                <p>
                    <audio ref="audio_tag" src={this.props.track.preview} controls/>
                </p>
            )
          
        }
    }
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                  <h3>{this.props.track.name}</h3>
                  <p>{this.props.track.artist} | {this.props.track.album}</p>
                  {this.renderElement()}
                </div>
                <button onClick={this.props.isRemoval ? this.removeTrack : this.addTrack} className="Track-action">{this.props.isRemoval ? '-' : '+'}</button>
            </div>
        );
    }
}
