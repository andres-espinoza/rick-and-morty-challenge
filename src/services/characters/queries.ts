import { gql } from '@apollo/client';

export const GET_CHARACTERS_BASIC_DATA = gql`
  query GetCharactersBasicData($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        name
        id
        image
      }
    }
  }
`;

export const GET_ALL_DATA_SINGLE_CHARACTER = gql`
  query GetAllDataSingleCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        id
        name
        dimension
      }
      location {
        id
        name
        type
      }
      image
      episode {
        name
        episode
        air_date
      }
    }
  }
`;
