import gql from 'graphql-tag';

export default gql`
query getSongLyrics($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics {
      id
			content
			likes
    }
  }
}`;
