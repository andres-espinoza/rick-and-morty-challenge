import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../graphql';
import { GET_CHARACTERS_BY_PAGE, GET_CHARACTERS_BY_NAME } from './queries';
import { GetCharactersByName } from './__generated__/GetCharactersByName';
import {
  GetCharactersByPage,
  GetCharactersByPage_characters_results,
} from './__generated__/GetCharactersByPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Character extends GetCharactersByPage_characters_results {}

export interface CharactersByPage {
  totalAmountOfCharacters: number;
  totalAmountOfPages: number;
  characters: Character[];
}

class CharactersService {
  async getCharactersByPage(page = 1) {
    try {
      const response: ApolloQueryResult<GetCharactersByPage> =
        await apolloClient.query({
          query: GET_CHARACTERS_BY_PAGE,
          variables: { page },
        });

      if (response?.error) {
        console.error(
          `Error getting characters by ${page}: ${response.error?.message}`
        );
        throw Error(response.error.message);
      }

      if (response?.errors) {
        response.errors?.forEach((error, idx) =>
          console.error(
            `Error #${idx + 1} getting characters by ${page}: ${error?.message}`
          )
        );
        throw Error(response.errors[0].message);
      }

      if (!response || !response?.data) {
        throw new Error(`Error getting characters by ${page}`);
      }
      const { data } = response;

      if (!data?.characters?.info || !data?.characters?.results) {
        throw new Error(
          `There is no data of characters requesting by page: ${page}`
        );
      }

      const {
        characters: { info, results },
      } = data;

      if (info.count && info.pages && results) {
        return {
          totalAmountOfCharacters: info.count,
          totalAmountOfPages: info.pages,
          characters: results.filter((character) => character !== null),
        } as CharactersByPage;
      }
      return {
        totalAmountOfCharacters: 0,
        totalAmountOfPages: 0,
        characters: [],
      } as CharactersByPage;
    } catch (error) {
      console.error(`Error getting characters by ${page}`);
      throw error;
    }
  }

  async GetCharactersByName(name: string) {
    try {
      const response: ApolloQueryResult<GetCharactersByName> =
        await apolloClient.query({
          query: GET_CHARACTERS_BY_NAME,
          variables: { name },
        });

      if (response?.error) {
        console.error(
          `Error getting characters by ${name}: ${response.error?.message}`
        );
        throw Error(response.error.message);
      }

      if (response?.errors) {
        response.errors?.forEach((error, idx) =>
          console.error(
            `Error #${idx + 1} getting characters by ${name}: ${error?.message}`
          )
        );
        throw Error(response.errors[0].message);
      }

      if (!response || !response?.data) {
        throw new Error(`Error getting characters by ${name}`);
      }
      const { data } = response;

      if (!data?.characters?.info || !data?.characters?.results) {
        throw new Error(
          `There is no data of characters requesting by name: ${name}`
        );
      }

      const {
        characters: { info, results },
      } = data;

      if (info.count && info.pages && results) {
        return {
          totalAmountOfCharacters: info.count,
          totalAmountOfPages: info.pages,
          characters: results.filter((character) => character !== null),
        } as CharactersByPage;
      }
      return {
        totalAmountOfCharacters: 0,
        totalAmountOfPages: 0,
        characters: [],
      } as CharactersByPage;
    } catch (error) {
      console.error(`Error getting characters by ${name}`);
      throw error;
    }
  }
}

export default new CharactersService();
