import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }
  render() {
    return (
      <div>
        <Link to="/" className="waves-effect waves-light btn" id="back-btn">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="Title" id="song_title" type="text" className="validate"
                onChange={ event => this.setState({ title: event.target.value })} value={this.state.title} />
              <label htmlFor="song_title" className="active"><strong>Song Title</strong></label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`
export default graphql(mutation)(SongCreate);
