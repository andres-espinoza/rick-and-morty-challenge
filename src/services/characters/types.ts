import { GetCharactersByPage_characters_results } from './__generated__/GetCharactersByPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Character extends GetCharactersByPage_characters_results {}

export interface CharactersPerPage {
  totalAmountOfPages: number;
  characters: Character[];
}
