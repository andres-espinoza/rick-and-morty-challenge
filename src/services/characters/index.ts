import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../graphql';
import { GET_CHARACTERS_BASIC_DATA } from './queries';
import {
  GetCharactersBasicData,
  GetCharactersBasicData_characters,
  GetCharactersBasicData_characters_results,
} from './__generated__/GetCharactersBasicData';

class CharactersService {
  async getAllCharactersBasicData(
    page = 1,
    storage: (GetCharactersBasicData_characters_results | null)[] = []
  ): Promise<GetCharactersBasicData_characters['results']> {
    console.log('mmmm');

    try {
      const response: ApolloQueryResult<GetCharactersBasicData> =
        await apolloClient.query({
          query: GET_CHARACTERS_BASIC_DATA,
          variables: { page },
        });
      if (!response || !response?.data)
        throw new Error('Cannot get characters!');
      const { data } = response;
      if (!data?.characters?.info || !data?.characters?.results)
        throw new Error('Cannot get characters!');
      const {
        characters: { info, results },
      } = data;
      if (
        results &&
        results.length > 0 &&
        results.every((item) => Boolean(item) === true)
      ) {
        storage.push(...results);
        if (!info?.next) return storage;
        return await this.getAllCharactersBasicData(info.next, storage);
      }
      return storage;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new CharactersService();
