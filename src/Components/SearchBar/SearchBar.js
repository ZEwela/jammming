import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
    render() {
        console.log('SearchBar', this.props)
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );  
    }
}


