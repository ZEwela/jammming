import React, { Component } from 'react';
import './Track.css';

export class Track extends Component{
    constructor(props){
        super(props);
        // this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
    }
    // renderAction(){
    //     if (this.props.isRemoval) {
    //       <button className="Track-action" onClick=this.props.onAdd>+</button>
    //     } else {
    //         '-'
    //     }
    // }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                  <h3>{this.props.track.name}</h3>
                  <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button onClick={this.props.isRemoval ? this.props.addTrack : undefined} className="Track-action">{this.props.isRemoval ? '+' : '-'}</button>
            </div>
        );
    }
}
