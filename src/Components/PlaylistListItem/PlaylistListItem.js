import React,{ Component } from 'react';
import './PlaylistListItem.css';

export class PlaylistListItem extends Component {
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(){
        this.props.onSelect(this.props.id, this.props.name)
    }

    render(){
        return (
            <div className="PlaylistListItem" onClick={this.handleSelect}>
                <div className="PlaylistListItem-information">
                  <h3>{this.props.name}</h3>
                </div>
                {/* <button onClick={this.props.isRemoval ? this.removeTrack : this.addTrack} className="PlaylistListItem-action">{this.props.isRemoval ? '-' : '+'}</button> */}
            </div>
        )
    }
}