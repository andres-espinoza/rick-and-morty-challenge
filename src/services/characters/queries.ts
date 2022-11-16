import { gql } from '@apollo/client';

export const GET_CHARACTERS_BY_PAGE = gql`
  query GetCharactersByPage($page: Int) {
    characters(page: $page) {
      info {
        next
        count
        pages
      }
      results {
        name
        id
        image
      }
    }
  }
`;

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        id
        image
      }
      info {
        pages
        count
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
