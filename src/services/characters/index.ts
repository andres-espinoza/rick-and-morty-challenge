import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../graphql';
import apolloErrorChecker from '../apolloErrorChecker';
import {
  GET_CHARACTERS_BY_PAGE,
  GET_CHARACTERS_BY_NAME,
  GET_ALL_DATA_SINGLE_CHARACTER,
} from './queries';
import { CharactersPerPage, FullCharacter } from './types';
import { GetAllDataSingleCharacter } from './__generated__/GetAllDataSingleCharacter';
import { GetCharactersByName } from './__generated__/GetCharactersByName';
import { GetCharactersByPage } from './__generated__/GetCharactersByPage';

class CharacterService {
  async getCharactersByPage(page = 1): Promise<CharactersPerPage> {
    try {
      const response: ApolloQueryResult<GetCharactersByPage> =
        await apolloClient.query({
          query: GET_CHARACTERS_BY_PAGE,
          variables: { page },
        });

      const data = apolloErrorChecker<GetCharactersByPage>(
        response,
        'characters'
      );

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
          totalAmountOfPages: info.pages,
          characters: results.filter((character) => character !== null),
        } as CharactersPerPage;
      }
      return {
        totalAmountOfPages: 0,
        characters: [],
      } as CharactersPerPage;
    } catch (error) {
      console.error(`Error getting characters by ${page}`);
      throw error;
    }
  }

  async GetCharactersByName(
    name: string,
    page = 1,
    storage: CharactersPerPage = {
      characters: [],
      totalAmountOfPages: 0,
    }
  ): Promise<CharactersPerPage> {
    try {
      const response: ApolloQueryResult<GetCharactersByName> =
        await apolloClient.query({
          query: GET_CHARACTERS_BY_NAME,
          variables: { name, page },
        });

      const data = apolloErrorChecker<GetCharactersByName>(
        response,
        'characters'
      );

      if (
        !data?.characters?.info ||
        !data?.characters?.results ||
        data.characters.results.length < 1
      ) {
        throw new Error(
          `There is no data of characters requesting by name: ${name}`
        );
      }

      const {
        characters: { info, results },
      } = data;

      if (page === 1) {
        if (info.count && info.pages && results.length > 0) {
          storage = {
            totalAmountOfPages: info.pages,
            characters: results.filter((character) => character !== null),
          } as CharactersPerPage;
        }
      }
      if (page > 1 && results.length > 0) {
        storage.characters = [
          ...storage.characters,
          ...(results.filter(
            (character) => character !== null
          ) as CharactersPerPage['characters']),
        ];
      }

      if (!info.next) return storage;
      return await this.GetCharactersByName(name, info.next, storage);
    } catch (error) {
      console.error(`Error getting characters by ${name}`);
      throw error;
    }
  }

  async GetAllDataSingleCharacterById(id: string): Promise<FullCharacter> {
    try {
      const response: ApolloQueryResult<GetAllDataSingleCharacter> =
        await apolloClient.query({
          query: GET_ALL_DATA_SINGLE_CHARACTER,
          variables: { id },
        });

      const data = apolloErrorChecker<GetAllDataSingleCharacter>(
        response,
        'single character'
      );

      if (!data?.character) {
        throw new Error(`There is no data of character with ID: ${id}`);
      }
      const {
        character: {
          name,
          image,
          gender,
          species,
          type,
          location,
          episode,
          origin,
          status,
        },
      } = data;
      return {
        name,
        image,
        gender,
        species,
        type,
        location,
        episode,
        origin,
        status,
      };
    } catch (error) {
      console.error(`Error getting character with ID: ${id}`);
      throw error;
    }
  }
}

export default new CharacterService();
