/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCharactersByPage
// ====================================================

export interface GetCharactersByPage_characters_info {
  __typename: "Info";
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
  /**
   * The length of the response.
   */
  count: number | null;
  /**
   * The amount of pages.
   */
  pages: number | null;
}

export interface GetCharactersByPage_characters_results {
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

export interface GetCharactersByPage_characters {
  __typename: "Characters";
  info: GetCharactersByPage_characters_info | null;
  results: (GetCharactersByPage_characters_results | null)[] | null;
}

export interface GetCharactersByPage {
  /**
   * Get the list of all characters
   */
  characters: GetCharactersByPage_characters | null;
}

export interface GetCharactersByPageVariables {
  page?: number | null;
}
