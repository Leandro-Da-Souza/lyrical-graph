import React, { Component } from 'react';
import { Helpers } from '../helpers/helpers';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' }
  }
    
  onSubmit(event) {
    event.preventDefault();
    if(Helpers.isEmpty(this.state.content)) {
      return
    } 
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      },
      
    })
    .then(() => {this.setState({ content: '' })})
    .catch(e => console.log(e))
  }

  render() {
    return (
        <form onSubmit={this.onSubmit.bind(this)}>
            <label>Add a Lyric</label>
            <input 
              type="text"
              onChange={event => this.setState({ content: event.target.value })}
              value={this.state.content}
            />
        </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
  addLyricToSong(content: $content, songId: $songId) {
    id,
    lyrics {
      id
      content
      likes
    }
  }
}
`

export default graphql(mutation)(LyricCreate)