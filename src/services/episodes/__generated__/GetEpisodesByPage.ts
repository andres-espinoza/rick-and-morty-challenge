/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEpisodesByPage
// ====================================================

export interface GetEpisodesByPage_episodes_info {
  __typename: "Info";
  /**
   * The length of the response.
   */
  count: number | null;
  /**
   * The amount of pages.
   */
  pages: number | null;
}

export interface GetEpisodesByPage_episodes_results {
  __typename: "Episode";
  /**
   * The id of the episode.
   */
  id: string | null;
  /**
   * The name of the episode.
   */
  name: string | null;
  /**
   * The code of the episode.
   */
  episode: string | null;
}

export interface GetEpisodesByPage_episodes {
  __typename: "Episodes";
  info: GetEpisodesByPage_episodes_info | null;
  results: (GetEpisodesByPage_episodes_results | null)[] | null;
}

export interface GetEpisodesByPage {
  /**
   * Get the list of all episodes
   */
  episodes: GetEpisodesByPage_episodes | null;
}

export interface GetEpisodesByPageVariables {
  page: number;
}
