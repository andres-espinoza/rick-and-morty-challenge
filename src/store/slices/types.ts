import { GetCharactersBasicData_characters_results } from '../../services/characters/__generated__/GetCharactersBasicData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharacterShape
  extends GetCharactersBasicData_characters_results {}

export interface CharacterSliceShape {
  charactersBasicData: CharacterShape[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}
