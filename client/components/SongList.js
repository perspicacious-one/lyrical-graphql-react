import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  onDelete(id) {
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [{ query }]
    });
  }
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item hoverable row">
            <div className="col s10">
              <h5>{song.title}</h5>
            </div>
            <div className="col s2">
              <a className="btn-floating" href="#" onClick={this.onDelete.bind(this, song.id)}><i className="material-icons red">clear</i></a>
            </div>
        </li>
      );
    })
  }

  render() {
    if (this.props.data.loading) { return (<div>Loading...</div>); }
    return(
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h3>Song List</h3></li>
        {this.renderSongs()}
      </ul>
      <br />
      <Link to="/songs/new" className="btn-floating btn-large waves-effect waves-circle purple right">
        <i className="material-icons large">add</i>
      </Link>
    </div>
    )
  }
}

const mutation = gql`
mutation deleteSong($id: ID!){
  deleteSong(id: $id) {
    id
    title
  }
}
`;

export default compose(
  graphql(query),
  graphql(mutation)
)(SongList);
