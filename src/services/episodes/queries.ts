import { gql } from '@apollo/client';

export const GET_EPISODES_BY_PAGE = gql`
  query GetEpisodesByPage($page: Int!) {
    episodes(page: $page) {
      info {
        pages
        count
      }
      results {
        id
        name
        episode
      }
    }
  }
`;
