/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCharactersBasicData
// ====================================================

export interface GetCharactersBasicData_characters_info {
  __typename: "Info";
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
}

export interface GetCharactersBasicData_characters_results {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * The id of the character.
   */
  id: string | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
}

export interface GetCharactersBasicData_characters {
  __typename: "Characters";
  info: GetCharactersBasicData_characters_info | null;
  results: (GetCharactersBasicData_characters_results | null)[] | null;
}

export interface GetCharactersBasicData {
  /**
   * Get the list of all characters
   */
  characters: GetCharactersBasicData_characters | null;
}

export interface GetCharactersBasicDataVariables {
  page: number;
}
