import React, { Component } from 'react';
import './Track.css';

export class Track extends Component{
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
    }
    renderAction(){
        if (this.props.isRemoval) {
            '+'
        } else {
            '-'
        }
    }
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                  {/* <h3><!-- track name will go here --></h3> */}
                  {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
                </div>
                <button className="Track-action">{this.renderAction}</button>
            </div>
        );
    }
}
