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

export const GET_ALL_DATA_SINGLE_EPISODE = gql`
  query GetAllDataSingleEpisode($id: ID!) {
    episode(id: $id) {
      name
      episode
      air_date
      characters {
        name
        image
        id
      }
    }
  }
`;
