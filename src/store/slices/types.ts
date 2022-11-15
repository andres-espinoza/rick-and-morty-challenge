import { GetCharactersBasicData_characters_results } from '../../services/characters/__generated__/GetCharactersBasicData';

export interface CharacterShape
  extends GetCharactersBasicData_characters_results {
  favorite?: boolean;
}

export interface CharacterSliceShape {
  charactersBasicData: (CharacterShape | null)[] | null;
  loading: boolean;
  error: string | null;
}
