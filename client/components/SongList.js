import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    })
  }

  render() {
    if (this.props.data.loading) { return (<div>Loading...</div>); }
    return(
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h4>Song List</h4></li>
        {this.renderSongs()}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large waves-effect waves-light red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
    )
  }
}

const query = gql`
{
  songs {
    id
    title
  }
}
`;

export default graphql(query)(SongList);
