import { ApolloQueryResult } from '@apollo/client';
import { apolloClient } from '../../graphql';
import apolloErrorChecker from '../apolloErrorChecker';
import {
  GET_ALL_DATA_SINGLE_EPISODE,
  GET_EPISODES_BY_NAME,
  GET_EPISODES_BY_PAGE,
} from './queries';
import { EpisodesPerPage, FullEpisode } from './types';
import { GetAllDataSingleEpisode } from './__generated__/GetAllDataSingleEpisode';
import { GetEpisodesByName } from './__generated__/GetEpisodesByName';
import { GetEpisodesByPage } from './__generated__/GetEpisodesByPage';

class EpisodeService {
  async getEpisodesByPage(page = 1): Promise<EpisodesPerPage> {
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

  async GetEpisodesByName(
    name: string,
    page = 1,
    storage: EpisodesPerPage = {
      episodes: [],
      totalAmountOfPages: 0,
    }
  ): Promise<EpisodesPerPage> {
    try {
      const response: ApolloQueryResult<GetEpisodesByName> =
        await apolloClient.query({
          query: GET_EPISODES_BY_NAME,
          variables: { name, page },
        });

      const data = apolloErrorChecker<GetEpisodesByName>(
        response,
        'characters'
      );

      if (
        !data?.episodes?.info ||
        !data?.episodes?.results ||
        data.episodes.results.length < 1
      ) {
        throw new Error(
          `There is no data of episodes requesting by name: ${name}`
        );
      }

      const {
        episodes: { info, results },
      } = data;

      if (page === 1) {
        if (info.count && info.pages && results.length > 0) {
          storage = {
            totalAmountOfPages: info.pages,
            episodes: results.filter((episode) => episode !== null),
          } as EpisodesPerPage;
        }
      }
      if (page > 1 && results.length > 0) {
        storage.episodes = [
          ...storage.episodes,
          ...(results.filter(
            (episode) => episode !== null
          ) as EpisodesPerPage['episodes']),
        ];
      }

      if (!info.next) return storage;
      return await this.GetEpisodesByName(name, info.next, storage);
    } catch (error) {
      console.error(`Error getting episodes by ${name}`);
      throw error;
    }
  }

  async GetAllDataSingleEpisodeById(id: string): Promise<FullEpisode> {
    try {
      const response: ApolloQueryResult<GetAllDataSingleEpisode> =
        await apolloClient.query({
          query: GET_ALL_DATA_SINGLE_EPISODE,
          variables: { id },
        });

      const data = apolloErrorChecker<GetAllDataSingleEpisode>(
        response,
        'single character'
      );

      if (!data?.episode) {
        throw new Error(`There is no data of episode with ID: ${id}`);
      }
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        episode: { name, episode, air_date, characters },
      } = data;
      return {
        name,
        episode,
        air_date,
        characters,
      };
    } catch (error) {
      console.error(`Error getting episode with ID: ${id}`);
      throw error;
    }
  }
}

export default new EpisodeService();
