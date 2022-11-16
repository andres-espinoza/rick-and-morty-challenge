import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../graphql';
import apolloErrorChecker from '../apolloErrorChecker';
import { GET_EPISODES_BY_PAGE } from './queries';
import { EpisodesPerPage } from './types';
import { GetEpisodesByPage } from './__generated__/GetEpisodesByPage';

class EpisodeService {
  async getEpisodesByPage(page = 1) {
    try {
      const response: ApolloQueryResult<GetEpisodesByPage> =
        await apolloClient.query({
          query: GET_EPISODES_BY_PAGE,
          variables: { page },
        });

      const data = apolloErrorChecker<GetEpisodesByPage>(response, 'episodes');

      if (!data?.episodes?.info || !data?.episodes?.results) {
        throw new Error(
          `There is no data of episodes requesting by page: ${page}`
        );
      }

      const {
        episodes: { info, results },
      } = data;

      if (info.count && info.pages && results) {
        return {
          totalAmountOfPages: info.pages,
          episodes: results.filter((episode) => episode !== null),
        } as EpisodesPerPage;
      }
      return {
        totalAmountOfPages: 0,
        episodes: [],
      } as EpisodesPerPage;
    } catch (error) {
      console.error(`Error getting episodes by ${page}`);
      throw error;
    }
  }
}

export default new EpisodeService();
