/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCharactersPage
// ====================================================

export interface GetCharactersPage_characters_results {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
}

export interface GetCharactersPage_characters {
  __typename: "Characters";
  results: (GetCharactersPage_characters_results | null)[] | null;
}

export interface GetCharactersPage {
  /**
   * Get the list of all characters
   */
  characters: GetCharactersPage_characters | null;
}

export interface GetCharactersPageVariables {
  page: number;
}
