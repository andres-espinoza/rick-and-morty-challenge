import { GetAllDataSingleEpisode_episode } from './__generated__/GetAllDataSingleEpisode';
import { GetEpisodesByPage_episodes_results } from './__generated__/GetEpisodesByPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Episode extends GetEpisodesByPage_episodes_results {}

export interface EpisodesPerPage {
  totalAmountOfPages: number;
  episodes: Episode[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FullEpisode
  extends Omit<GetAllDataSingleEpisode_episode, '__typename'> {}
