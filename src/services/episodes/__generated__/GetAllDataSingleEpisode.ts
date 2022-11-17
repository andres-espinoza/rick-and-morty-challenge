/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllDataSingleEpisode
// ====================================================

export interface GetAllDataSingleEpisode_episode_characters {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
  /**
   * The id of the character.
   */
  id: string | null;
}

export interface GetAllDataSingleEpisode_episode {
  __typename: "Episode";
  /**
   * The name of the episode.
   */
  name: string | null;
  /**
   * The code of the episode.
   */
  episode: string | null;
  /**
   * The air date of the episode.
   */
  air_date: string | null;
  /**
   * List of characters who have been seen in the episode.
   */
  characters: (GetAllDataSingleEpisode_episode_characters | null)[];
}

export interface GetAllDataSingleEpisode {
  /**
   * Get a specific episode by ID
   */
  episode: GetAllDataSingleEpisode_episode | null;
}

export interface GetAllDataSingleEpisodeVariables {
  id: string;
}
