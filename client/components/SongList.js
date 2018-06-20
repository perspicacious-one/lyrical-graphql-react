import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs.js';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  onDelete(id) {
    this.props.mutate({ variables: { id: id }})
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item hoverable row">
          <div className="col s10">
            <Link to={`/songs/${id}`}><h5>{title}</h5></Link>
          </div>
          <div className="col s2">
            <i onClick={this.onDelete.bind(this, id)} className="material-icons icon-red clickable">delete</i>
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
