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

export const GET_EPISODES_BY_NAME = gql`
  query GetEpisodesByName($name: String!, $page: Int!) {
    episodes(page: $page, filter: { name: $name }) {
      info {
        pages
        count
        next
      }
      results {
        id
        name
        episode
      }
    }
  }
`;
