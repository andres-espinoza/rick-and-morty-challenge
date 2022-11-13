/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllDataSingleCharacter
// ====================================================

export interface GetAllDataSingleCharacter_character_origin {
  __typename: "Location";
  /**
   * The id of the location.
   */
  id: string | null;
  /**
   * The name of the location.
   */
  name: string | null;
  /**
   * The dimension in which the location is located.
   */
  dimension: string | null;
}

export interface GetAllDataSingleCharacter_character_location {
  __typename: "Location";
  /**
   * The id of the location.
   */
  id: string | null;
  /**
   * The name of the location.
   */
  name: string | null;
  /**
   * The type of the location.
   */
  type: string | null;
}

export interface GetAllDataSingleCharacter_character_episode {
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
}

export interface GetAllDataSingleCharacter_character {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * The status of the character ('Alive', 'Dead' or 'unknown').
   */
  status: string | null;
  /**
   * The species of the character.
   */
  species: string | null;
  /**
   * The type or subspecies of the character.
   */
  type: string | null;
  /**
   * The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
   */
  gender: string | null;
  /**
   * The character's origin location
   */
  origin: GetAllDataSingleCharacter_character_origin | null;
  /**
   * The character's last known location
   */
  location: GetAllDataSingleCharacter_character_location | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
  /**
   * Episodes in which this character appeared.
   */
  episode: (GetAllDataSingleCharacter_character_episode | null)[];
}

export interface GetAllDataSingleCharacter {
  /**
   * Get a specific character by ID
   */
  character: GetAllDataSingleCharacter_character | null;
}

export interface GetAllDataSingleCharacterVariables {
  id: string;
}
