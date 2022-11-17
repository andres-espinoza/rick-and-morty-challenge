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
  query GetCharactersByName($name: String!, $page: Int!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        pages
        count
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
      image
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
        name
        type
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;
