import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {

  render() {
    const { song } = this.props.data;
		if (!song) { return (<div></div>); }
		
    return (
      <div>
        <Link to="/" className="waves-effect waves-light btn" id="back-btn">Back</Link>
        <h3>{song.title}</h3>
					<LyricList data={song.lyrics}/>
        <div>
          <LyricCreate songId={song.id}/>
        </div>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } }
  }
})(SongDetail);
