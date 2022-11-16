/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEpisodesByName
// ====================================================

export interface GetEpisodesByName_episodes_info {
  __typename: "Info";
  /**
   * The amount of pages.
   */
  pages: number | null;
  /**
   * The length of the response.
   */
  count: number | null;
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
}

export interface GetEpisodesByName_episodes_results {
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

export interface GetEpisodesByName_episodes {
  __typename: "Episodes";
  info: GetEpisodesByName_episodes_info | null;
  results: (GetEpisodesByName_episodes_results | null)[] | null;
}

export interface GetEpisodesByName {
  /**
   * Get the list of all episodes
   */
  episodes: GetEpisodesByName_episodes | null;
}

export interface GetEpisodesByNameVariables {
  name: string;
  page: number;
}
