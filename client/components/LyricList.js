import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

class LyricList extends Component {
	onLike(id) {
		this.props.mutate({	variables: { id } })
	}
	render() {
		return (
			<ul className="collection with-header">
				<li className="collection-header"><h5>Lyric List</h5></li>
				{
					this.props.data.map( lyric => {
						return(
							<li className="collection-item row" key={lyric.id}>
							<div className="col s10 valign-wrapper">
								{lyric.content}
							</div>
							<div className="col s2 valign-wrapper">
								<span className="badge blue lighten-2 left white-text">{ lyric.likes }</span>
								<i className="like small blue-text material-icons right" onClick={ () =>
								this.onLike(lyric.id)}>thumb_up</i>
							</div>


						</li>)
					})
				}
			</ul>
		)
	}
}
const mutation = gql`
	mutation likeLyric($id: ID!) {
		likeLyric(id: $id) {
			id
			likes
		}
	}
`;
export default compose(
  graphql(mutation)
)(LyricList);
