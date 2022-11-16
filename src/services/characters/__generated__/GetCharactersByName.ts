/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCharactersByName
// ====================================================

export interface GetCharactersByName_characters_results {
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

export interface GetCharactersByName_characters_info {
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

export interface GetCharactersByName_characters {
  __typename: "Characters";
  results: (GetCharactersByName_characters_results | null)[] | null;
  info: GetCharactersByName_characters_info | null;
}

export interface GetCharactersByName {
  /**
   * Get the list of all characters
   */
  characters: GetCharactersByName_characters | null;
}

export interface GetCharactersByNameVariables {
  name: string;
  page: number;
}
