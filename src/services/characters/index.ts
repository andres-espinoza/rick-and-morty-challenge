import { apolloClient } from '../../graphql';
import { GET_CHARACTERS_PAGE } from './queries';
import { GetCharactersPage } from './__generated__/GetCharactersPage';

class CharactersService {
  async getCharactersPage(
    page: number
  ): Promise<GetCharactersPage['characters']> {
    try {
      const response = await apolloClient.query({
        query: GET_CHARACTERS_PAGE,
        variables: { page },
      });
      if (!response || !response.data)
        throw new Error('Cannot get characters!');
      return response.data as GetCharactersPage['characters'];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new CharactersService();
