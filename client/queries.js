import gql from 'graphql-tag';


const query = {
  Songs: gql`
  {
    songs {
      title
    }
  }
  `;
}

export default Query;
