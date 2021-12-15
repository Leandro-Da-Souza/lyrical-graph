import React, { Component } from 'react';
import fetchSong from '../queries/fetchSong';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import Lyricslist from './LyricsList';

class SongDetail extends Component {    
  render() {
    const { song } = this.props.data;

    if(!song){
      return (
        <div>Loading song...</div>
      )
    }
    
    return (
      <div>
          <Link to="/">Back</Link>
          <h3>{song.title}</h3>
          <Lyricslist lyrics={song.lyrics}/>
          <LyricCreate songId={this.props.params.id}/>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: { 
        id: props.params.id
      }
    }
  }
})(SongDetail);
