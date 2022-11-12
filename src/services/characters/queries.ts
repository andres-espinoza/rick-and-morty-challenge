import { gql } from '@apollo/client';

export const GET_CHARACTERS_PAGE = gql`
  query GetCharactersPage($page: Int!) {
    characters(page: $page) {
      results {
        name
      }
    }
  }
`;
