import { gql } from '@apollo/client';

const GET_EPISODES_BY_PAGE = gql`
  query GetEpisodesByPage($page: Int!) {
    episodes (page: $page) {

    }
  }
`;