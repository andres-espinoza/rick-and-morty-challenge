import { GetCharactersPage } from '../../services/characters/__generated__/GetCharactersPage';

export interface ICharactersSlice {
  charactersPage: GetCharactersPage['characters'];
}
